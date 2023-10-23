<script>
import cartStore from '@/stores/cartStore.js';
import favoriteStore from '@/stores/favoriteStore';
import productStore from '@/stores/productStore';
import { mapActions, mapState } from 'pinia';
import loginStore from '@/stores/loginStore';

export default {
  data() {
    return {
      isLoading_small: false, //列表載入
      statusBtn_car: {
        loadingItem: ''
      },
      //
      products: [], // 原始資料
      Filtered: [], // 搜尋全部商品用
      //
      page: 1,
      pagination: {},
      //
      productsList_hight: 0,
      //
      selectSort: '0', //名稱價格排序 (不用與其他元件共用狀態，故保留)
      setClass: false,
      //
      //! 不用去pinia讀取，getter回來會報錯不能修改值 > 但寫不進去store > 使用watch監聽
      productSize_list: '',
      productSize_item: '',
      //
      addToCart_item_id: null
    };
  },
  // props: { filtersData: { type: Array } }, //! 不能重複宣告
  props: ['childClass'], // 傳入用一串class包起來的變數，來改變子元件樣式
  mounted() {
    this.productsList_hight = this.$refs.productsList_hight.offsetHeight; //! 在mounted定義會是零，但不定義會在其他頁報錯
    window.addEventListener('scroll', this.handleScroll);
  },
  created() {
    this.getProducts();
    this.getFiltered(); //! 取得全域搜尋資料
  },
  watch: {
    toast: {
      handler() {
        this.$toast(this.toast.res, this.toast.info);
      },
      deep: true
    },
    notLogin(newVal) {
      if (newVal) {
        this.$swal
          .fire({
            title: 'Login or Sign up first.',
            icon: 'warning',
            showCloseButton: false,
            showCancelButton: false,
            focusConfirm: true,
            confirmButtonText: 'Login',
            confirmButtonAriaLabel: 'Thumbs up, great!'
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$router.push('/login');
            }
          });
      }
    },
    productSize_list() {
      this.addToCart(this.addToCart_item_id, 1, false);
    }
  },
  computed: {
    ...mapState(cartStore, ['isLoading']), //! statusBtn 和statusBtn_car 會衝到導致被覆蓋，所以改名
    ...mapState(favoriteStore, [
      'statusBtn',
      'filteredProducts',
      'favoriteIds',
      'toast',
      'notLogin'
    ]),
    ...mapState(productStore, ['cacheSearch', 'cacheCategory', 'filterCheck']),
    ...mapState(loginStore, ['isLogin']),
    //

    filteredData() {
      let filteredData = [];
      if (
        !this.$route.path.includes('products-content') &&
        !this.$route.path.includes('products-item')
      ) {
        filteredData = this.products;
      } else {
        // 名稱搜尋或分類搜尋
        filteredData = this.Filtered.filter(
          (item) =>
            (!this.cacheSearch || item.title.toLowerCase().includes(this.cacheSearch)) &&
            (!this.cacheCategory ||
              item.category.toLowerCase().includes(this.cacheCategory.trim().toLowerCase()))
        );

        if (filteredData.length === 0) {
          filteredData = this.products;
        }
        // !當無搜尋時就使用第一頁資料，在有搜尋時就使用全部資料，才不會一開始就渲染全部
        if (!this.cacheCategory && !this.cacheSearch) {
          filteredData = this.products;
        }

        const filterFunc = {
          999: (item) => item.price < 999,
          2999: (item) => item.price >= 999 && item.price <= 2999,
          3000: (item) => item.price >= 3000,
          default: () => true
        }[this.filterCheck || 'default'];

        const sortFunc = {
          Low: (a, b) => a.price - b.price,
          Height: (a, b) => b.price - a.price,
          AZ: (a, b) => a.title.localeCompare(b.title),
          ZA: (a, b) => b.title.localeCompare(a.title),
          default: () => 0
        }[this.selectSort || 'default'];

        filteredData = filteredData.filter(filterFunc).sort(sortFunc);
      }

      return filteredData;
    }
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    ...mapActions(favoriteStore, ['getFavorite', 'updateFavorite']),
    ...mapActions(productStore, ['getProduct_item']),
    //
    addToCart(id, qty = 1, isBuy) {
      if (!this.isLogin) {
        // ! 在store不會用到this ，共用狀態才會放store
        this.$swal
          .fire({
            title: 'Login or Sign up first.',
            icon: 'warning',
            showCloseButton: false,
            showCancelButton: false,
            focusConfirm: true,
            confirmButtonText: 'Login',
            confirmButtonAriaLabel: 'Thumbs up, great!'
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$router.push('/login');
            }
          }); // this.$router.push('/login')
      } else {
        if (!this.productSize_list && !this.productSize_item) {
          this.$swal.fire('Please', 'Size must be selected.', 'warning');
        } else {
          this.statusBtn_car.loadingItem = id;
          //
          const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`;
          const cart = {
            product_id: id,
            qty
          };
          this.$http.post(url, { data: cart }).then(() => {
            this.getCart();
            //
            this.statusBtn_car.loadingItem = '';
            this.$toast('success', 'add to cart.');
            if (isBuy) {
              this.$router.push('/cart-view/cart-list');
              // 觸發該頁函式，讓下一頁資料更新
              this.getCart();
            }
          });
        }
      }
    },
    //
    handleScroll() {
      //! 這邊定義會在切換router時，取不到dom（可能生命週期沒有重整吧）
      // this.productsList_hight = this.$refs.productsList_hight.offsetHeight;
      if (window.scrollY > this.productsList_hight - 300) {
        this.pushProducts();
      }
    },
    //
    getFiltered() {
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/products/all`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.Filtered = res.data.products;
        }
      });
    },
    //
    getProducts(page = 1) {
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/products/?page=${page}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      });
    },
    //! 捲動更新
    // !將新數據合併到舊數據時，可以使用 concat 方法代替 new Set，避免重複儲存，也不用push推新的陣列物件進去，這樣會有兩個陣列物件，會無法迴圈
    pushProducts() {
      //! 要用this.isLoading阻擋，避免讀取api間隔，持續捲動導致重複讀取資料
      if (!this.isLoading_small && this.pagination.has_next) {
        this.isLoading_small = true;
        this.page++;
        const api = `${import.meta.env.VITE_APP_API}api/${
          import.meta.env.VITE_APP_PATH
        }/products/?page=${this.page}`;
        this.$http.get(api).then((res) => {
          if (res.data.success) {
            this.pagination = res.data.pagination;
            this.products = this.products.concat(res.data.products);
            //! 成功讀取分頁數後，才能關閉載入，進行下次資料儲存，否則會重複儲存
            this.isLoading_small = false;
          }
        });
      }
    },
    //
    goToProduct(id) {
      this.getProduct_item(id);
    }
  }
};
</script>

