<script>
import ToastMessages from "@/components/ToastMessages.vue";
import FullFooter from "@/components/FullFooter.vue";
import BackNavbar from "@/components/BackNavbar.vue";

import loginStore from "@/stores/loginStore.js";
import { mapState, mapActions } from "pinia";

export default {
  components: {
    ToastMessages,
    FullFooter,
    BackNavbar,
  },
  async created() {
    console.log("created", this.isLogin);
    await this.checkLoginStatus();
  },
  mounted() {
    console.log("mounted", this.isLogin);
  },
  computed: {
    ...mapState(loginStore, ["isLogin"]),
  },
  watch: {
    //! 1. pinia 的store ，在created 和 mounted 和 computed 之後載入 ( 重整後也會再重載入 )，用非同步也沒用，要用watch監聽數值改變後去去觸發判斷
    //! 2. async created() await this.checkLoginStatus(); 也要，因為要等這個api跑完，之後的有關admin的api才有資料
    isLogin(newIsLogin) {
      console.log("watch");
      if (newIsLogin) {
        this.checkIsLogin();
      }
    },
  },
  methods: {
    ...mapActions(loginStore, ["checkLoginStatus"]),
    checkIsLogin() {
      if (!this.isLogin) this.$router.push("/login");
      if (localStorage.getItem("VIP")) {
        this.$swal.fire(
          "WELCOME VIP",
          "Enjoy your tour ,and you can give me some suggestions from the FB links below the website.",
          "success"
        );
      }
    },
  },
};
</script>

<template>
  <div class="container-fluid position-relative px-0 dashboard">
    <ToastMessages></ToastMessages>
    <div class="d-flex h-100">
      <BackNavbar></BackNavbar>
      <router-view />
    </div>
    <FullFooter></FullFooter>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
}
</style>
