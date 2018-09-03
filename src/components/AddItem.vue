<template>
  <md-dialog :md-active.sync="opened">
    <md-dialog-title>Aggiungi</md-dialog-title>
    <md-dialog-content>
    <form novalidate class="md-layout" @submit.prevent="validateItem">
      <md-field :class="getValidationClass('name')" >
        <label for="name">Nome</label>
        <md-input name="name" id="name" v-model="form.name"/>
        <span class="md-error" v-if="!$v.form.name.required">
          Inserisci il nome
        </span>
      </md-field>
      <md-field>
        <label for="description">Descrizione</label>
        <md-textarea md-autogrow name="description" id="description" v-model="form.description" />
      </md-field>
      <md-field :class="getValidationClass('amount')">
        <label for="amount">Quantità</label>
        <md-input name="amount" id="amount" type="number" v-model="form.amount"/>
        <span class="md-error" v-if="!$v.form.amount.required">
          Inserisci la quantità
        </span>
        <span class="md-error" v-else-if="!$v.form.amount.numeric">
          La quantità deve essere numerica!
        </span>
        </md-field>
        <md-field>
          <md-icon>event</md-icon>
          <md-input name="deadline" id="deadline" v-model="form.deadline" type="date" />
        </md-field>
      <md-field :class="getValidationClass('conservation')">
        <label>Conservazione</label>
        <md-select name="conservation" id="conservation" v-model="form.conservation" md-dense >
          <md-option value="F1">Frigo</md-option>
          <md-option value="F2">Freezer</md-option>
          <md-option value="C1">Cucina</md-option>
          <md-option value="C2">Cantina</md-option>
          <md-option value="D">Dispensa</md-option>
          <md-option value="DP">Detergenti/Persona</md-option>
        </md-select>
        <span class="md-error" v-if="!$v.form.conservation.required">
          Inserisci il luogo di conservazione
        </span>
      </md-field>
      <md-field>
        <label for="price">Prezzo</label>
        <span class="md-prefix">€</span>
        <md-input name="price" id="price" v-model="form.price" type="number"></md-input>
      </md-field>
      <md-field>
        <label for="origin">Comprato dove</label>
        <md-input name="origin" id="origin" v-model="form.origin"></md-input>
      </md-field>
      <div class="cta md-layout-item">
        <md-button type="submit" class="md-accent md-raised">
          Salva
        </md-button>
        <md-button @click="closeAndClean" class="md-raised">Annulla</md-button>
      </div>
    </form>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, numeric } from 'vuelidate/lib/validators';

export default {
  name: 'AddItem',
  props: {
    save: Function,
    close: Function,
    opened: Boolean,
    editMode: Boolean,
    editData: Object,
  },
  mixins: [validationMixin],
  data() {
    if (this.editMode) {
      return {
        form: {
          name: this.editData.name || null,
          description: this.editData.description || null,
          price: this.editData.price || null,
          origin: this.editData.origin || null,
          deadline: this.editData.deadline || null,
          amount: this.editData.amount || null,
          conservation: this.editData.conservation || null,
        },
      };
    }
    return {
      form: {
        name: null,
        description: null,
        price: null,
        origin: null,
        deadline: null,
        amount: null,
        conservation: null,
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      amount: {
        required,
        numeric,
      },
      conservation: {
        required,
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
      return null;
    },
    closeAndClean() {
      this.close();
      this.clearForm();
    },
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.description = null;
      this.form.price = null;
      this.form.origin = null;
      this.form.deadline = null;
      this.form.amount = null;
      this.form.conservation = null;
    },
    saveItem() {
      if (this.editMode) {
        this.save(this.editData.$treenode.subpath, this.form);
      } else {
        this.save(this.form);
      }
      this.closeAndClean();
    },
    validateItem() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveItem();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .cta button{
    float: right;
  }
</style>
