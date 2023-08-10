<template>
  <div class="">

    <head class="navbar navbar-expand-md   position-fixed top-0 start-0 end-0 backdrop py-1" style="z-index:10"
      ref="header" :class="{ ' animate__animated  animate__slideInDown  animate__animated bg-white shadow-sm': !atTop }">
      <div class="container-fluid d-flex justify-content-between p-3" :class="{ 'nav_height_after': !atTop }">
        <router-link to="/" class="d-flex position-relative text-decoration-none">
          <p class="navbar-brand position-absolute top-0 start-0 end-0 bottom-0 brand_scale"
            :class="{ 'brand_scale_after': !atTop }">JerseyTown</p>
          <h1 class="fs-3 fw-bold mb-0 ms-5 nav_h1  brand_scale " :class="{ 'opacity-0': !atTop }">JTown</h1>
        </router-link>
        <!-- 漢堡 -->
        <button class="navbar-toggler" type="button" @click="collapse_toggle">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!--  -->
        <div class="collapse navbar-collapse mb-3 mb-md-0" ref="collapse" v-click-away="collapse_hide"
          :class="{ 'd-none': collapse_none }">
          <!-- margin-start 自動推到底 好用排版方式 -->
          <ul class="navbar-nav ms-auto text-center">
            <li class="nav-item">
              <!-- 關於active切換時有加上 但接著就會重新整理又不見 方法：- 1. 直接寫在 HTML 上（建議 -->
              <!-- router.js 自己會加上 -->
              <router-link to="/" class="nav-link px-4 py-3 ">
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <!-- 使用巢狀的父層即可，不然內頁會無active > 失敗，因為路徑就會指到視圖層級而已，需使用路徑判斷 -->
              <router-link to="/story/list" :class="{ 'active': $route.path.includes('/story') }"
                class="nav-link px-4 py-3 ">
                Story
              </router-link>
            </li>
            <li class="nav-item">
              <!-- 可透過$router.path去判斷子層，加上active -->
              <router-link class="nav-link px-4 py-3" to="/products-view/products-content/title"
                :class="{ 'active': $route.path.includes('/products-view') }">Product</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/rank" class="nav-link px-4 py-3 ">
                Rank
              </router-link>
            </li>
            <li class="ms-1">
              <router-link :to="isLogin ? '/dashboard/products' : '/login'" class="fs-6 px-3 rounded-pill text-white">
                <button class="btn btn-nbaBlue text-white rounded-pill mt-lg-2 nav_pill">
                  {{ isLogin ? 'Log out' : 'Login' }}
                </button>
              </router-link>
            </li>
            <li>
              <button @click="openFavoriteOffcanvas()" class="bg-transparent border-0">
                <i class="fa-regular fa-heart  text-nbaRed fs-3   mt-2 px-1 ms-md-2"></i>
              </button>
            </li>
            <li>
              <button @click="openOffcanvas()" class="bg-transparent border-0">
                <i class="fa-sharp fa-solid fa-cart-shopping text-nbaRed fs-3   mt-2 px-1"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </head>
    <!-- 加入畫布元件，取名使用 -->
    <CartOffcanvas ref="offcanvas"></CartOffcanvas>
    <FavoriteOffcanvas ref="favorite"></FavoriteOffcanvas>
  </div>
</template>
<script>
import CartOffcanvas from '@/components/CartOffcanvas.vue';
import FavoriteOffcanvas from '@/components/FavoriteOffcanvas.vue';
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  // inject: ['emitter'],
  components: {
    CartOffcanvas,
    FavoriteOffcanvas
  },
  data () {
    return {
      nav: 0, //* 初始化 nav 值 atTop: false };
      atTop: true, //* 動態導覽列
      collapse: null,
      collapse_none: true
    };
  },
  props: {
    isLogin: Boolean
  },
  mounted () {
    this.nav = this.$refs.header.offsetHeight; //* 在 mounted 階段獲取 header 的高度
    window.addEventListener('scroll', this.handleScroll); //* 監聽滾動事件
    this.collapse = new Collapse(this.$refs.collapse); //* 繼承一個彈窗，並取得dom去操作
    setTimeout(() => { // ? 不知道為啥繼承collapase後就會自動開啟手機板導覽列，故設定自動關閉
      this.collapse_hide(); //* 在 mounted 后触发 collapse_hide 方法
    }, 500);
  },
  methods: {
    collapse_toggle () {
      this.collapse_none = false;
      this.collapse.toggle();
    },
    collapse_hide () {
      this.collapse_none = false;
      this.collapse.hide();
    },
    handleScroll () {
      this.atTop = !(window.scrollY > this.nav + 10); //* 使用this.nav進行操作
    },
    //* 透過名稱取操作元件的函式
    openOffcanvas () {
      //! 避免開啟畫布，會一直重新判斷登入
      if (!this.isLogin) {
        this.$swal.fire('Please', ' Sign in or Sign up first.', 'warning');
        this.$router.push('/login');
      } else {
        const cartCp = this.$refs.offcanvas;
        cartCp.showOffcanvas();
      }
    },
    openFavoriteOffcanvas () {
      if (!this.isLogin) {
        this.$swal.fire('Please', ' Sign in or Sign up first.', 'warning');
        this.$router.push('/login');
      } else {
        const favoriteCp = this.$refs.favorite;
        favoriteCp.showOffcanvas();
      }
    }
  }
};
</script>
<style>
.navbar-toggler:focus {
  box-shadow: none !important
}

.navbar.backdrop {
  backdrop-filter: blur(7px);
  background: rgb(255, 255, 255, .1);
}

.brand_scale {
  transition: transform 800ms;
  opacity: 100;
  transform: scale(1.5) translateY(-5px);
}

.brand_scale_after {
  transform: scale(0.8) translateY(-10px);
}

.nav_height_after {
  padding: 0 5px !important;
}
</style>
