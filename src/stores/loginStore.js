import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router/index.js'

export default defineStore('loginStore', {
  state: () => ({
    isLoading: false,
    isLogin: false,
    user: null // 添加用户状态
  }),
  actions: {
    async checkLoginStatus() {
      this.isLoading = true
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)JTownToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      axios.defaults.headers.common.Authorization = token
      const api = `${import.meta.env.VITE_APP_API}api/user/check`
      axios
        .post(api, this.user)
        .then((res) => {
          if (!res.data.success) {
            this.isLogin = false
            if (localStorage.getItem('VIP')) this.isLogin = true
            if (localStorage.getItem('VIP')) {
              this.$swal.fire(
                'WELCOME VIP',
                'Enjoy your tour ,and you can give me some suggestions from the FB links below the website.',
                'success'
              )
            }
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
    },
    async checkLoginStatusInDashboard() {
      this.isLoading = true
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)JTownToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      axios.defaults.headers.common.Authorization = token
      const api = `${import.meta.env.VITE_APP_API}api/user/check`
      axios
        .post(api, this.user)
        .then((res) => {
          if (!res.data.success) {
            this.isLogin = false
            router.push('/login')

            if (localStorage.getItem('VIP')) this.isLogin = true
            if (localStorage.getItem('VIP')) {
              this.$swal.fire(
                'WELCOME VIP',
                'Enjoy your tour ,and you can give me some suggestions from the FB links below the website.',
                'success'
              )
            }
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
