import { defineStore } from 'pinia';
import loginStore from './loginStore';
import axios from 'axios';
import { setTimeout } from 'core-js';

export default defineStore('favoriteStore', {
  state: () => ({
    statusBtn: { loadingItem: '' },
    isLoading: false,
    filteredProducts: [], //! 含商品資料總表（收藏側欄用）
    favoriteIds: [], //! 只有商品id總表
    toast: {
      id: null,
      res: '',
      info: ''
    },
    notLogin: false
  }),
  actions: {
    async getFavorite() {
      try {
        if (!localStorage.getItem('favorite')) {
          localStorage.setItem('favorite', JSON.stringify([]));
        }
        this.favoriteIds = JSON.parse(localStorage.getItem('favorite'));
        const api = `${import.meta.env.VITE_APP_API}api/${
          import.meta.env.VITE_APP_PATH
        }/products/all`;
        const res = await axios.get(api);
        if (res.data.success) {
          this.filteredProducts = res.data.products.filter((item) =>
            this.favoriteIds.includes(item.id)
          );
        }
      } catch (error) {
        this.$toast('error', ' Error fetching favorites:' + error);
      }
    },
    updateFavorite(id) {
      const { isLogin } = loginStore();
      if (isLogin) {
        this.statusBtn.loadingItem = id;
        if (this.favoriteIds.indexOf(id) !== -1) {
          this.favoriteIds.splice(this.favoriteIds.indexOf(id), 1);
          localStorage.setItem('favorite', JSON.stringify(this.favoriteIds));
          setTimeout(() => {
            this.statusBtn.loadingItem = '';
            this.toast = {
              id,
              res: 'warning',
              info: 'delete favorite.'
            };
          }, 500);
        } else {
          this.favoriteIds.push(id);
          localStorage.setItem('favorite', JSON.stringify(this.favoriteIds));
          setTimeout(() => {
            this.statusBtn.loadingItem = '';
            this.toast = {
              id,
              res: 'success',
              info: 'add favorite.'
            };
          }, 500);
        }
        this.getFavorite();
      } else {
        this.notLogin = true;
      }
    },
    //! store 需要存的是"需要共用的狀態",而 actions 則是改變這個狀態的 method,因此你不需要在 store 使用 $refs
    delFavorite_store(id) {
      this.isLoading = true;
      if (this.favoriteIds.indexOf(id) !== -1) {
        this.favoriteIds.splice(this.favoriteIds.indexOf(id), 1);
        localStorage.setItem('favorite', JSON.stringify(this.favoriteIds));
        this.getFavorite();
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    }
  }
});
