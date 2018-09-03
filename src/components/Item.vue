<template>
  <div slot="md-expand">
    <div class="details">
      <p v-if=item.description class="desc">{{item.description}}</p>
      <div class="md-layout">
        <div class="md-layout-item colDetails">
          <label for="deadline">Scadenza:</label>
          <span id="deadline">{{item.deadline | formatDate }}</span>
        </div>
        <div class="md-layout-item colDetails">
          <label for="conservation">Conservazione:</label>
          <span id="conservation">{{item.conservation | conservation}}</span>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item colDetails">
          <label for="price">Prezzo:</label>
          <span id="price">
            {{item.price | formatPrice}}
          </span>
        </div>
        <div class="md-layout-item colDetails">
          <label for="origin">Dove:</label>
          <span id="origin">{{item.origin | detailField}}</span>
        </div>
      </div>
    </div>
    <div class="cta">
      <md-button @click.native="editItem = true" class="md-dense md-right md-raised md-accent">
        Modifica
      </md-button>
      <md-button
        @click="() => item.remove(item.$treenode.subpath)"
        class="md-dense md-right md-raised"
      >
        Elimina
      </md-button>
    </div>
    <AddItem
      v-if=editItem
      editMode
      :editData=item
      :save=item.edit
      :opened=editItem
      :close="closeEditItem"
    />
  </div>
</template>

<script>
import { Observer } from 'mobx-vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AddItem from './AddItem.vue';

@Observer
@Component({
  props: {
    item: Object,
  },
  components: {
    AddItem,
  },
})
export default class Item extends Vue {
  editItem = false;
  closeEditItem() {
    this.editItem = false;
  }
}
</script>

<style scoped lang="scss">
  .details {
    padding: 0 10px 10px;
    .desc {
      font-size: 12px;
      font-style: italic;
    }
    .colDetails {
      label {
        font-size: 12px;
        margin-right: 5px;
      }
      span {
        font-size: 12px;
        font-weight: bold;
      }
    }
  }
  .cta {
    padding: 0 10px;
    float: right;
  }
</style>
