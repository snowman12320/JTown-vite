<script>
import ProductsList from '@/components/ProductsList.vue';
//
import { Pins } from '@fancyapps/ui/dist/panzoom/panzoom.pins.esm';
import { Panzoom } from '@fancyapps/ui/dist/panzoom/panzoom.esm';
//
import favoriteStore from '@/stores/favoriteStore';
import cartStore from '@/stores/cartStore';
import productStore from '@/stores/productStore';
import loginStore from '@/stores/loginStore';
import { mapState, mapActions } from 'pinia';

import { useToggle } from '@vueuse/core';

export default {
  components: {
    ProductsList
  },
  data() {
    return {
      isLoading_big: false,
      statusBtn_car: {
        loadingItem: ''
      },
      //
      product: {},
      productId: '',
      //
      qty: 1,
      isBuy: false,
      //
      productSize_item: '',
      //
      rateValue: 5,
      rateComment: 'The product is the best ,I have ever seen !',
      rateTime: '8: 40 AM, Today',
      rateData: [],
      //
      childClass: '',
      //
      container: null,
      options: {},
      panzoom: null
    };
  },
  //! mitt
  mounted() {
    //* 只能放一個圖
    this.container = this.$refs.myPanzoom;
    if (this.panzoom) {
      this.panzoom = new Panzoom(this.container, this.options, { Pins });
    }
  },
  created() {
    console.clear();
    this.productId = this.$route.params.productId; //! 統一商品唯一的ID(item.id)
    this.getProduct();
    this.getProduct_item(this.productId);
    //
    this.getFavorite(); //! 用其他電腦，先新增本地陣列
    //
    this.sendComment();
    this.changeClass();
  },
  computed: {
    ...mapState(favoriteStore, ['statusBtn']),
    ...mapState(favoriteStore, ['isFavorite', 'favoriteIds']),
    ...mapState(productStore, ['isLoading_productStore', 'product_item']),
    ...mapState(loginStore, ['isLogin'])
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    ...mapActions(favoriteStore, ['getFavorite', 'updateFavorite']),
    ...mapActions(productStore, ['getProduct_item', 'setCategory']),
    //
    addToCart(id, qty = 1, isBuy) {
      if (!this.productSize_item) {
        this.$swal.fire('Please', 'Size must be selected.', 'warning');
      } else {
        this.isLoading_big = true;
        const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`;
        const cart = {
          product_id: id,
          qty
        };
        this.$http.post(url, { data: cart }).then(() => {
          this.getCart();
          this.isLoading_big = false;
          this.$toast('success', 'add to cart.');
          if (isBuy) {
            this.$router.push('/cart-view/cart-list');
            //! 觸發該頁函式，讓下一頁資料更新
            this.getCart();
          }
        });
      }
    },
    //
    getProduct() {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/product/${
        this.productId
      }`;
      this.isLoading = true;
      this.isLoading_big = true;
      //
      this.$http.get(api).then((response) => {
        this.isLoading = false;
        this.isLoading_big = false;
        if (response.data.success) {
          this.product = response.data.product;
          this.setCategory(this.product.category);
        }
      });
    },
    sendComment() {
      if (!this.rateValue || !this.rateComment) {
        this.$toast('error', 'star and comment required.');
        return;
      }
      const data = {
        rateValue: this.rateValue,
        rateComment: this.rateComment,
        rateTime: this.rateTime
      };
      localStorage.setItem('rateData', JSON.stringify(data));
      this.updateComment();
      //
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();
      const currentPeriod = currentHour >= 12 ? 'PM' : 'AM';
      const formattedHour = currentHour % 12 === 0 ? 12 : currentHour % 12;
      const formattedMinute = currentMinute.toString().padStart(2, '0');
      const formattedTime = `${formattedHour}:${formattedMinute} ${currentPeriod}`;
      const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      this.rateTime = `${formattedTime}, ${formattedDate}`;
      this.rateValue = null;
      this.rateComment = '';
    },
    updateComment() {
      this.isLoading_big = true;
      this.rateData.unshift(JSON.parse(localStorage.getItem('rateData')));
      setTimeout(() => {
        this.isLoading_big = false;
        this.$toast('success', 'add comment');
      }, 1000);
    },
    changeClass() {
      this.childClass = 'products_sort';
    }
  },
  setup() {
    const [isHeart, toggleHeart] = useToggle();
    return {
      isHeart,
      toggleHeart
    };
  }
};
</script>

<template>
  <div>
    <Loading :active="isLoading_big"></Loading>
    <Loading :active="isLoading_productStore"></Loading>
    <!--  -->
    <div class="container-xl">
      <nav aria-label="breadcrumb" class="mt-10">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link class="breadcrumb_a" style="text-decoration: none !important" to="/"
              >Home</router-link
            >
          </li>
          <li class="breadcrumb-item">
            <router-link
              class="breadcrumb_a"
              style="text-decoration: none !important"
              to="/products-view/products-content/title"
              >Product</router-link
            >
          </li>
          <li class="breadcrumb-item active">
            <router-link
              class="breadcrumb_a"
              @click="setCategory(product_item.category)"
              style="text-decoration: none !important"
              to="/products-view/products-content/title"
              >{{ product_item.category }}</router-link
            >
          </li>
        </ol>
      </nav>
      <!--  -->
      <div class="row row-cols-md-2 g-md-5 mt-md-5">
        <div id="carouselExampleIndicators" class="carousel slide col-md-8" data-bs-ride="carouse">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              v-for="(item, index) in product_item.imagesUrl"
              :key="index + 1"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              :data-bs-slide-to="index + 1"
              aria-current="true"
              :aria-label="'Slide ' + index + 1"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active text-center h-100 w-100 mx-auto">
              <!-- <img :src="product_item.imageUrl" class=" w-auto  h-100" alt="..." /> -->
              <div class="f-panzoom h-100 w-100 mx-auto" ref="myPanzoom">
                <div data-panzoom-pin data-x="56%" data-y="60%">
                  <div title="My dream house">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      monica-exclude-el="m"
                    >
                      <path
                        d="M12 0a7.2 7.2 0 0 0-7.27 7.14C4.73 11.08 12 24 12 24s7.27-12.92 7.27-16.86A7.2 7.2 0 0 0 12 0Z"
                      ></path>
                    </svg>
                  </div>
                  <p
                    class="text-white"
                    style="
                      text-shadow:
                        2px 2px 4px #000,
                        -2px -2px 4px #000;
                    "
                  >
                    feature
                  </p>
                </div>
                <img class="f-panzoom__content w-100 h-100 mx-auto" :src="product_item.imageUrl" />
              </div>
            </div>
            <!--  -->
            <div
              class="carousel-item text-center h-100 w-100"
              v-for="(item, index) in product_item.imagesUrl"
              :key="index"
            >
              <img :src="item.url" class="w-auto h-100" alt="..." />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              class="carousel-control-prev-icon bg-info p-2 rounded-circle"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              class="carousel-control-next-icon bg-info p-2 rounded-circle"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <!--  -->
        <div class="col-md-4 d-flex flex-column justify-content-around text-center">
          <h1 class="mb-5">{{ product_item.title }}</h1>
          <!--  -->
          <div class="my-5">
            <div class="d-flex justify-content-center w-50 mx-auto">
              <div class="form-check">
                <input
                  value="S"
                  v-model="productSize_item"
                  class="form-check-input d-none"
                  type="radio"
                  name="size"
                  id="S"
                />
                <label
                  style="cursor: pointer"
                  class="form-check-label border border-secondary text-secondary px-3 py-2 rounded-3"
                  for="S"
                >
                  S
                </label>
              </div>
              <div class="form-check">
                <input
                  value="M"
                  v-model="productSize_item"
                  class="form-check-input d-none"
                  type="radio"
                  name="size"
                  id="M"
                />
                <label
                  style="cursor: pointer"
                  class="form-check-label border border-secondary text-secondary px-3 py-2 rounded-3"
                  for="M"
                >
                  M
                </label>
              </div>
              <div class="form-check">
                <input
                  value="L"
                  v-model="productSize_item"
                  class="form-check-input d-none"
                  type="radio"
                  name="size"
                  id="L"
                />
                <label
                  style="cursor: pointer"
                  class="form-check-label border border-secondary text-secondary px-3 py-2 rounded-3"
                  for="L"
                >
                  L
                </label>
              </div>
              <div class="form-check slanted-div">
                <input
                  disabled
                  value="XL"
                  v-model="productSize_item"
                  class="form-check-input d-none"
                  type="radio"
                  name="size"
                  id="XL"
                />
                <label
                  style="cursor: not-allowed"
                  disabled
                  class="form-check-label border border-secondary text-secondary px-3 py-2 rounded-3 overflow-hidden"
                  for="XL"
                >
                  XL
                </label>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="d-flex align-items-center justify-content-center gap-3">
            <small class="text-secondary fs-6 text-decoration-line-through fw-lighter"
              >$ {{ $filters.currency(product_item.origin_price) }}</small
            >
            <h2 class="text-center">$ {{ $filters.currency(product_item.price) }}</h2>
          </div>
          <div class="justify-content-center d-flex align-items-center my-3 gap-5">
            <div class="fs-1 d-flex justify-content-center gap-3 align-items-center">
              <button
                style="height: 40px"
                :disabled="qty === 1"
                @click="qty--"
                class="btn btn-outline-secondary py-0 rounded-3"
              >
                -
              </button>
              <span>{{ qty }}</span>
              <button
                style="height: 40px"
                @click="qty++"
                class="btn btn-outline-secondary py-0 rounded-3"
                id="plus"
              >
                +
              </button>
            </div>
            <!--  -->
            <div class="position-relative">
              <i
                v-if="favoriteIds.indexOf(product_item.id) !== -1"
                @click="updateFavorite(product_item.id)"
                class="fa-solid fa-heart fa-beat-fade text-danger fs-3"
              ></i>
              <i
                v-else
                @click="updateFavorite(product_item.id)"
                class="fa-solid fa-heart-crack fa-shake text-secondary fs-3"
                @mouseenter="toggleHeart(true)"
                @mouseleave="toggleHeart(false)"
                :class="{ 'text-white': isHeart }"
              ></i>
              <i
                v-if="isHeart"
                class="fa-solid fa-heart fa-beat-fade text-danger fs-3 position-absolute"
              ></i>
            </div>
          </div>
          <!--  -->
          <div class="d-flex flex-column flex-md-row justify-content-center gap-md-5 mt-5 gap-1">
            <button
              class="btn-outline-nbaBlue btn rounded-3"
              @click="addToCart(product_item.id, qty, (isBuy = false))"
              :class="{
                'btn btn-outline-nbaBlue': product_item.id === statusBtn.loadingItem
              }"
              :disabled="product_item.id === statusBtn.loadingItem"
            >
              ADD TO CART
            </button>
            <button
              class="btn btn-danger rounded-3"
              @click="addToCart(product_item.id, qty, (isBuy = true))"
            >
              BUY NOW
            </button>
          </div>
          <!--  -->
          <hr class="w-100 mx-auto" />
          <div class="my-3 d-flex gap-2 w-100 flex-wrap mx-auto">
            <el-tag class="fs-6 rounded-3 p-3" type="warning" size="small" effect="plain" round
              >Free shipping</el-tag
            >
            <el-tag class="fs-6 rounded-3 p-3" type="info" size="small" effect="plain" round
              >Store pickup</el-tag
            >
            <el-tag class="fs-6 rounded-3 p-3" type="danger" size="small" effect="plain" round
              >Fast delivery</el-tag
            >
          </div>
        </div>
      </div>
      <!--  -->
      <div class="row row-cols-md-2 flex-column-reverse flex-md-row">
        <div class="col-md-8">
          <h3 class="mt-7">DESCRIPTION</h3>
          <hr />
          <p v-html="product_item.content"></p>
          <!--  -->

          <h3 class="mt-7">COMMENT</h3>
          <hr />
          <div
            class="d-flex justify-content-start mb-4"
            v-for="(item, index) in rateData"
            :key="index"
          >
            <div class="img_cont_msg">
              <img
                :src="`https://i.pravatar.cc/150?img=${index}`"
                class="rounded-circle user_img_msg"
              />
            </div>
            <div class="d-flex flex-column">
              <el-rate
                class="ms-3"
                v-model="item.rateValue"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
              <div class="position-relative">
                <div class="msg_cotainer">
                  <!-- The product_item is the best ,I have ever seen ! -->
                  {{ item.rateComment }}
                </div>
                <span class="msg_time">{{ item.rateTime }}</span>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="card-footer mt-10">
            <el-rate v-model="rateValue" show-text> </el-rate>
            <div class="input-group d-flex align-items-end">
              <textarea
                @keydown.enter="sendComment()"
                v-model="rateComment"
                rows="3"
                class="form-control type_msg"
                placeholder="Type your comment ..."
              ></textarea>
              <span @click="sendComment" class="input-group-text send_btn"
                ><i class="fas fa-location-arrow"></i
              ></span>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="col-md-4 sticky-md-top align-self-start" style="top: 10%; z-index: 1">
          <div
            class="accordion d-flex justify-content-center mt-5"
            id="accordionPanelsStayOpenExample"
          >
            <div class="accordion-item w-100">
              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  DETAILS
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div class="accordion-body text-start">
                  <p v-html="product_item.description"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <h3 class="mt-7">RECOMMEND</h3>
      <ProductsList></ProductsList>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@fancyapps/ui/dist/fancybox/fancybox.css';
