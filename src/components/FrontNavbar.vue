<script>
import CartOffcanvas from "@/components/CartOffcanvas.vue";
import FavoriteOffcanvas from "@/components/FavoriteOffcanvas.vue";
import Collapse from "bootstrap/js/dist/collapse";

import favoriteStore from "@/stores/favoriteStore";
import cartStore from "@/stores/cartStore";
import loginStore from "@/stores/loginStore";
import { mapState } from "pinia";

export default {
  components: {
    CartOffcanvas,
    FavoriteOffcanvas,
  },
  data() {
    return {
      nav: 0,
      atTop: true,
      collapse: null,
      collapse_none: true,
    };
  },
  created() {
    this.checkLoginStatus();
  },
  mounted() {
    this.nav = this.$refs.header.offsetHeight; //! 在 mounted 階段獲取 header 的高度
    window.addEventListener("scroll", this.handleScroll);
    this.collapse = new Collapse(this.$refs.collapse);
    setTimeout(() => {
      // ? 不知道為啥繼承collapase後就會自動開啟手機板導覽列，故設定自動關閉
      this.collapse_hide();
    }, 500);
  },
  watch: {
    toast: {
      handler() {
        this.$toast(this.toast.res, this.toast.info);
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(favoriteStore, ["favoriteIds"]),
    ...mapState(cartStore, ["carts"]),
    ...mapState(loginStore, ["isLogin", "checkLoginStatus", "toast"]),
  },
  methods: {
    collapse_toggle() {
      this.collapse_none = false;
      this.collapse.toggle();
    },
    collapse_hide() {
      this.collapse_none = false;
      this.collapse.hide();
    },
    handleScroll() {
      this.atTop = !(window.scrollY > this.nav + 10);
    },
    openOffcanvas() {
      //! 避免開啟畫布，會一直重新判斷登入
      if (!this.isLogin) {
        this.$swal
          .fire({
            title: "Login or Sign up first.",
            icon: "warning",
            showCloseButton: false,
            showCancelButton: false,
            focusConfirm: true,
            confirmButtonText: "Login",
            confirmButtonAriaLabel: "Thumbs up, great!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$router.push("/login");
            }
          });
      } else {
        const cartCp = this.$refs.offcanvas;
        cartCp.showOffcanvas();
      }
    },
    openFavoriteOffcanvas() {
      if (!this.isLogin) {
        this.$swal
          .fire({
            title: "Login or Sign up first.",
            icon: "warning",
            showCloseButton: false,
            showCancelButton: false,
            focusConfirm: true,
            confirmButtonText: "Login",
            confirmButtonAriaLabel: "Thumbs up, great!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$router.push("/login");
            }
          });
      } else {
        const favoriteCp = this.$refs.favorite;
        favoriteCp.showOffcanvas();
      }
    },
  },
};
</script>

<template>
  <div>
    <head
      class="navbar navbar-expand-md position-fixed top-0 start-0 end-0 backdrop py-1"
      style="z-index: 11"
      ref="header"
      :class="{
        ' animate__animated  animate__slideInDown  animate__animated bg-white shadow-sm': !atTop,
      }"
    >
      <div
        class="container-fluid d-flex justify-content-between p-3"
        :class="{ nav_height_after: !atTop }"
      >
        <RouterLink to="/" class="d-flex position-relative text-decoration-none">
          <p
            class="navbar-brand position-absolute top-0 start-0 end-0 bottom-0 brand_scale"
            :class="{ brand_scale_after: !atTop }"
          >
            JerseyTown
          </p>
          <h1
            class="fs-4 fw-bold mb-0 ms-8 nav_h1 brand_scale"
            :class="{ 'opacity-0': !atTop }"
          >
            JTown
          </h1>
        </RouterLink>
        <!-- 漢堡 -->
        <button class="navbar-toggler" type="button" @click="collapse_toggle">
          <span class="navbar-toggler-icon" />
        </button>
        <!--  -->
        <div
          class="collapse navbar-collapse mb-3 mb-md-0"
          ref="collapse"
          v-click-away="collapse_hide"
          :class="{ 'd-none': collapse_none }"
        >
          <ul class="navbar-nav ms-auto text-center">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link px-4 py-3"> Home </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                to="/story/list"
                :class="{ active: $route.path.includes('/story') }"
                class="nav-link px-4 py-3"
              >
                Story
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link px-4 py-3"
                to="/products-view/products-content/title"
                :class="{ active: $route.path.includes('/products-view') }"
                >Product</RouterLink
              >
            </li>
            <li class="ms-1">
              <RouterLink
                :to="isLogin ? '/dashboard/products' : '/login'"
                class="fs-6 px-3 rounded-pill text-white"
              >
                <button
                  type="button"
                  id="login"
                  class="btn btn-nbaBlue text-white rounded-pill mt-lg-2 nav_pill"
                >
                  {{ isLogin ? "Log out" : "Login" }}
                </button>
              </RouterLink>
            </li>
            <li>
              <button
                type="button"
                @click="openFavoriteOffcanvas"
                class="bg-transparent border-0 position-relative"
              >
                <i class="fa-solid fa-heart text-pickBlack fs-2 mt-2 px-1 ms-md-2" />
                <span
                  v-if="favoriteIds.length && isLogin"
                  class="position-absolute text-white"
                  style="
                    top: 24%;
                    left: 45%;
                    font-size: 18px;
                    font-family: Tahoma, Geneva, Verdana, sans-serif;
                  "
                  >{{ favoriteIds.length }}</span
                >
              </button>
            </li>
            <li>
              <button
                @click="openOffcanvas"
                class="bg-transparent border-0 position-relative"
                type="button"
              >
                <i
                  class="fa-sharp fa-solid fa-cart-shopping text-pickBlack fs-2 mt-2 px-1"
                />
                <span
                  v-if="carts.length && isLogin"
                  class="position-absolute text-white"
                  style="
                    top: 17%;
                    left: 43%;
                    font-size: 16px;
                    font-family: Tahoma, Geneva, Verdana, sans-serif;
                  "
                  >{{ carts.length }}</span
                >
              </button>
            </li>
          </ul>
        </div>
      </div>
    </head>
    <CartOffcanvas ref="offcanvas" /> <FavoriteOffcanvas ref="favorite" />
  </div>
</template>

<style>
.navbar-toggler:focus {
  box-shadow: none !important;
}

.navbar.backdrop {
  backdrop-filter: blur(15px);
  background: rgb(255, 255, 255, 0.7);
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
