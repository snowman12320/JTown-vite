<script>
import ToastMessages from '@/components/ToastMessages.vue';
import FullFooter from '@/components/FullFooter.vue';
import BackNavbar from '@/components/BackNavbar.vue';

import loginStore from '@/stores/loginStore.js';
import { mapActions } from 'pinia';

export default {
  components: {
    ToastMessages,
    FullFooter,
    BackNavbar
  },
  async created() {
    await this.checkLoginStatusInDashboard();
  },
  methods: {
    ...mapActions(loginStore, ['checkLoginStatusInDashboard'])
  }
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
