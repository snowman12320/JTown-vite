import { defineStore } from 'pinia'
// import axios from 'axios'
import api from '@/methods/api.js'

export default defineStore('loginStore', {
  state: () => ({
    isLoading: false,
    isLogin: false,
    user: null // 添加用户状态
  }),
  actions: {
    // getter 改为使用 actions
    async checkLoginStatus() {
      this.isLoading = true
      // const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      // axios.defaults.headers.common.Authorization = token
      // const api = `${import.meta.env.VITE_APP_API}api/user/check`
      // console.log(api);
      // axios
      //   .post(api, this.user)
      //   .then((res) => {
      //     if (!res.data.success) {
      //       this.isLogin = false
      //       // if (localStorage.getItem('VIP')) this.isLogin = true
      //     } else {
      //       this.isLogin = true
      //     }
      //   })
      //   .catch((error) => {
      //     console.error('Error checking login status:', error)
      //     this.isLogin = false
      //   })
      //   .finally(() => {
      //     this.isLoading = false
      //   })
      //
      try {
        const res = await api.check()
        if (!res.data.success) {
          this.isLogin = false
          this.isLoading = false
        } else {
          this.isLogin = true
          this.isLoading = false
        }
      } catch (err) {
        console.error('Error checking login status:', err)
        this.isLogin = false
      }
      // finally () {
      //     this.isLoading = false
      //   }
    }
  }
})
