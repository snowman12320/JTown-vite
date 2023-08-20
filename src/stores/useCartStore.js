import { defineStore } from 'pinia'
import useLoginStore from './useLoginStore.js'

// import VueSweetalert2 from 'vue-sweetalert2'
// import { $swal } from 'vue-sweetalert2'
// import SweetAlert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import router from '../router/index.js'
import axios from 'axios'

// 改成default才能在其他store引入，不然引入時都要用解構取出(但不是問題)
export default defineStore('useCartStore', {
  state: () => ({
    isLoading: false,
    //
    qty: 1,
    statusBtn_car: {
      loadingItem: ''
    },
    //
    productSize_list: '',
    productSize_item: '',
    //
    carts: [],
    sumTotal: 0, //* 結帳頁的總計
    // sumFinalTotal: 0,
    sumFinalQty: 0
    //
  }),
  getters: {},
  actions: {
    setSize(list, item) {
      this.productSize_list = list
      this.productSize_item = item
    },
    //
    addToCart(id, qty = 1, isBuy) {
      const { isLogin } = useLoginStore()
      if (!isLogin) {
        // ? 兩種方式都無法
        // this.$swal.fire('Please', ' Sign in or Sign up first.', 'warning')
        //
        router.push('/login')
      } else {
        if (!this.productSize_list && !this.productSize_item) {
          // VueSweetalert2.Swal.fire('Please', 'Sign in or Sign up first.', 'warning')
          // this.$swal.fire('Please', 'Size must be selected.', 'warning')
          // $swal.fire('Please', 'Size must be selected.', 'warning')
          // SweetAlert2.fire('Please', 'Size must be selected.', 'warning')
          console.log('no Size')
        } else {
          this.statusBtn_car.loadingItem = id
          //
          const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`
          const cart = {
            product_id: id,
            qty
          }
          axios.post(url, { data: cart }).then(() => {
            this.getCart()
            this.statusBtn_car.loadingItem = ''
            // this.$httpMessageState(response, '加入購物車');
            // this.$toast('success', 'add to cart.')
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
        this.carts = res.data.data.carts
        //* 需先歸零，必需在這計算
        this.sumTotal = 0
        this.sumFinalQty = 0
        this.carts.forEach((item) => {
          this.sumTotal += item.total
          this.sumFinalQty += item.qty
        })
        //
        this.isLoading = false
      })
    },
    updateCart(item) {
      this.statusBtn_car.loadingItem = item.id
      //
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${
        item.id
      }`
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      axios.put(url, { data: cart }).then(() => {
        this.statusBtn_car.loadingItem = ''
        this.getCart()
      })
    }
  }
})
