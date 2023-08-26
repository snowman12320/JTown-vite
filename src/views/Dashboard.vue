<template>
  <!-- <Navbar></Navbar> -->
  <div class="container-fluid position-relative px-0  dashboard">
    <ToastMessages></ToastMessages>
    <div class="d-flex h-100 ">
      <SideBar></SideBar>
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import ToastMessages from '@/components/ToastMessages.vue';
// import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  components: {
    // Navbar,
    ToastMessages,
    Footer,
    SideBar
  },
  created () {
    if (localStorage.getItem('VIP')) {
      this.$swal.fire('WELCOME VIP', 'Enjoy your tour ,and you can give me some suggestions from the FB links below the website.', 'success');
    } else {
      //* 取出代幣
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      this.$http.defaults.headers.common.Authorization = token; //* 存到header發送
      const api = `${import.meta.env.VITE_APP_API}api/user/check`; //* 驗證登入狀態
      this.$http.post(api, this.user).then((res) => {
        if (!res.data.success) {
          this.$router.push('/login');
        }
      });
    }
  }
};
</script>
<style scoped>
.dashboard {
  min-height: 100vh;
}
</style>
