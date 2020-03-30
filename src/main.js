import Vue from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import Card from 'primevue/card';
import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Spinner from 'primevue/spinner';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import { router } from './router';
import store from './store';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;

Vue.use(VeeValidate);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('ColumnGroup', ColumnGroup);
Vue.component('Calendar', Calendar);
Vue.component('Textarea', Textarea);
Vue.component('Card', Card);
Vue.component('Fieldset', Fieldset);
Vue.component('Button', Button);
Vue.component('Dropdown', Dropdown);
Vue.component('Spinner', Spinner);



new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
