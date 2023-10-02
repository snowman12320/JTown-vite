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
<script>
import ToastMessages from '@/components/ToastMessages.vue'
import FullFooter from '../components/FullFooter.vue'
import BackNavbar from '@/components/BackNavbar.vue'

// import loginStore from '@/stores/loginStore.js'
// import { mapState } from 'pinia'

export default {
  components: {
    ToastMessages,
    FullFooter,
    BackNavbar
  },
  created() {
    if (localStorage.getItem('VIP')) {
      this.$swal.fire(
        'WELCOME VIP',
        'Enjoy your tour ,and you can give me some suggestions from the FB links below the website.',
        'success'
      )
    } else {
      //* 取出代幣
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token //* 存到header發送
      const api = `${import.meta.env.VITE_APP_API}api/user/check` //* 驗證登入狀態
      this.$http.post(api, this.user).then((res) => {
        if (!res.data.success) {
          this.$router.push('/login')
        }
      })
    }
  },
  //
  // computed: {
  //   ...mapState(loginStore, ['isLoading', 'isLogin'])
  // }
}
</script>
<style scoped>
.dashboard {
  min-height: 100vh;
}
</style>
