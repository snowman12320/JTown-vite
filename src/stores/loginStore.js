import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router/router.js';

export default defineStore('loginStore', {
  state: () => ({
    isLoading: false,
    isLogin: false,
    user: null //!新增使用者狀態
  }),
  actions: {
    async checkLoginStatus() {
      this.isLoading = true;
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)JTownToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      axios.defaults.headers.common.Authorization = token;
      const api = `${import.meta.env.VITE_APP_API}api/user/check`;
      axios
        .post(api, this.user)
        .then((res) => {
          if (!res.data.success) {
            this.isLogin = false;
          } else {
            this.isLogin = true;
          }
        })
        .catch((error) => {
          this.$toast('error', ' Error checking login status:' + error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async checkLoginStatusInDashboard() {
      this.isLoading = true;
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)JTownToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      axios.defaults.headers.common.Authorization = token;
      const api = `${import.meta.env.VITE_APP_API}api/user/check`;
      axios
        .post(api, this.user)
        .then((res) => {
          if (!res.data.success) {
            this.isLogin = false;
            router.push('/login');
          } else {
            this.isLogin = true;
          }
        })
        .catch((error) => {
          this.$toast('error', ' Error checking login status:' + error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
});
