import Vue from 'vue';
import moment from 'moment';

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(value).format('DD/MM/YYYY');
  }
  return '-';
});

Vue.filter('formatPrice', (value) => {
  if (value !== 0) {
    return value.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
  }
  return '-';
});

Vue.filter('detailField', value => value || '-');

Vue.filter('conservation', (value) => {
  switch (value) {
    case 'F1':
      return 'Frigo';
    case 'F2':
      return 'Freezer';
    case 'C1':
      return 'Cucina';
    case 'C2':
      return 'Cantina';
    case 'D':
      return 'Dispensa';
    case 'DP':
      return 'Detergenti/Persona';
    default:
      return '-';
  }
});

