<template>
  <div id="app">
    <md-toolbar class="md-accent">
      <md-icon style="margin-right: 10px">search</md-icon>
      <div v-if="storage.getList.length > 0" style="flex: 1">
        <md-autocomplete
          md-dense
          v-model="selectedItem"
          :md-options="storage.getItemNameList"
          md-layout="box"
          >
        </md-autocomplete>
      </div>
      <md-button
        v-if="storage.getList.length > 0"
        class="md-icon-button"
        @click.native="addItem = true"
      >
        <md-icon>playlist_add</md-icon>
      </md-button>
      <h3 v-else class="md-title" style="flex: 1">
        Storagy
      </h3>
    </md-toolbar>
    <div v-if=storage.loading class="loadingWrapper">
      <md-progress-spinner  class="md-accent" md-mode="indeterminate" />
    </div>
    <div v-else>
      <Storage
       v-if="storage.getList(selectedItem).length > 0"
       :storageList=storage.getList(selectedItem)
      />
      <md-empty-state
        v-else-if="selectedItem !== ''"
        md-icon="highlight_off"
        md-label="Lista vuota"
        md-description="Cambia la ricerca"
      >
        <md-button @click.native="addItem = true" class="md-accent md-raised">
          Aggiungi alla lista
        </md-button>
      </md-empty-state>
      <md-empty-state
        v-else
        md-icon="add_shopping_cart"
        md-label="Serve una spesa!"
        md-description="Storagy è vuoto, aggiungi qualcosa alla lista."
      >
        <md-button @click.native="addItem = true" class="md-accent md-raised">
          Aggiungi alla lista
        </md-button>
      </md-empty-state>
    </div>
    <AddItem :save=storage.add :opened=addItem :close="closeAddItem" />
    <div id="snackbar">
      A new version of this app is available. Click <a @click="reloadApp">here</a> to update.
    </div>
  </div>
</template>

<script>
import { Observer } from 'mobx-vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Storage from './components/Storage.vue';
import AddItem from './components/AddItem.vue';

@Observer
@Component({
  props: {
    storage: Object,
  },
  components: {
    Storage,
    AddItem,
  },
})
export default class App extends Vue {
  addItem = false;
  selectedItem = '';
  closeAddItem() {
    this.addItem = false;
  }
  reloadApp() {
    window.location.reload(true);
  }
}
</script>

<style lang="scss">
  @import "~vue-material/dist/theme/engine"; // Import the theme engine

  @include md-register-theme("default", (
    primary: md-get-palette-color(red, A200),
  ));

  @import "~vue-material/dist/theme/all"; // Apply the theme

  .loadingWrapper {
    margin-top: 150px;
    display: flex;
    justify-content: center;
  }

  .searchWrapper {
    padding: 0 10px;
  }

  #snackbar {
    visibility: hidden;
    background-color: #333;
    color: #FFF;
    margin: 0 25px;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    bottom: 30px;
  }
  #snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s;
    animation: fadein 0.5s;
  }
  @-webkit-keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }
  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }
</style>
