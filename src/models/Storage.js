import { types, flow, applySnapshot } from 'mobx-state-tree';
import Item from './Item';
import firebase from '../services/firebase';

const Storage = types
  .model({
    items: types.map(Item),
    loading: false,
  })
  .actions(self => ({
    afterCreate() {
      self.loading = true;
      self.load();
    },
    load: flow(function* load() {
      try {
        yield firebase.storageRef.once('value').then((snapshot) => {
          applySnapshot(self.items, snapshot.val() || {});
        });
        self.loading = false;
      } catch (err) {
        console.log(err);
      }
    }),
    add(item) {
      firebase.storageRef.push({
        ...item,
        deadline: item.deadline && item.deadline.toString(),
        amount: Number(item.amount),
        price: Number(item.price),
      }).then(() => self.load());
    },
    remove(id) {
      firebase.storageRef.child(id).remove().then(() => self.load());
    },
    changeItemAmount(id, amount) {
      firebase.storageRef.child(id).update({ amount });
    },
    editItem(id, item) {
      firebase.storageRef.child(id).update({
        ...item,
        deadline: item.deadline && item.deadline.toString(),
        amount: Number(item.amount),
        price: Number(item.price),
      }).then(() => self.load());
    },
  }))
  .views(self => ({
    getList(searchText) {
      return Array.from(self.items.values()).filter(item => item.name.includes(searchText));
    },
    get getItemNameList() {
      return Array.from(self.items.values()).map(item => item.name);
    },
  }));

export default Storage;