<template>
  <div class="product_list">
    <div class="mb-3 d-flex justify-content-end align-items-center" :class="childClass">
      <label for="Sort" class="form-label mb-0">Sort by：</label>
      <select
        v-model="selectSort"
        class="form-select form-select-lg rounded-3 px-1 py-2 fs-6"
        style="width: 250px"
        id="Sort"
      >
        <option class="fs-6" value="0" selected>Relevance</option>
        <option class="fs-6" value="AZ">Name - AZ</option>
        <option class="fs-6" value="ZA">Name - ZA</option>
        <option class="fs-6" value="Low">Price - Low to Height</option>
        <option class="fs-6" value="Height">Price - Height to Low</option>
      </select>
    </div>
    <hr class="py-3" />
    <div ref="productsList_hight">
      <div v-if="filteredData.length > 0" class="row row-cols-2 row-cols-lg-5 g-2 g-md-4 mb-7">
        <div v-for="(item, index) in filteredData" :key="item.id">
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
                  class="position-relative border border-white rounded-3 px-2 py-3 d-flex justify-content-around m-2"
                  style="backdrop-filter: blur(5px)"
                >
                  <i
                    @click="updateFavorite(item.id)"
                    :class="{
                      'text-danger': isLogin && favoriteIds.indexOf(item.id) !== -1
                    }"
                    class="fa fa-heart fs-4"
                  ></i>
                  <!--  -->
                  <el-popover
                    placement="top"
                    title="SIZE："
                    :width="200"
                    trigger="click"
                    @hide="setClass = false"
                    @show="setClass = index"
                    popper-class="product_list_el-popover"
                  >
                    <div
                      class="d-flex justify-content-center w-100 mx-auto gap-1"
                      style="z-index: 2"
                    >
                      <div>
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
                      <div>
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
                      <div>
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
                      <!-- @click="addToCart(item.id, qty, (isBuy = false))" 改成點擊加入購物車開啟選單 然後點擊尺寸就加入購物車 -->
                      <i
                        @click="addToCart_item_id = item.id"
                        class="fa fa-cart-plus text-white fs-4"
                      ></i>
                    </template>
                  </el-popover>
                  <!--  -->
                  <div
                    v-if="
                      statusBtn.loadingItem === item.id || statusBtn_car.loadingItem === item.id
                    "
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
      <div v-else>
        <p class="text-secondary text-center display-6">Sorry, the product list is empty.</p>
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

<style lang="scss">
.product_list_el-popover {
  z-index: 2 !important;
  border-radius: 0.75rem !important;
}

.product_list {
  min-height: 100vh;
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
    animation-duration: 1500ms;
    overflow: hidden !important;
    border-radius: 3%;

    & + img {
      transform: scale(1.2);
      border-radius: 3%;
    }
  }

  .fa-heart:hover {
    color: #dc3545;
  }

  @media (max-width: 768px) {
    .newproduct_cloth {
      opacity: 1 !important;
      display: flex;
      flex-direction: column;
      justify-content: end;
      transition: all;
      transition-duration: 500ms;
      z-index: 2;
    }
  }
}
</style>
