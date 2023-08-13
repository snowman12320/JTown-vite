<template>
  <div class="">
    <div
      ref="offcanvas"
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <Loading :active="isLoading"></Loading>
      <div class="offcanvas-header d-flex justify-content-between align-items-center">
        <h5 id="offcanvasRightLabel" class="fs-3 text-center pt-3">
          <i class="fa fa-check-circle text-nbaRed" aria-hidden="true"></i> MY CART
          <!--  -->
          <a
            @click.prevent="delCarts"
            name=""
            id=""
            class="btn btn-outline-danger fs-5 px-2 ms-1"
            href="#"
            role="button"
          >
            <i class="bi bi-cart-x-fill"></i>ALL</a
          >
        </h5>
        <button
          type="button"
          class="btn-close text-reset fs-5"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div
          class="d-flex p-2 border border-2 border-light rounded-3 my-2 gap-2"
          style="height: 130px"
          v-for="(item, id) in carts"
          :key="id"
        >
          <div class="h-100" style="width: 150px">
            <img class="of-cover op-top w-100 h-100" :src="item.product.imageUrl" alt="" />
          </div>
          <div class="w-100 p-1">
            <h2 class="fs-6 text-center">{{ item.product.title }}</h2>
            <p class="text-center pt-2 fs-5 mb-0">
              <small
                class="text-secondary text-decoration-line-through fw-lighter"
                style="font-size: 5px"
                >$ {{ $filters.currency(item.product.origin_price) }}</small
              >
              $ {{ $filters.currency(item.product.price) }}
              <!-- <span class="" style="font-size:5px">/{{ item.product.unit }}</span> -->
            </p>
            <div class="fs-1 d-flex justify-content-center gap-1 align-items-center">
              <button
                style="height: 30px"
                @click="minusQty(item)"
                class="btn btn-outline-secondary py-0"
                :disabled="item.qty === 1 || item.id === status.loadingItem"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                class="fs-5 border-0 ps-3 no-spin"
                style="width: 50px"
                v-model.number="item.qty"
                @change="updateCart(item)"
              />
              <button
                style="height: 30px"
                @click="plusQty(item)"
                class="btn btn-outline-secondary py-0"
                :disabled="item.id === status.loadingItem"
              >
                +
              </button>
            </div>
          </div>
          <button
            @click="openDelCartModel(item)"
            type="button"
            class="border-0 bg-transparent"
            style="height: 30px"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <!--  -->
        <p class="d-flex justify-content-between fs-4 mt-3">
          <span class="">TOTAL( {{ sumFinalQty }} )</span>
          <span class="">$ {{ $filters.currency(sumFinalTotal) }}</span>
        </p>
        <!--  -->
        <router-link
          to="/cart-view/cart-list"
          @click="hideOffcanvas"
          name=""
          id=""
          class="btn btn-outline-nbaRed w-100 mt-5"
          href="#"
          role="button"
          >CHECK OUT</router-link
        >
      </div>
    </div>
    <DelModal :item="tempCartTitle" ref="delModal" @del-item="delCart" />
  </div>
</template>
<script>
import offcanvasMixin from '@/mixins/offcanvasMixin'
import DelModal from '@/components/DelModal.vue'
import addToCart from '../mixins/addToCart'
export default {
  inject: ['emitter'],
  mixins: [offcanvasMixin, addToCart], //* 混用獨立的功能
  components: {
    DelModal
  },
  data() {
    return {
      offcanvas: {},
      carts: [],
      sumFinalTotal: 0,
      sumFinalQty: 0,
      status: {
        loadingItem: ''
      },
      isLoading: false,
      tempCart: {},
      tempCartTitle: {}
    }
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.emitter.on('customEvent_getCart', () => {
      this.getCart()
    })
  },
  created() {
    this.getCart()
  },
  methods: {
    updateCart(item) {
      this.status.loadingItem = item.id
      this.isLoading = true
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${
        item.id
      }`
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((response) => {
        this.status.loadingItem = ''
        this.isLoading = false
        this.getCart()
      })
    },
    getCart() {
      this.isLoading = true
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.carts = res.data.data.carts
        //* 需先歸零，必需在這計算
        this.sumFinalTotal = 0
        this.sumFinalQty = 0
        this.carts.forEach((item) => {
          this.sumFinalTotal += item.total
          this.sumFinalQty += item.qty
        })
      })
    },
    openDelCartModel(item) {
      this.tempCart = { ...item }
      this.tempCartTitle = { ...item.product }
      const delCp = this.$refs.delModal
      delCp.showModal()
    },
    delCart() {
      // !塞入要刪除的ＩＤ
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${
        this.tempCart.id
      }`
      this.$http.delete(url).then((response) => {
        const delCp = this.$refs.delModal
        delCp.hideModal()
        this.updateCart(this.tempCart)
      })
    },
    delCarts() {
      if (this.carts.length > 0) {
        this.$swal
          .fire({
            title: 'Do you want to delete the all carts?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'O.K'
            // denyButtonText: 'Don\'t save'
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              const url = `${import.meta.env.VITE_APP_API}api/${
                import.meta.env.VITE_APP_PATH
              }/carts`
              this.$http.delete(url).then((res) => {
                this.getCart()
                this.$swal.fire('Done delete all!', '', 'success')
              })
            } else if (result.isDenied) {
              // this.$swal.fire('Changes are not saved', '', 'info');
            }
          })
      } else {
        this.$swal.fire('Cart was empty.', '', 'warning')
      }
    },
    plusQty(item) {
      item.qty++
      this.$nextTick(this.updateCart(item))
    },
    minusQty(item) {
      item.qty--
      this.$nextTick(this.updateCart(item))
    }
  }
}
</script>
<style scoped>
.no-spin::-webkit-inner-spin-button,
.no-spin::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
