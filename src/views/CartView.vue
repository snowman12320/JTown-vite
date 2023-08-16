<template>
  <div class="">
    <Loading :active="isLoading"></Loading>
    <Header :is-login="isLogin"></Header>
    <p style="margin-top: 104px !important"></p>
    <ToastMessages></ToastMessages>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'

import useLoginStore from '@/stores/useLoginStore.js'
import { mapActions, mapState } from 'pinia'

export default {
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
  computed: {
    ...mapState(useLoginStore, ['isLoading', 'isLogin'])
  },
  methods: {
    ...mapActions(useLoginStore, ['checkLoginStatus'])
  }
}
</script>
