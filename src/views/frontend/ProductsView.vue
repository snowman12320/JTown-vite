<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FullFooter from '@/components/FullFooter.vue'
import ToastMessages from '@/components/ToastMessages.vue'

import loginStore from '@/stores/loginStore.js'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    FrontNavbar,
    FullFooter,
    ToastMessages
  },
  mounted() {
    this.checkLoginStatus() // 在组件挂载时调用检查登录状态的方法
  },
  computed: {
    ...mapState(loginStore, ['isLoading', 'isLogin'])
  },
  methods: {
    ...mapActions(loginStore, ['checkLoginStatus'])
  }
}
</script>

<template>
  <div class="wrap">
    <Loading :active="isLoading" />
    <FrontNavbar :is-login="isLogin"></FrontNavbar>
    <ToastMessages></ToastMessages>
    <router-view />
    <FullFooter></FullFooter>
  </div>
</template>
