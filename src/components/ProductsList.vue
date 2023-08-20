<script>
import useCartStore from '../stores/useCartStore.js'
import useFavoriteStore from '../stores/useFavoriteStore'
import productStore from '@/stores/productStore'
import { mapActions, mapState } from 'pinia'

export default {
  inject: ['emitter'],
  data() {
    return {
      isLoading_small: false, //列表載入
      //
      products: [], // 原始資料
      Filtered: [], //! 搜尋全部商品用
      //
      page: 1,
      pagination: {},
      //
      productsList_hight: 0,
      //
      // id: '',
      // product: {},
      //
      cacheSearch: '', //名稱搜尋
      cacheCategory: '', //分類搜尋
      //
      filterCheck: '', //價格篩選
      selectSort: '0', //名稱價格排序
      //
      setClass: false,
      //! 不用去pinia讀取，getter回來會報錯不能修改值 > 但寫不進去store > 使用watch監聽
      productSize_list: ''
    }
  },
  // props: { filtersData: { type: Array } }, //! 不能重複宣告
  props: ['customClass'], //* 傳入用一串class包起來的變數，來改變子元件樣式
  mounted() {
    this.productsList_hight = this.$refs.productsList_hight.offsetHeight //! 在mounted定義會是零，但不定義會在其他頁報錯
    window.addEventListener('scroll', this.handleScroll) //* 監聽滾動事件
    //
    this.emitter.on('customEvent_search', (data) => {
      this.cacheSearch = data
    })
    this.emitter.on('customEvent_category', (data) => {
      this.cacheCategory = data
      // console.log(this.cacheCategory);//*檢視emitter有無觸發
      this.cacheSearch = ''
    })
    this.emitter.on('customEvent_Check', (data) => {
      this.filterCheck = data
    })
  },
  created() {
    console.clear()
    this.cacheSearch = this.$route.params.search
    this.getProducts()
    this.getFiltered() //! 取得全域搜尋資料
  },
  watch: {
    productSize_list(newValue) {
      // 调用 useCartStore.js 中的方法来更新 productSize_list
      this.setSize(newValue, '')
    }
  },
  computed: {
    ...mapState(useCartStore, ['isLoading', 'statusBtn_car']), //* statusBtn 和statusBtn_car 會衝到導致被覆蓋，所以改名
    ...mapState(useFavoriteStore, ['statusBtn', 'filteredProducts', 'favoriteIds']),
    //
    filteredData() {
      let filteredData = []
      if (
        !this.$route.path.includes('products-content') &&
        !this.$route.path.includes('products-item')
      ) {
        filteredData = this.products
      } else {
        filteredData = this.Filtered.filter(
          (item) =>
            (!this.cacheSearch ||
              item.title.toLowerCase().includes(this.cacheSearch.trim().toLowerCase())) &&
            (!this.cacheCategory ||
              item.category.toLowerCase().includes(this.cacheCategory.trim().toLowerCase()))
        )

        if (filteredData.length === 0) {
          filteredData = this.products
        }
        // !當無搜尋時就使用第一頁資料，在有搜尋時就使用全部資料，才不會一開始就渲染全部
        if (!this.cacheCategory && !this.cacheSearch) {
          filteredData = this.products
        }

        const filterFunc = {
          2999: (item) => item.price <= 2999,
          5000: (item) => item.price >= 5000,
          default: () => true
        }[this.filterCheck || 'default']

        const sortFunc = {
          Low: (a, b) => a.price - b.price,
          Height: (a, b) => b.price - a.price,
          AZ: (a, b) => a.title.localeCompare(b.title),
          ZA: (a, b) => b.title.localeCompare(a.title),
          default: () => 0
        }[this.selectSort || 'default']

        filteredData = filteredData.filter(filterFunc).sort(sortFunc)
      }

      return filteredData
    }
  },
  methods: {
    ...mapActions(useCartStore, ['addToCart', 'setSize']),
    ...mapActions(useFavoriteStore, ['getFavorite', 'updateFavorite']),
    ...mapActions(productStore, ['getProduct_item']),

    //
    handleScroll() {
      //! 這邊定義會在切換router時，取不到dom（可生命週期沒有重整吧）
      // this.productsList_hight = this.$refs.productsList_hight.offsetHeight;
      if (window.scrollY > this.productsList_hight - 300) {
        this.pushProducts()
      }
    },
    //
    getFiltered() {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.Filtered = res.data.products
        }
      })
    },
    //
    getProducts(page = 1) {
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/products/?page=${page}`
      // this.isLoading = true
      this.isLoading_big = true
      this.emitter.emit('customEvent_isLoading_big', this.isLoading_big)
      this.$http.get(api).then((res) => {
        // this.isLoading = false
        this.isLoading_big = false
        this.emitter.emit('customEvent_isLoading_big', this.isLoading_big)
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },
    //* 捲動更新
    // 將新數據合併到舊數據時，可以使用 concat 方法代替 new Set，避免重複儲存，也不用push推新的陣列物件進去，這樣會有兩個陣列物件，會無法迴圈
    pushProducts() {
      //! 要用this.isLoading阻擋，避免讀取api間隔，持續捲動導致重複讀取資料
      if (!this.isLoading_small && this.pagination.has_next) {
        this.isLoading_small = true
        // if (this.pagination.has_next) {
        // console.log(this.pagination);
        this.page++
        const api = `${import.meta.env.VITE_APP_API}api/${
          import.meta.env.VITE_APP_PATH
        }/products/?page=${this.page}`
        this.$http.get(api).then((res) => {
          if (res.data.success) {
            this.pagination = res.data.pagination
            // console.log(this.pagination);
            this.products = this.products.concat(res.data.products)
            // console.log(this.products);
            //! 成功讀取分頁數後，才能關閉載入，進行下次資料儲存，否則會重複儲存
            this.isLoading_small = false
          }
        })
        // }
      }
    },
    //goToProduct
    goToProduct(id) {
      this.getProduct_item(id)
    },
    getProduct(id) {
      //! 只取一個商品，傳入該商品id到內頁使用
      this.$router.push(`/products-view/products-item/${id}`)
      this.isLoading_big = true
      this.emitter.emit('customEvent_isLoading_big', this.isLoading_big)
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/product/${id}`
      this.$http.get(api).then((res) => {
        this.isLoading_big = false
        this.emitter.emit('customEvent_isLoading_big', this.isLoading_big)
        if (res.data.success) {
          // 更新內頁商品資料
          this.product = res.data.product
          this.emitter.emit('customEvent_getProduct', this.product)
          // 輪播回到第一張，取得所有的carousel-item元素，移除所有carousel-item元素的active類別
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
}
</script>

<template>
  <div class="">
    <!-- 排序  -->
    <div class="mb-3 d-flex justify-content-end align-items-center" :class="customClass">
      <label for="" class="form-label mb-0">Sort by：</label>
      <select
        v-model="selectSort"
        class="form-select form-select-lg rounded-0 p-1 fs-6"
        style="width: 250px"
        name=""
        id=""
      >
        <option class="fs-6" value="0" selected>Relevance</option>
        <option class="fs-6" value="AZ">Name - AZ</option>
        <option class="fs-6" value="ZA">Name - ZA</option>
        <option class="fs-6" value="Low">Price - Low to Height</option>
        <option class="fs-6" value="Height">Price - Height to Low</option>
      </select>
    </div>
    <hr class="py-3" />
    <div class="row row-cols-2 row-cols-lg-5 g-4 mb-7" ref="productsList_hight">
      <div class="" v-for="(item, index) in filteredData" :key="item.id">
        <div class="col overflow-hidden">
          <div
            class="card w-100 position-relation newproduct_img"
            :class="{ 'overflow-hidden': setClass === index }"
            data-num="1"
          >
            <div
              class="newproduct_cloth p-1"
              ref="newproduct_cloth"
              :class="{ newproduct_cloth_set: setClass === index }"
            >
              <h6 class="fw-light" style="font-size: 10px">{{ item.category }}</h6>
              <h5 class="fs-5 text-center" @click="goToProduct(item.id)">
                {{ item.title }}
              </h5>
              <h6 class="text-white text-center">$ {{ $filters.currency(item.price) }}</h6>
              <!--  -->
              <div
                class="position-relative border border-white rounded-1 px-2 py-3 bg-transparent d-flex justify-content-around m-2"
              >
                <i
                  @click="updateFavorite(item.id)"
                  :class="{ 'text-danger': favoriteIds.indexOf(item.id) !== -1 }"
                  class="fa fa-heart fs-4"
                ></i>
                <!--  -->
                <el-popover
                  placement="top"
                  title="SIZE："
                  :width="200"
                  trigger="hover"
                  content=""
                  @hide="setClass = false"
                  @show="setClass = index"
                >
                  <div class="d-flex justify-content-center w-100 mx-auto gap-1">
                    <div class="">
                      <input
                        value="S"
                        v-model="productSize_list"
                        class="form-check-input d-none"
                        type="radio"
                        name="size"
                        id="list_S"
                      />
                      <label
                        style="cursor: pointer"
                        :class="{ 'bg-black text-white': productSize_list === 'S' }"
                        class="form-check-label border border-secondary text-secondary fs-6 px-2 py-1"
                        for="list_S"
                      >
                        S
                      </label>
                    </div>
                    <div class="">
                      <input
                        value="M"
                        v-model="productSize_list"
                        class="form-check-input d-none"
                        type="radio"
                        name="size"
                        id="list_M"
                      />
                      <label
                        style="cursor: pointer"
                        :class="{ 'bg-black text-white': productSize_list === 'M' }"
                        class="form-check-label border border-secondary text-secondary fs-6 px-2 py-1"
                        for="list_M"
                      >
                        M
                      </label>
                    </div>
                    <div class="">
                      <input
                        value="L"
                        v-model="productSize_list"
                        class="form-check-input d-none"
                        type="radio"
                        name="size"
                        id="list_L"
                      />
                      <label
                        style="cursor: pointer"
                        :class="{ 'bg-black text-white': productSize_list === 'L' }"
                        class="form-check-label border border-secondary text-secondary fs-6 px-2 py-1"
                        for="list_L"
                      >
                        L
                      </label>
                    </div>
                    <div class="slanted-div">
                      <input
                        disabled
                        value="XL"
                        v-model="productSize_list"
                        class="form-check-input d-none"
                        type="radio"
                        name="size"
                        id="list_XL"
                      />
                      <label
                        style="cursor: not-allowed"
                        disabled
                        class="form-check-label border border-secondary text-secondary fs-6 px-2 py-1"
                        for="list_XL"
                      >
                        xL
                      </label>
                    </div>
                  </div>
                  <template #reference>
                    <i
                      @click="addToCart(item.id, qty, (isBuy = false))"
                      class="fa fa-cart-plus text-white fs-4"
                    ></i>
                  </template>
                </el-popover>
                <!--  -->
                <div
                  v-if="statusBtn.loadingItem === item.id || statusBtn_car.loadingItem === item.id"
                  class="text-center d-flex align-items-center justify-content-center position-absolute top-0 start-0 end-0 bottom-0"
                >
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
            <img
              data-num="1"
              height="312"
              width="312"
              class="card-img of-cover op-top"
              :src="item.imageUrl"
              :alt="item.title"
            />
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="text-center">
      <div v-show="isLoading_small" class="spinner-grow text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.col h5 {
  cursor: pointer;
}

.col i {
  cursor: pointer;
}

.newproduct_cloth_set {
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;
  transition: all;
  z-index: 2;
  animation-duration: 500ms;
  overflow: hidden !important;
  border-radius: 3%;

  & + img {
    transform: scale(1.2);
    border-radius: 3%;
  }
}
</style>
