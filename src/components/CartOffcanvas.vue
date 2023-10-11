<script>
import offcanvasMixin from '@/mixins/offcanvasMixin'
import DelModal from '@/components/DelModal.vue'

import cartStore from '../stores/cartStore.js'
import productStore from '../stores/productStore'
import { mapActions, mapState } from 'pinia'
export default {
  mixins: [offcanvasMixin], //* 混用獨立的功能
  components: {
    DelModal
  },
  data() {
    return {
      offcanvas: {},
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
  created() {
    // console.clear()
    this.getCart()
  },
  computed: {
    ...mapState(cartStore, ['isLoading', 'carts', 'statusBtn_car', 'sumTotal', 'sumFinalQty'])
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'updateCart']),
    ...mapActions(productStore, ['getProduct_item']),
    //
    async handleGetProductAndHideModal(id) {
      await this.getProduct_item(id)
      this.hideOffcanvas()
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
      this.$http.delete(url).then(() => {
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
              this.$http.delete(url).then(() => {
                this.getCart()
                this.$swal.fire('Done delete all!', '', 'success')
              })
            } else if (result.isDenied) {
              this.$swal.fire('Changes are not saved', '', 'info')
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

<template>
  <div>
    <div
      ref="offcanvas"
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <Loading :active="isLoading" />
      <div class="offcanvas-header d-flex justify-content-between align-items-center">
        <h5 id="offcanvasRightLabel" class="fs-3 text-center pt-3">
          <i class="fa fa-check-circle text-nbaRed" aria-hidden="true"></i> MY CART
          <!--  -->
          <a
            @click.prevent="delCarts"
            class="btn btn-outline-danger fs-5 px-2 ms-1"
            href="#"
            role="button"
          >
            <i class="bi bi-cart-x-fill"></i>ALL
          </a>
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
          style="height: 130px; cursor: pointer"
          v-for="item in carts"
          :key="item.id"
        >
          <div class="h-100" style="width: 150px">
            <img
              class="of-cover op-top w-100 h-100"
              :src="item.product.imageUrl"
              :alt="item.product.title"
            />
          </div>
          <div class="w-100 p-1">
            <h2 class="fs-6 text-center" @click="handleGetProductAndHideModal(item.product_id)">
              {{ item.product.title }}
            </h2>
            <p class="text-center pt-2 fs-5 mb-0">
              <small
                class="text-secondary text-decoration-line-through fw-lighter"
                style="font-size: 5px"
                >$ {{ $filters.currency(item.product.origin_price) }}</small
              >
              $ {{ $filters.currency(item.product.price) }}
              <span style="font-size: 5px">/{{ item.product.unit }}</span>
            </p>
            <div class="fs-1 d-flex justify-content-center gap-1 align-items-center">
              <button
                style="height: 30px"
                @click="minusQty(item)"
                class="btn btn-outline-secondary py-0"
                :disabled="item.qty === 1 || item.id === statusBtn_car.loadingItem"
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
                :disabled="item.id === statusBtn_car.loadingItem"
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
          <span>TOTAL( {{ sumFinalQty }} )</span>
          <span>$ {{ $filters.currency(sumTotal) }}</span>
        </p>
        <!--  -->
        <router-link
          to="/cart-view/cart-list"
          @click="hideOffcanvas"
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

<style scoped>
.no-spin::-webkit-inner-spin-button,
.no-spin::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
