import Vue from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Spinner from 'primevue/progressspinner';
import Steps from 'primevue/steps';
import MultiSelect from 'primevue/multiselect';
import Listbox from 'primevue/listbox';
import InputMask from 'primevue/inputmask';
import ProgressBar from 'primevue/progressbar';
import ToggleButton from 'primevue/togglebutton';
import Inputswitch from 'primevue/inputswitch';
import Message from 'primevue/message';
import TreeTable from 'primevue/treetable';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faUserFriends,
  faSignInAlt,
  faSignOutAlt,
  faExclamationCircle,
  faQuestionCircle,
  faPlusCircle,
  faChalkboard,
  faPencilAlt,
  faCogs,
  faPlus,
  faInfoCircle,
    faAngleRight,
  faLock,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import { router } from './router';
import store from './store';
import "./shared/styles.css";
import moment from 'moment'
import getTrigramme from "./utils/getTrigramme";
import dateFrancaise from "./utils/dateFrancaise";
import dateFrFull from "./utils/dateFrFull";
import jourFrShort from "./utils/jourFrShort";
import monthYearShort from "./utils/monthYearShort";
import dateFrShort from "./utils/dateFrShort"

Vue.prototype.moment = moment

library.add(
  faHome,
  faUser,
  faUserPlus,
  faUserFriends,
  faSignInAlt,
  faSignOutAlt,
  faExclamationCircle,
  faQuestionCircle,
  faPlusCircle,
  faChalkboard,
  faPencilAlt,
  faCogs,
  faPlus,
    faInfoCircle,
    faAngleRight,
  faLock,
  faLockOpen,
);

Vue.config.productionTip = false;



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
Vue.component('InputText', InputText);
Vue.component('Steps', Steps);
Vue.component('MultiSelect', MultiSelect);
Vue.component('Listbox', Listbox);
Vue.component('ProgressBar', ProgressBar);
Vue.component('InputMask', InputMask);
Vue.component('Inputswitch',Inputswitch)
Vue.component('ToggleButton',ToggleButton);
Vue.component('Message',Message);
Vue.component('TreeTable',TreeTable);
Vue.component('Toast',Toast);
Vue.component('Dialog', Dialog),


// les filtres... ou pipes c'est la même chose...
Vue.filter('getTrigramme', getTrigramme);
Vue.filter('dateFrancaise', dateFrancaise);
Vue.filter('dateFrFull', dateFrFull);
Vue.filter('jourFrShort', jourFrShort);
Vue.filter('monthYearShort', monthYearShort);
Vue.filter('dateFrShort', dateFrShort);

Vue.use(ToastService);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

moment.updateLocale('fr', {
  invalidDate: "Date invalide",
  months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  monthsParseExact : true,
  weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
  weekdaysParseExact : true,
  longDateFormat : {
    LT : 'HH:mm',
    LTS : 'HH:mm:ss',
    L : 'DD/MM/YYYY',
    LL : 'D MMMM YYYY',
    LLL : 'D MMMM YYYY HH:mm',
    LLLL : 'dddd D MMMM YYYY HH:mm'
  },
  calendar : {
    sameDay : '[Aujourd’hui à] LT',
    nextDay : '[Demain à] LT',
    nextWeek : 'dddd [à] LT',
    lastDay : '[Hier à] LT',
    lastWeek : 'dddd [dernier à] LT',
    sameElse : 'L'
  },
  relativeTime : {
    future : 'dans %s',
    past : 'il y a %s',
    s : 'quelques secondes',
    m : 'une minute',
    mm : '%d minutes',
    h : 'une heure',
    hh : '%d heures',
    d : 'un jour',
    dd : '%d jours',
    M : 'un mois',
    MM : '%d mois',
    y : 'un an',
    yy : '%d ans'
  },
  dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
  ordinal : function (number) {
    return number + (number === 1 ? 'er' : 'e');
  },
  meridiemParse : /PD|MD/,
  isPM : function (input) {
    return input.charAt(0) === 'M';
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem : function (hours, minutes, isLower) {
    return hours < 12 ? 'PD' : 'MD';
  },
  week : {
    dow : 1, // Monday is the first day of the week.
    doy : 4  // Used to determine first week of the year.
  }
});

