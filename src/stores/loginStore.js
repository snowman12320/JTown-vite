import { defineStore } from 'pinia'
import axios from 'axios'

export default defineStore('loginStore', {
  state: () => ({
    isLoading: false,
    isLogin: false,
    user: null // 添加用户状态
  }),
  actions: {
    // getter 改为使用 actions

    checkLoginStatus() {
      this.isLoading = true
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      axios.defaults.headers.common.Authorization = token
      const api = `${import.meta.env.VITE_APP_API}api/user/check`

      axios
        .post(api, this.user)
        .then((res) => {
          if (!res.data.success) {
            this.isLogin = false
            if (localStorage.getItem('VIP')) this.isLogin = true
          } else {
            this.isLogin = true
          }
        })
        .catch((error) => {
          console.error('Error checking login status:', error)
          this.isLogin = false
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
})
