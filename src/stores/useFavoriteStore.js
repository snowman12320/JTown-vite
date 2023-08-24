import { defineStore } from 'pinia'

import axios from 'axios'
import { setTimeout } from 'core-js'

export default defineStore('useFavoriteStore', {
  state: () => ({
    statusBtn: { loadingItem: '' },
    isLoading: false,
    //
    filteredProducts: [], //* 含商品資料總表（收藏側欄用）
    favoriteIds: [], //* 只有商品id總表
    //
    toast: {
      id: null,
      res: '',
      info: ''
    }
  }),
  getters: {},
  actions: {
    getFavorite() {
      if (!localStorage.getItem('favorite')) localStorage.setItem('favorite', JSON.stringify([]))
      this.favoriteIds = JSON.parse(localStorage.getItem('favorite'))
      //
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`
      axios.get(api).then((res) => {
        if (res.data.success) {
          this.filteredProducts = res.data.products.filter((item) =>
            this.favoriteIds.includes(item.id)
          )
        }
      })
    },
    //* 切換收藏狀態
    updateFavorite(id) {
      this.statusBtn.loadingItem = id
      if (this.favoriteIds.indexOf(id) !== -1) {
        //* 存在就刪除
        this.favoriteIds.splice(this.favoriteIds.indexOf(id), 1)
        localStorage.setItem('favorite', JSON.stringify(this.favoriteIds))
        setTimeout(() => {
          this.statusBtn.loadingItem = ''
          //
          this.toast.id = id
          this.toast.res = 'warning'
          this.toast.info = 'delete favorite.'
          // this.$toast('success', 'delete favorite.')
        }, 500)
      } else {
        //* 不存在就新增
        this.favoriteIds.push(id)
        localStorage.setItem('favorite', JSON.stringify(this.favoriteIds))
        setTimeout(() => {
          this.statusBtn.loadingItem = ''
          //
          this.toast.id = id
          this.toast.res = 'success'
          this.toast.info = 'add to favorite.'
          // this.$toast('success', 'add to favorite.')
        }, 500)
      }
      //
      this.getFavorite()
    },
    //  store 需要存的是"需要共用的狀態",而 actions 則是改變這個狀態的 method,因此你不需要在 store 使用 $refs
    delFavorite_store(id) {
      this.isLoading = true
      //* 搜尋目標
      if (this.favoriteIds.indexOf(id) !== -1) {
        //* 存在就刪除
        this.favoriteIds.splice(this.favoriteIds.indexOf(id), 1)
        localStorage.setItem('favorite', JSON.stringify(this.favoriteIds))
        this.getFavorite()
        setTimeout(() => {
          this.isLoading = false
        }, 500)
      }
    }
  }
})
