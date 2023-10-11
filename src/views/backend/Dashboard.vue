<script>
import ToastMessages from '@/components/ToastMessages.vue'
import FullFooter from '@/components/FullFooter.vue'
import BackNavbar from '@/components/BackNavbar.vue'

import loginStore from '@/stores/loginStore.js'
import { mapState } from 'pinia'

export default {
  components: {
    ToastMessages,
    FullFooter,
    BackNavbar
  },
  computed: {
    ...mapState(loginStore, ['isLogin'])
  },
  created() {
    if (!this.isLogin) this.$router.push('/login')
    if (localStorage.getItem('VIP')) {
      this.$swal.fire(
        'WELCOME VIP',
        'Enjoy your tour ,and you can give me some suggestions from the FB links below the website.',
        'success'
      )
    }
  }
}
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
