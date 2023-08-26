<template>
  <div class="">
    <Loading :active="isLoading"></Loading>
    <Header :is-login="isLogin"></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import emitter from '@/methods/emitter'

import loginStore from '@/stores/loginStore.js'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    Header,
    Footer
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
