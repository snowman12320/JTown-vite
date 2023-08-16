import { defineStore } from 'pinia'
import axios from 'axios'

export default defineStore('useFavoriteStore', {
  state: () => ({
    products: [],
    //
    filteredProducts: [],
    favoriteIds: [],
    //
    isLoading: false,
    //
    isFavorite: false,
    favoriteData: [],
    checkFavorite: false
  }),
  getters: {},
  actions: {
    getFavoriteId() {
      //! 當新用戶本地沒有資料時會報錯，需事先新增
      if (!localStorage.getItem('favorite')) localStorage.setItem('favorite', JSON.stringify([]))
      this.favoriteIds = JSON.parse(localStorage.getItem('favorite'))
    },
    getFavorite() {
      this.isLoading = true
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`
      axios.get(api).then((res) => {
        if (res.data.success) {
          this.isLoading = false
          this.products = res.data.products
          this.filteredProducts = this.products.filter((item) => this.favoriteIds.includes(item.id))
        }
      })
    },
    //
    updateFavo(id) {
      this.isLoading = true
      this.checkFavorite = Boolean(localStorage.getItem('favorite').indexOf(id) !== -1) //* 搜尋目標
      if (this.checkFavorite) {
        //* 存在就刪除
        this.isFavorite = false //* 改成無收藏按鈕
        // this.$toast('success', 'delete favorite.')
        // 刪除
        this.favoriteData = JSON.parse(localStorage.getItem('favorite'))
        // console.log(this.favoriteData);
        const index = this.favoriteData.indexOf(id)
        // console.log(index);
        if (index > -1) {
          this.favoriteData.splice(index, 1)
          localStorage.setItem('favorite', JSON.stringify(this.favoriteData))
        }
        this.isLoading = false
      } else {
        //* 不存在就儲存
        this.isFavorite = true //* 改成收藏按鈕
        // this.$toast('success', 'add to favorite.')
        // 新增
        this.favoriteData.push(id)
        localStorage.setItem('favorite', JSON.stringify(this.favoriteData))
      }
      //   this.emitter.emit('customEvent_updateFavorite') //! 觸發收藏表更新
      this.getFavorite()
      this.getFavoriteId()
      this.isLoading = false
    },
    getFavoriteData() {
      // localStorage.clear();
      if (localStorage.getItem('favorite')) {
        this.favoriteData = JSON.parse(localStorage.getItem('favorite'))
        const checkFavorite = Boolean(
          JSON.parse(localStorage.getItem('favorite')).indexOf(this.id) !== -1
        ) //* 搜尋目標
        if (checkFavorite) {
          this.isFavorite = true
        } else {
          this.isFavorite = false
        }
      } else {
        localStorage.setItem('favorite', JSON.stringify(this.favoriteData))
      }
    }
  }
})
