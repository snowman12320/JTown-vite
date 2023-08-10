<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary py-2" style="z-index:1">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav d-flex gap-5 w-100 align-items-center justify-content-between">
          <div class="d-flex gap-2">
            <router-link to="/" class="btn btn-nbaBlue text-decoration-none">前台</router-link>
            <router-link to="/" class="btn btn-nbaRed text-decoration-none">會員</router-link>
          </div>
          <p class="p-0 m-0 text-white">歡迎～<span class="">{{ username }}</span></p>
          <div class="d-flex gap-5">
            <router-link to="/dashboard/products" class="text-white  text-decoration-none">產品</router-link>
            <router-link to="/dashboard/orders" class="text-white  text-decoration-none">訂單</router-link>
            <router-link to="/dashboard/coupons" class="text-white  text-decoration-none">優惠券</router-link>
            <router-link to="/dashboard/storys" class="text-white  text-decoration-none">文章</router-link>
            <a href="#" @click.prevent="logout" class="text-white  text-decoration-none">登出</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    };
  },
  created () {
    if (!localStorage.getItem('username')) {
      this.$router.push('/login');
    }
    const atIndex = JSON.parse(localStorage.getItem('username')).indexOf('@');
    this.username = JSON.parse(localStorage.getItem('username')).slice(0, atIndex);
  },
  methods: {
    logout () {
      if (localStorage.getItem('VIP')) {
        localStorage.removeItem('VIP');
        this.$swal.fire('VIP,WE SEE YOU SOON ', 'THANK YOU ! than you can give me some suggestions from the FB links below the website.', 'success');
        this.$router.push('/login');
      } else {
        const api = `${import.meta.env.VITE_APP_API}logout`;
        this.$http.post(api, this.user).then((res) => {
          if (res.data.success) {
            this.$router.push('/login');
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.text-white.active {
  color: orange !important;
  font-weight: 700;
}

.text-white.visited {
  color: gray !important;
}
</style>
