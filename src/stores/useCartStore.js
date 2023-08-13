import { defineStore } from 'pinia'

// const $swal = 'vue-sweetalert2'
// import route from 'vue-router'
import axios from 'axios'

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    qty: 1,
    status: {
      loadingItem: ''
    },
    productSize_list: '',
    productSize_item: ''
  }),
  getters: {},
  actions: {
    addToCart(id, qty = 1, isBuy) {
      if (!this.isLogin) {
        // this.$swal.fire('Please', ' Sign in or Sign up first.', 'warning')
        // $swal.fire('Please', ' Sign in or Sign up first.', 'warning')
        // this.$router.push('/login')
        // route.push('/login')
      } else {
        if (!this.productSize_list && !this.productSize_item) {
          this.$swal.fire('Please', 'Size must be selected.', 'warning')
        } else {
          this.status.loadingItem = id
          this.isLoading = true
          const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`
          const cart = {
            product_id: id,
            qty
          }
          // this.$http.post(url, { data: cart }).then((response) => {
          axios.post(url, { data: cart }).then((response) => {
            this.isLoading = false
            this.status.loadingItem = ''
            // this.$httpMessageState(response, '加入購物車');
            this.$toast('success', 'add to cart.')
            this.emitter.emit('customEvent_getCart', this.getCart)
            if (isBuy) {
              this.$router.push('/cart-view/cart-list')
              // *觸發該頁函式，讓下一頁資料更新
              this.emitter.emit('customEvent_getCart', this.getCart)
            }
          })
        }
      }
    }
  }
})
