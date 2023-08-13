import { defineStore } from 'pinia'
import axios from 'axios'

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    isLoading: false,
    isLogin: false
  }),
  actions: {
    async checkLoginStatus() {
      this.isLoading = true
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      axios.defaults.headers.common.Authorization = token
      const api = `${import.meta.env.VITE_APP_API}api/user/check`
      try {
        const response = await axios.post(api, this.user)
        this.isLoading = false
        if (!response.data.success) {
          this.isLogin = false
          if (localStorage.getItem('VIP')) this.isLogin = true
        } else {
          this.isLogin = true
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