@import '@fancyapps/ui/dist/panzoom/panzoom.css';
@import '@fancyapps/ui/dist/panzoom/panzoom.pins.css';

.breadcrumb-item {
  a {
    color: #0253a5 !important;
  }
}

@media (max-width: 768px) {
  .carousel-item {
    img {
      width: 100% !important;
      object-fit: cover !important;
    }
  }

  .breadcrumb {
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 15px;
  }
}

.f-panzoom {
  // margin: 1rem auto 2rem;
  // padding: 1rem;
  height: 500px;
  width: auto;
  max-width: 1000px;
  cursor: zoom-in;
}

[data-panzoom-pin] {
  color: red;
  cursor: help;
}

.carousel {
  height: 500px;
}

.carousel-inner {
  height: 500px;
}

@media (max-width: 768px) {
  .carousel {
    height: 300px;
  }

  .carousel-inner {
    height: 300px;
  }
}

.accordion-button:focus {
  z-index: 3;
  border-color: var(--bs-accordion-btn-focus-border-color);
  outline: 0;
  box-shadow: none !important;
}

.accordion-button:not(.collapsed) {
  background-color: #fff;
  color: black;
}

.accordion {
  --bs-accordion-btn-active-icon: var(--bs-accordion-btn-icon);
  border-radius: 0.75em !important;
}

