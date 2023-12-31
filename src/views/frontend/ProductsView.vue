<script>
import FrontNavbar from "@/components/FrontNavbar.vue";
import FullFooter from "@/components/FullFooter.vue";
import ToastMessages from "@/components/ToastMessages.vue";

import loginStore from "@/stores/loginStore.js";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    FrontNavbar,
    FullFooter,
    ToastMessages,
  },
  mounted() {
    this.checkLoginStatus();
  },
  computed: {
    ...mapState(loginStore, ["isLoading", "isLogin"]),
  },
  methods: {
    ...mapActions(loginStore, ["checkLoginStatus"]),
  },
};
</script>

<template>
  <div class="wrap">
    <LoadingMask :active="isLoading" />
    <FrontNavbar :is-login="isLogin" />
    <ToastMessages />
    <router-view />
    <FullFooter />
  </div>
</template>
