import { defineStore } from 'pinia'

import axios from 'axios'
import { setTimeout } from 'core-js'

export default defineStore('useFavoriteStore', {
  state: () => ({
    filteredProducts: [], //* 含商品資料總表（收藏側欄用）
    favoriteIds: [], //* 只有商品id總表
    //
    statusBtn: { loadingItem: '' }
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
          // this.$toast('success', 'delete favorite.')
        }, 1000)
      } else {
        //* 不存在就新增
        this.favoriteIds.push(id)
        localStorage.setItem('favorite', JSON.stringify(this.favoriteIds))
        setTimeout(() => {
          this.statusBtn.loadingItem = ''
          // this.$toast('success', 'add to favorite.')
        }, 1000)
      }
      //
      this.getFavorite()
    },
    // 無引入，測試ref操作dom
    delFavorite(id) {
      this.isLoading = true
      //* 搜尋目標
      if (this.favoriteIds.indexOf(id) !== -1) {
        //* 存在就刪除
        this.favoriteIds.splice(this.favoriteIds.indexOf(id), 1)
        localStorage.setItem('favorite', JSON.stringify(this.favoriteIds))
        this.getFavorite()
        this.isLoading = false
      }
      // const delCp = this.$refs.delModal
      // 通过属性选择器获取具有 data-ref="delModal" 属性的 DOM 元素
      let delCp = document.querySelector('[data-ref="delModal"]')
      delCp.hideModal()
    }
  }
})