.form-check input:checked + label {
  border: 2px solid black !important;
  color: black !important;
}

.slanted-div {
  position: relative;
}

.slanted-div::after {
  content: '';
  position: absolute;
  top: 6%;
  right: 34%;
  width: 1%;
  height: 78%;
  transform: skew(130deg);
  background-color: #000;
}

.img_cont {
  position: relative;
  height: 70px;
  width: 70px;
}

.img_cont_msg {
  height: 40px;
  width: 40px;
}

.user_img {
  height: 70px;
  width: 70px;
  border: 1.5px solid #f5f6fa;
}

.user_img_msg {
  height: 40px;
  width: 40px;
  border: 1.5px solid #f5f6fa;
}

.msg_cotainer_send {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  border-radius: 25px;
  background-color: #78e08f;
  padding: 10px;
  position: relative;
}

.msg_time {
  position: absolute;
  left: 13px;
  bottom: -15px;
  color: rgba(148, 115, 115, 0.882);
  font-size: 10px;
  border-radius: 0.75em;
}

.msg_time_send {
  position: absolute;
  right: 0;
  bottom: -15px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
}

.msg_cotainer {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  border-radius: 0.75em;
  border: 1px solid #82ccdd;
  // background-color: #82ccdd;
  padding: 10px;
  position: relative;
}

.type_msg {
  min-height: 100px !important;
  overflow-y: auto;
  border-radius: 15px 15px 15px 15px !important;
}

.type_msg:focus {
  box-shadow: none !important;
  outline: 0px !important;
}

.send_btn {
  cursor: pointer;
  height: 38px;
  border: none !important;
  background-color: white;

  &:hover i {
    color: red;
  }
}

//! 如何在productItem元件中，使用class去隱藏productsList的元素，父層 控制 子層
.products_sort {
  display: none !important;
}

.fa-beat-fade.position-absolute {
  left: 0px;
  pointer-events: none;
}
.fa-heart-crack,
.fa-beat-fade {
  cursor: pointer;
}
</style>
