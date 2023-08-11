// export default {
//   data () {
//     return {
//       isLoading: false, //* 載入效果開關
//       isLogin: false // * 判斷登入狀態
//     };
//   },
//   created () {
//     this.isLoading = true;
//     //* 取出代幣
//     const token = document.cookie.replace(
//       /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
//       '$1'
//     );
//     // console.log(token);
//     this.$http.defaults.headers.common.Authorization = token; //* 存到header發送
//     const api = `${import.meta.env.VITE_APP_API}api/user/check`; //* 驗證登入狀態
//     this.$http.post(api, this.user).then((res) => {
//       this.isLoading = false;
//       if (!res.data.success) {
//         // this.$router.push('/login');
//         this.isLogin = false;
//         // console.log(Boolean(localStorage.getItem('VIP')));
//         if (localStorage.getItem('VIP')) this.isLogin = true;
//       } else {
//         this.isLogin = true;
//       }
//     });
//   }
// };

import { ref, onMounted } from 'vue'
export default {
  setup() {
    const isLoading = ref(false) //* 載入效果開關 const isLogin = ref(false); // * 判斷登入狀態
    const isLogin = ref(null)

    console.log(isLoading);
    onMounted(() => {
      isLoading.value = true
      //* 取出代幣
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token //* 存到header發送
      const api = `${import.meta.env.VITE_APP_API}api/user/check` //* 驗證登入狀態
      this.$http.post(api, this.user).then((res) => {
        isLoading.value = false
        if (!res.data.success) {
          // this.$router.push('/login');
          isLogin.value = false
          if (localStorage.getItem('VIP')) isLogin.value = true
        } else {
          isLogin.value = true
        }
      })
    })

    return {
      isLoading,
      isLogin
    }
  }
}
