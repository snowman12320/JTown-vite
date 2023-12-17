//! Create the Vue app instance:
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);
import { createPinia } from 'pinia';
const pinia = createPinia();

import '@/assets/scss/main.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import router from './router/router';
import { currency, date, dateAndTime, dateToSeconds, dateOrTime } from './methods/filters';
import AOS from 'aos';
import 'aos/dist/aos.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'vue-multiselect/dist/vue-multiselect.css';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueClickAway from 'vue3-click-away';
import $toast from './methods/toast';
import 'animate.css';

// ! Configuration and initialization: Here, you can configure and initialize any necessary libraries or plugins.
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
});
setLocale('zh_TW');
var firebaseConfig = {
  apiKey: 'AIzaSyBjht0vea76V6ZLkCyqiFxeYRp4rvTaCYA',
  authDomain: 'my-first-project-1110913.firebaseapp.com',
  projectId: 'my-first-project-1110913',
  storageBucket: 'my-first-project-1110913.appspot.com',
  messagingSenderId: '975844882213',
  appId: '1:975844882213:web:fe2ad0746c2de61e5f4ccc',
  measurementId: 'G-C8JWYX7WYP',
  databaseURL: 'https://DATABASE_NAME.firebaseio.com'
};
firebase.initializeApp(firebaseConfig);

//! Register components and global properties: Register any global components and properties that you want to use throughout your application.
app.component('FormValidate', Form);
app.component('FieldValidate', Field);
app.component('ErrorMessage', ErrorMessage);
app.config.globalProperties.$filters = {
  currency,
  date,
  dateAndTime,
  dateToSeconds,
  dateOrTime
};
app.config.globalProperties.$toast = $toast;

//! Use plugins and libraries:
app.use(VueAxios, axios);
app.use(router);
app.component('LoadingMask', Loading);
app.use(VueSweetalert2);
app.use(ElementPlus);
app.use(CKEditor);
app.use(VueClickAway);
app.use(pinia);

app.mixin({
  methods: {
    logTime(...args) {
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      console.log(`[${timestamp}]`, ...args);
    }
  }
});

//! Mount the app to the DOM and initialize any additional functionality:
app.mount('#app');
AOS.init();
