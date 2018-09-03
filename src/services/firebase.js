import firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp({});

const firebaseRef = firebase.database().ref();

export default {
  storageRef: firebaseRef,
};
