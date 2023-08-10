export default {
  data () {
    return {
      isLoading: false, //* 載入效果開關
      isLogin: false // * 判斷登入狀態
    };
  },
  created () {
    this.isLoading = true;
    //* 取出代幣
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    // console.log(token);
    this.$http.defaults.headers.common.Authorization = token; //* 存到header發送
    const api = `${import.meta.env.VITE_APP_API}api/user/check`; //* 驗證登入狀態
    this.$http.post(api, this.user).then((res) => {
      this.isLoading = false;
      if (!res.data.success) {
        // this.$router.push('/login');
        this.isLogin = false;
        // console.log(Boolean(localStorage.getItem('VIP')));
        if (localStorage.getItem('VIP')) this.isLogin = true;
      } else {
        this.isLogin = true;
      }
    });
  }
};
