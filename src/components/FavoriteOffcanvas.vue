<script>
import offcanvasMixin from '@/mixins/offcanvasMixin'
import DelModal from '@/components/DelModal.vue'

import useFavoriteStore from '../stores/useFavoriteStore.js'
import { mapActions, mapState } from 'pinia'
export default {
  inject: ['emitter'],
  mixins: [offcanvasMixin], //* 混用獨立的功能
  components: {
    DelModal
  },
  data() {
    return {
      // isLoading: false,
      //
      offcanvas: {},
      //
      tempFavorite: ''
    }
  },
  created() {
    console.clear()
    this.getFavorite()
  },
  computed: {
    ...mapState(useFavoriteStore, ['filteredProducts', 'favoriteIds','isLoading'])
  },
  methods: {
    ...mapActions(useFavoriteStore, ['getFavorite', 'getFavoriteId', 'delFavorite_store']),
    //
    delFavorite(id) {
      this.delFavorite_store(id)
      //
      const delCp = this.$refs.delModal
      // 通过属性选择器获取具有 data-ref="delModal" 属性的 DOM 元素 > 只能取到dom但沒有方法 (不是proxy)
      // let delCp = document.querySelector('[data-ref="delModal"]')
      delCp.hideModal()
    },
    delFavorites() {
      if (JSON.parse(localStorage.getItem('favorite')).length > 0) {
        this.$swal
          .fire({
            title: 'Do you want to delete the all Favorite?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'O.K'
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.isLoading = true
              localStorage.setItem('favorite', JSON.stringify([]))
              this.getFavorite() //* 刷新側邊頁面
              setTimeout(() => {
                this.$swal.fire('Done delete all!', '', 'success')
                this.isLoading = false
              }, 1000)
            }
          })
      } else {
        this.$swal.fire('Favorites was empty.', '', 'warning')
      }
    },
    //
    getProduct(id) {
      //! 只取一個商品
      this.$router.push(`/products-view/products-item/${id}`)
      this.isLoading = true
      this.isLoading_big = true
      this.emitter.emit('customEvent_isLoading_big', this.isLoading_big)
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/product/${id}`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.isLoading_big = false
        this.emitter.emit('customEvent_isLoading_big', this.isLoading_big)
        if (res.data.success) {
          this.product = res.data.product
          this.emitter.emit('customEvent_getProduct', this.product)
          // 取得所有的carousel-item元素，移除所有carousel-item元素的active類別
          const carouselItems = document.querySelectorAll('.carousel-item')
          carouselItems.forEach(function (item) {
            item.classList.remove('active')
          })
          carouselItems[0].classList.add('active')
          window.scrollTo(0, 0)
        }
      })
      // 確認收藏狀態
      //! 要用this.id ，用product.id會錯 ，需分清楚差別
      //! 在其他電腦，若先判斷會錯誤
      if (JSON.parse(localStorage.getItem('favorite'))) {
        const checkFavorite = Boolean(
          JSON.parse(localStorage.getItem('favorite')).indexOf(id) !== -1
        ) //* 搜尋目標
        if (checkFavorite) {
          this.isFavorite = true
          this.emitter.emit('customEvent_isFavorite', this.isFavorite)
        } else {
          this.isFavorite = false
          this.emitter.emit('customEvent_isFavorite', this.isFavorite)
        }
      }
    },
    //
    openDelModel(item) {
      this.tempFavorite = { ...item }
      const delCp = this.$refs.delModal
      delCp.showModal()
    }
  }
}
</script>

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
          <i class="fa fa-check-circle text-nbaRed" aria-hidden="true"></i> MY COLLECT
          <!--  -->
          <a
            @click.prevent="delFavorites"
            name=""
            id=""
            class="btn btn-outline-danger fs-5 px-2 ms-1"
            href="#"
            role="button"
          >
            <i class="fa-sharp fa-solid fa-heart-circle-xmark"></i>ALL</a
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
          class="d-flex p-2 border border-2 border-light rounded-3 product_item my-2 gap-2"
          v-for="(item, id) in filteredProducts"
          :key="id"
        >
          <div class="" style="width: 100px !important; height: 70px !important">
            <img class="of-cover op-top w-100 h-100" :src="item.imageUrl" alt="" />
          </div>
          <div class="w-100 p-1" @click="getProduct(item.id)">
            <h2 class="fs-6 text-center ellipsis">{{ item.title }}</h2>
            <p class="text-center pt-2 fs-5 mb-0">
              <small
                class="text-secondary text-decoration-line-through fw-lighter"
                style="font-size: 5px"
                >$ {{ $filters.currency(item.origin_price) }}</small
              >
              $ {{ $filters.currency(item.price) }}
              <span class="" style="font-size: 5px">/{{ item.unit }}</span>
            </p>
          </div>
          <button
            @click="openDelModel(item)"
            type="button"
            class="border-0 bg-transparent"
            style="height: 30px"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <!--  -->
        <p class="d-flex justify-content-end fs-4 mt-3">
          <span class="">TOTAL( {{ favoriteIds.length }} ) </span>
        </p>
      </div>
    </div>
    <DelModal
      :item="tempFavorite"
      ref="delModal"
      data-ref="delModal"
      @del-item="delFavorite(tempFavorite.id)"
    />
  </div>
</template>

<style scoped>
.no-spin::-webkit-inner-spin-button,
.no-spin::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.product_item {
  cursor: pointer;
}

.product_item:hover {
  background: rgba(172, 121, 255, 0.274);
  transition: all 300ms;
}

.ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  /*  有寬度才能多行  */
  width: 100%;
  height: 20px;
}
</style>
