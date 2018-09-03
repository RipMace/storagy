import { types, getParent } from 'mobx-state-tree';
import firebase from '../services/firebase';

const Item = types
  .model({
    name: types.string,
    description: types.maybe(types.string),
    price: types.maybe(types.number),
    origin: types.maybe(types.string),
    deadline: types.maybe(types.string),
    amount: types.number,
    conservation: types.maybe(types.union(types.literal('F1'), types.literal('F2'), types.literal('C1'), types.literal('C2'), types.literal('D'), types.literal('DP'))),
  })
  .actions(self => ({
    increase(id) {
      self.amount++;
      firebase.storageRef.child(id).update({ amount: self.amount });
    },
    decrease(id) {
      self.amount--;
      firebase.storageRef.child(id).update({ amount: self.amount });
    },
    remove(id) {
      getParent(self, 2).remove(id);
    },
    edit(id, item) {
      getParent(self, 2).editItem(id, item);
    },
  }));

export default Item;
