<template>
  <div class="">
    <Loading :active="isLoading"></Loading>
    <Header :is-login="isLogin"></Header>
    <ToastMessages></ToastMessages>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
// import loginMixin from '../mixins/loginMixin';
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'

import { useLoginStore } from '@/stores/useLoginStore.js'
import { mapActions, mapState } from 'pinia'

export default {
  // mixins: [loginMixin],
  components: {
    Header,
    Footer,
    ToastMessages
  },
  provide() {
    return {
      emitter
    }
  },
  mounted() {
    this.checkLoginStatus() // 在组件挂载时调用检查登录状态的方法
  },
  computed: {
    ...mapState(useLoginStore, ['isLoading', 'isLogin'])
  },
  methods: {
    ...mapActions(useLoginStore, ['checkLoginStatus'])
  }
}
</script>
