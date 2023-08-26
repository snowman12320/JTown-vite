console.clear()

import './assets/main.css' //*vite的示範檔 > 編譯main.scss後被覆蓋
import './assets/all.scss'

import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate' // 匯入 vee-validate 主套件
import { required, email, min } from '@vee-validate/rules' // 匯入 vee-validate 相關規則
import { localize, setLocale } from '@vee-validate/i18n' // 匯入多國語系的功能
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json' // 匯入繁體中文語系檔案
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { currency, date, dateAndTime } from './methods/filters'
import $httpMessageState from './methods/pushMessageState' //* 全域函式
import AOS from 'aos'
import 'aos/dist/aos.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import ElementPlus from 'element-plus' // 引入element-plus库
import 'element-plus/dist/index.css' // 引入element-plus样式
import 'vue-multiselect/dist/vue-multiselect.css' //*npm i vue-multiselect@3.0.0-beta.2
import CKEditor from '@ckeditor/ckeditor5-vue'
import VueClickAway from 'vue3-click-away'
import $toast from './methods/toast' //* 定義完程式功能，需全域註冊，$錢字號應該是辨識用，若沒有包其他函式，就錢字號開頭(如$httpMessageState)，反之就(如$filters.currency)

// ! Configuration and initialization: Here, you can configure and initialize any necessary libraries or plugins.
// 定義驗證規則
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
setLocale('zh_TW') // 設定預設語系


//! Create the Vue app instance:
const app = createApp(App)

//! Register components and global properties: Register any global components and properties that you want to use throughout your application.
// 註冊 vee-validate 三個全域元件
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
//* 全域引用自訂方法，每頁不用重複在methods中引入，這個檔案還是需引入，$filters(自定義名稱)
app.config.globalProperties.$filters = {
  currency,
  date,
  dateAndTime
}
// 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast 處理
// 正常來說不建議太多方法掛Global,這裡可以使provide來處理
app.config.globalProperties.$httpMessageState = $httpMessageState
app.config.globalProperties.$toast = $toast

//! Use plugins and libraries:
app.use(VueAxios, axios)
app.use(router)
app.component('Loading', Loading)
app.use(VueSweetalert2)
app.use(ElementPlus) // 全局注册element-plus
app.use(CKEditor)
app.use(VueClickAway)
const pinia = createPinia()
app.use(pinia)

// pinia.use(VueSweetalert2)
// pinia.config.globalProperties.$toast = $toast

//! Mount the app to the DOM and initialize any additional functionality:
app.mount('#app')
AOS.init()
