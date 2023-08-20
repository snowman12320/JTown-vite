import { defineStore } from 'pinia'
import router from '../router/index.js'
import axios from 'axios'

export default defineStore('productStore', {
  state: () => ({
    isLoading_productStore: false,
    //
    product_item: []
  }),
  getters: {},
  actions: {
    getProduct_item(id) {
      //! 只取一個商品，傳入該商品id到內頁使用
      router.push(`/products-view/products-item/${id}`)
      this.isLoading_productStore = true
      //this.emitter.emit('customEvent_isLoading_big', this.isLoading_big)
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/product/${id}`
      axios.get(api).then((res) => {
        this.isLoading_productStore = false
        // this.emitter.emit('customEvent_isLoading_big', this.isLoading_big)
        if (res.data.success) {
          // 更新內頁商品資料
          this.product_item = res.data.product
          //   this.emitter.emit('customEvent_getProduct', this.product)
          // 輪播回到第一張，取得所有的carousel-item元素，移除所有carousel-item元素的active類別
          //? 取得dom方式？
          const carouselItems = document.querySelectorAll('.carousel-item')
          carouselItems.forEach(function (item) {
            item.classList.remove('active')
          })
          carouselItems[0].classList.add('active')
          window.scrollTo(0, 0)
        }
      })
    }
  }
})
