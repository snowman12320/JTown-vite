注意node版本號 !!!

注意不同電腦的差異會有問題

# ///////////////////////////////////////////////route//////////////////////////////////////////////

this.cacheSearch = this.$route.params.search

// 添加以下路由以进行重定向
{
path: '/:catchAll(.\*)',
redirect: '/'
}

# ///////////////////////////////////////////////storyitem//////////////////////////////////////////////

// 製作分頁切換使用
getStoryList(page = 1) {
const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/admin/articles/?page=${page}`
this.$http.get(api).then((res) => { .......
// 用admin會需要token 不然抓不到值

# ///////////////////////////////////////////getMerchandise//////////////////////////////////////////////////

     getMerchandise() {
      const str = this.story.title.trim()
      const index = str.indexOf(' ')
      this.sentence = str.substring(0, index)// 输出：Kobe bryant
      // this.emitter.emit('customEvent_search', this.sentence); //! 無法跳轉頁面傳遞值
      this.$router.push(`/products-view/products-content/${this.sentence}`)

this.setCacheSearch(this.sentence)
},

# /////////////////////////////////////////////////转向链接////////////////////////////////////////////

// window.location.href = event.target.href; // 转向链接

# ///////////////////////////////////////////////TIME//////////////////////////////////////////////

console.log(new Date().toLocaleTimeString('en-US', { hour12: false }))

/////////////////////////////////////////////////////////////////////////////////////////////

# /////////////////////////////////////////////// b94e591: fixd confilted //////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////

# /////////////////////////////////////////////// main.scss //////////////////////////////////////////////

//! 有問題無法編譯此檔 只能用套件去編譯後使用 > 改成引入all.scss 分頁樣式或新增全域樣式 > 因ray建議用scss就不要有css (此檔警告的問題仍存在，忽略)
//! Deprecation Warning: Passing percentage units to the global abs() function is deprecated.
//\* 降板就解決了(vue cli 中正常的版本) "sass-loader": "^12.0.0", "sass": "^1.32.7",

# ////////////////////////////////////////////// StoryModal.vue //////////////////////////////////////////////

<div class="d-flex flex-column flex-md-row gap-1">
<p>新增標籤</p>
<el-tag
v-for="tag in dynamicTags"
:key="tag"
class="mx-1"
closable
:disable-transitions="false"
@close="handleClose(tag)" >
{{ tag }}
</el-tag>
<el-input
v-if="inputVisible"
ref="InputRef"
v-model="inputValue"
class="ms-1"
style="width: 100px"
size="small"
@keyup.enter="handleInputConfirm"
@blur="handleInputConfirm"
/>
<el-button
v-else
class="button-new-tag ml-1"
size="small"
@click.stop="showInput" > + New Tag
</el-button>
</div>

# ////////////////////////////////////////////productSide//////////////////////////////////////////////

<!-- <div>
  <label>
    <input type="checkbox" v-model="filterCheck['999']" /> $999 or less
  </label>
  <label>
    <input type="checkbox" v-model="filterCheck['2999']" /> $2999 or less
  </label>
  <label>
    <input type="checkbox" v-model="filterCheck['5000']" /> $5000 or more
  </label>
</div>
{{ filterCheck }} -->

filterCheck: {
deep: true,
handler(val) {
this.setFilterCheck(val);
// console.log("Deep watch:", val);
},
},

# ////////////////////////////////////////////productList//////////////////////////////////////////////

// filterCheck: {
// 999: false,
// 2999: false,
// 5000: false,
// },

// filterRanges() {
// return {
// 999: (item) => item.price < 999,
// 2999: (item) => item.price < 2999,
// 5000: (item) => item.price > 5000,
// };
// },
// const filterFunc = (item) => {
// return Object.keys(this.filterCheck).every((price) => {
// return !this.filterCheck[price] || this.filterRanges[price](item);
// });
// };

# ///////////////////////////////////////////////vite.config//////////////////////////////////////////////

import VueDevTools from 'vite-plugin-vue-devtools'
// https://github.com/webfansplz/vite-plugin-vue-devtools/blob/main/README.zh-CN.md
///////////////////////////////////////////////productItem//////////////////////////////////////////////
//! 如何在productItem元件中，使用class去隱藏productsList的元素，父層 控制 子層

<!-- //! 取得全部資料的分類，並更新相關商品列表，無法用props覆蓋，故作罷 -->
<!-- <ProductsList :filteredData="filteredData" @update-category="getProducts"></ProductsList> -->
<!-- :childClass="['d-none']" ，父元件傳入值，子元件放:class="childClass" -->

<ProductsList></ProductsList>
//
addToCart(id, qty = 1, isBuy) {
//! 因為有些網站要登入才能下單，但助教好像覺得不用擋無會員
// if (!this.isLogin) {
//! 在store不會用到this ，共用狀態才會放store
// this.$swal.fire('Please', ' Sign in or Sign up first.', 'warning')
//   this.$router.push('/login')
// } else {

# ///////////////////////////////////////////////LoginView//////////////////////////////////////////////

  <div class="card-footer d-flex justify-content-center align-items-center">
  <div class="d-flex justify-content-center align-items-center links">
    Don't have an account?
    <!-- <el-popconfirm
      width="350"
      @confirm="confirmEvent"
      confirm-button-text="Yap!"
      cancel-button-text="No, Thanks"
      icon-color="#626AEF"
      title="Registration is not yet available... but would you like to use VIP to test it?"
    > -->
    <!-- <template #reference> -->
    <el-button style="">Sign Up</el-button>
    <!-- </template> -->
    <!-- </el-popconfirm> -->
  </div>
  <!-- <div class="d-flex justify-content-center">
    <a href="#">Forgot your password?</a>
  </div> -->
</div>

# ///////////////////////////////////////////////CartList//////////////////////////////////////////////

  <!-- 無法顯示錯誤訊息原因是你沒有透過 :class 的方式去判斷 error-message何時該顯示，
  另外 Field 後面也要記得利用 v-bind 去綁定 value  -->
<!--  check 打勾後會送出:value="true" ，預設應該是false， 會是沒打勾 會是口空的 -->

<Field
:disabled="!isLookOver"
:rules="termCheck"
required
id="termCheck"
name="termCheck"
:value="true"
type="checkbox"
class="form-check-input"
:class="{
'is-invalid': errors['termCheck'],
'is-valid': !errors['termCheck'],
'opacity-50': !isLookOver,
}"

>

# ///////////////////////////////////////////////Dashboard//////////////////////////////////////////////

     watch: {
        //! 1. pinia 的store ，在created 和 mounted 和 computed 之後載入 ( 重整後也會再重載入 )，用非同步也沒用，要用watch監聽數值改變後去去觸發判斷
        //! 2. async created() await this.checkLoginStatusInDashboard(); 也要，因為要等這個api跑完，之後的有關admin的api才有資料
        // isLogin(newIsLogin, oldIsLogin) {
        //   console.log("watch");
        //   console.log(newIsLogin, oldIsLogin);
        //   if (newIsLogin) {
        //     this.checkIsLogin();
        //   }
        // },
    },

// 也可以直接不放在 鳳梨裡
直接放要判斷轉向的元件中
不轉向就可以放鳳梨裡

# ///////////////////////////////////////////////loginStore//////////////////////////////////////////////

if (localStorage.getItem('VIP')) this.isLogin = true;
if (localStorage.getItem('VIP')) {
this.$swal.fire(
'WELCOME VIP',
'Enjoy your tour ,and you can give me some suggestions from the FB links below the website.',
'success'
);
}

# ///////////////////////////////////////////////router//////////////////////////////////////////////

//\*https://courses.hexschool.com/courses/vue-20211/lectures/43730454
history: createWebHashHistory(import.meta.env.BASE_URL),

path: 'products-content/:search', //\* 好像要改api，才能解決找不到此路徑的警告>因為有router-link路徑沒寫/:...
///////////////////////////////////////////////homeView//////////////////////////////////////////////
//不能太早引入
//! Uncaught (in promise) ReferenceError: Cannot access 'FrontNavbar' before initialization
import FrontNavbar from '@/components/FrontNavbar.vue';

# ///////////////////////////////////////////////FavoriteOffcanvas//////////////////////////////////////////////

     delFavorite(id) {
      this.delFavorite_store(id)
      //
      const delCp = this.$refs.delModal
      // 通过属性选择器获取具有 data-ref="delModal" 属性的 DOM 元素 > 只能取到dom但沒有方法 (不是proxy)
      // let delCp = document.querySelector('[data-ref="delModal"]')
      delCp.hideModal()
    },

# ///////////////////////////////////////////////frontNavbar//////////////////////////////////////////////

             <li class="nav-item">
              <!-- 關於active切換時有加上 但接著就會重新整理又不見 方法：- 1. 直接寫在 HTML 上（建議 -->
              <!-- router.js 自己會加上 -->
              <router-link to="/" class="nav-link px-4 py-3"> Home </router-link>
            </li>
            <li class="nav-item">
              <!-- 使用巢狀的父層即可，不然內頁會無active > 失敗，因為路徑就會指到視圖層級而已，需使用路徑判斷 -->
              <router-link
                to="/story/list"
                :class="{ active: $route.path.includes('/story') }"
                class="nav-link px-4 py-3"
              >
                Story
              </router-link>
            </li>

# ///////////////////////////////////////////////homeStore//////////////////////////////////////////////

// $attr
<HomeStory customClass="text-nbaBlue"></HomeStory>
//

  <p
  class=""
  :class="Boolean($attrs.customClass) ? `${$attrs.customClass}` : 'false'"
>
  {{ $attrs.customClass }}
</p>
//類似 父層 控制 子層樣式 productItem.vue

# ///////////////////////////////////////////////beforeEnter//////////////////////////////////////////////

書籤有


### //// npm <> pnpm ///
Npm: Package Manager