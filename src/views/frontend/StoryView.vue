<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FullFooter from '@/components/FullFooter.vue'

import loginStore from '@/stores/loginStore.js'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    FrontNavbar,
    FullFooter
  },

  mounted() {
    this.checkLoginStatus()
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
  <div>
    <LoadingMask :active="isLoading" />
    <FrontNavbar :is-login="isLogin"></FrontNavbar>
    <router-view />
    <FullFooter></FullFooter>
  </div>
</template>
