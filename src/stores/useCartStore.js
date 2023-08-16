import { defineStore } from 'pinia'
import useLoginStore from './useLoginStore.js'

// import VueSweetalert2 from 'vue-sweetalert2'
// import 'sweetalert2/dist/sweetalert2.min.css'

import router from '../router/index.js'
import axios from 'axios'

// 改成default才能在其他store引入，不然引入時都要用解構取出(但不是問題)
export default defineStore('useCartStore', {
  state: () => ({
    qty: 1,
    statusBtn: {
      loadingItem: ''
    },
    isLoading: false,
    //
    productSize_list: '',
    productSize_item: '',
    //
    carts: [],
    sumTotal: 0,
    sumFinalTotal: 0,
    sumFinalQty: 0
    //
  }),
  // Define a mutation to update the productSize_list state
  // mutations: {
  //   updateProductSizeList(state, newValue) {
  //     state.productSize_list = newValue
  //   }
  // },
  getters: {},
  actions: {
    setSize(newValue) {
      this.productSize_list = newValue
      this.productSize_item = newValue
    },
    //
    addToCart(id, qty = 1, isBuy) {
      const { isLogin } = useLoginStore()
      if (!isLogin) {
        // ? 兩種方式都無法
        // this.$swal.fire('Please', ' Sign in or Sign up first.', 'warning')
        // VueSweetalert2.fire('Please', 'Sign in or Sign up first.', 'warning')
        //
        router.push('/login')
      } else {
        if (!this.productSize_list && !this.productSize_item) {
          // this.$swal.fire('Please', 'Size must be selected.', 'warning')
          console.log('no Size')
        } else {
          // ? [Vue warn]: Write operation failed: computed property "productSize_list" is readonly.
          this.statusBtn.loadingItem = id
          this.isLoading = true
          const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`
          const cart = {
            product_id: id,
            qty
          }
          axios.post(url, { data: cart }).then(() => {
            this.isLoading = false
            this.statusBtn.loadingItem = ''
            // this.$httpMessageState(response, '加入購物車');
            // this.$toast('success', 'add to cart.')
            this.getCart()
            if (isBuy) {
              router.push('/cart-view/cart-list')
              // *觸發該頁函式，讓下一頁資料更新
              this.getCart()
            }
          })
        }
      }
    },
    getCart() {
      this.isLoading = true
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`
      axios.get(api).then((res) => {
        this.isLoading = false
        this.carts = res.data.data.carts
        //* 需先歸零，必需在這計算
        this.sumTotal = 0
        this.sumFinalTotal = 0
        this.sumFinalQty = 0
        this.carts.forEach((item) => {
          this.sumTotal += item.total
          this.sumFinalQty += item.qty
        })
        //
      })
    },
    updateCart(item) {
      this.statusBtn.loadingItem = item.id
      this.isLoading = true
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${
        item.id
      }`
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      axios.put(url, { data: cart }).then(() => {
        this.statusBtn.loadingItem = ''
        this.isLoading = false
        this.getCart()
      })
    }
  }
})
