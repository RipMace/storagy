<template>
  <md-list :md-expand-single=true>
    <md-list-item md-expand  v-for="conservation in conservationList">
      <div class="conservationSection">
        <b>{{conservation.desc}}</b>
        <i>({{filteredStorageList(conservation.id).length}})</i>
      </div>
      <md-list slot="md-expand" class="md-dense" :md-expand-single=true>
        <md-list-item
          :style="{ background: calcDeadline(item.deadline) }"
          v-for="item in filteredStorageList(conservation.id)"
          :key=item.$treenode.subpath
          md-expand
        >
          <div
            class="md-list-item-text"
            :style="{ textDecoration: !(item.amount > 0) ? 'line-through' : 'none'}"
          >
            <b>{{item.name}}</b>
          </div>
          <span style="margin-right: 3px">Quantità:</span><b>{{item.amount}}</b>
          <md-button
            class="md-icon-button md-dense md-accent"
            @click.stop="() => item.increase(item.$treenode.subpath)"
          >
            <md-icon>add</md-icon>
          </md-button>
          <md-button
            :disabled="item.amount <= 0"
            @click.stop="() => item.decrease(item.$treenode.subpath)"
            class="md-icon-button md-dense"
          >
            <md-icon>remove</md-icon>
          </md-button>
          <div slot="md-expand">
            <Item :item=item />
          </div>
        </md-list-item>
      </md-list>
    </md-list-item>
  </md-list>
</template>

<script>
import { Observer } from 'mobx-vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import moment from 'moment';
import Item from './Item.vue';

@Observer
@Component({
  props: {
    storageList: Array,
  },
  components: {
    Item,
  },
})
export default class Storage extends Vue {
  conservationList = [
    { id: 'F1', desc: 'Frigo' },
    { id: 'F2', desc: 'Freezer' },
    { id: 'C1', desc: 'Cucina' },
    { id: 'C2', desc: 'Cantina' },
    { id: 'D', desc: 'Dispensa' },
    { id: 'DP', desc: 'Detergenti/Persona' },
  ];
  calcDeadline(due) {
    if (due) {
      return moment(due).diff(moment(), 'd') < 8 ? '#FFCA5C' : '#FFFFFF';
    }
    return '#FFFFFF';
  }
  filteredStorageList(consId) {
    return this.storageList.filter(item => item.conservation === consId);
  }
}
</script>

<style lang="scss">
  .conservationSection {
    b {
      margin-right: 5px;
    }
  }
  .md-list-item-content>.md-icon:last-child {
    margin-left: 0;
  }
  .md-list.md-theme-default .md-list-item-container:not(.md-list-item-default):not([disabled]):hover {
    background-color: inherit !important;
  }
</style>
