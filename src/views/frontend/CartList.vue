<script>
import CartModal from '@/components/CartModal.vue';
import validatorMixin from '@/mixins/validatorMixin';

import cartStore from '@/stores/cartStore.js';
import { mapActions, mapState } from 'pinia';

export default {
  mixins: [validatorMixin],
  components: {
    CartModal
  },
  data() {
    return {
      feeDeliver: 120,
      product: {},
      couponPercent: '',
      couponCode: 'default',
      options: [],
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        }
      },
      message: '這是留言',
      isBuyPerson: false,
      tempForm: {
        user: {
          email: 'snowman12320@gmail.com',
          name: '陳威良',
          tel: '0912346768',
          address: '台灣省'
        }
      },
      isLookOver: false,
      isTermChecked: false
    };
  },
  created() {
    if (!this.isLogin) {
      this.tempForm.user.email = JSON.parse(localStorage.getItem('username'));
      this.getCoupons();
    }
    //* 判斷有無折扣碼 然後自動addCouponCode()送出折扣碼 這樣才有折扣趴數資料
    if (localStorage.getItem('local-couponCode')) {
      this.couponCode = localStorage.getItem('local-couponCode');
    }
    if (this.carts.length > 0) {
      this.addCouponCode(); //* 取得購物車後 先判斷有無折扣碼並送出折扣碼 再判斷有無折扣趴數
    }
    this.getCart();
  },
  watch: {
    couponCode() {
      if (!localStorage.getItem('local-couponCode')) {
        localStorage.setItem('local-couponCode', this.couponCode);
      }
      localStorage.setItem('local-couponCode', this.couponCode);
      this.addCouponCode();
    }
  },
  computed: {
    ...mapState(cartStore, ['isLoading', 'carts', 'sumFinalQty', 'sumTotal'])
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'updateCart']),
    getCouponPercent() {
      if (this.couponCode !== 'default') {
        if (this.$route.path.includes('cart-list')) {
          const api = `${import.meta.env.VITE_APP_API}api/${
            import.meta.env.VITE_APP_PATH
          }/admin/coupons`;
          this.$http.get(api).then((res) => {
            const coupon = res.data.coupons.filter((coupon) => coupon.code === this.couponCode);
            this.couponPercent = coupon.percent;
          });
        }
      }
    },
    delCart(item) {
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${
        item.id
      }`;
      this.$http.delete(url).then(() => {
        this.$toast('success', 'delete ' + `"${item.product.title}"`);
        this.updateCart(item);
      });
      if (this.carts.length === 0) {
        this.getCart();
      }
    },
    getProduct(id) {
      this.$router.push(`/products-view/products-item/${id}`);
    },
    getCoupons() {
      const url = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/admin/coupons?page=1`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.options = res.data.coupons.filter((coupon) => coupon.is_enabled === 1);
        }
      });
    },
    addCouponCode() {
      // ! API 有問題，無法判斷折扣碼是否正確
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/coupon`;
      const coupon = {
        code: this.couponCode
      };
      this.$http.post(url, { data: coupon }).then((res) => {
        if (res.data.success) {
          this.getCouponPercent();
          this.getCart();
          this.$toast('success', 'Add Coupon');
        } else {
          localStorage.removeItem('local-couponCode', this.couponCode);
          this.getCouponPercent();
          this.getCart();
          this.$toast('success', 'Cancel coupon');
          this.couponCode = 'default';
          this.couponPercent = '';
          localStorage.setItem('local-couponCode', this.couponCode);
        }
      });
    },
    funcBuyPerson() {
      this.isBuyPerson = !this.isBuyPerson;
      if (this.isBuyPerson) {
        this.form = { ...this.tempForm };
      } else {
        this.form = {
          user: {
            email: '',
            name: '',
            tel: '',
            address: ''
          }
        };
      }
    },
    createOrder() {
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order`;
      const order = this.form;
      this.$http.post(url, { data: order }).then((res) => {
        localStorage.removeItem('local-couponCode', this.couponCode);
        this.getCart();
        this.$router.push(`checkout/${res.data.orderId}`);
      });
    },
    openModal() {
      const CartCp = this.$refs.CartModal;
      CartCp.showModal();
    },
    handleMyScroll() {
      this.isLookOver = true;
    },
    agreeTerm() {
      //! 關不掉黑幕，用BS內建屬性標籤關閉
      const CartCp = this.$refs.CartModal;
      CartCp.hideModal();
      this.isTermChecked = true;
      document.querySelector('[name="termCheck"]').checked = true;
    }
  }
};
</script>

<template>
  <div>
    <LoadingMask :active="isLoading" />
    <div class="row content container mx-auto mt-0">
      <aside class="col-12 col-lg-4 mb-3" style="z-index: 1">
        <section
          class="sticky-lg-top border-secondary rounded-3 mb-3 shadow top-20"
          style="top: 0px"
        >
          <div class="card w-100 p-3" style="width: 18rem">
            <ul class="list-group list-group-flush">
              <div class="accordion_cart" id="accordionExample">
                <div class="accordion-item border-0">
                  <h2>結帳金額</h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse show collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      class="accordion-body d-flex justify-content-between border-bottom p-3 pb-0"
                    >
                      <p>商品總計</p>
                      <p style="width: 100px; text-align: end">$ {{ sumTotal }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <li class="list-group-item d-flex justify-content-between pb-0">
                <p>優惠折抵</p>
                <p class="text-end">
                  <span
                    :class="
                      couponCode !== 'default' && carts.length > 0
                        ? 'd-block text-danger'
                        : 'd-none'
                    "
                  >
                    <i
                      @click="addCouponCode((couponCode = 'default'))"
                      class="bi bi-x-lg"
                      style="cursor: pointer"
                    />
                    已使用"{{ couponCode }}"折抵
                  </span>
                  -$
                  {{
                    couponPercent ? $filters.currency(sumTotal * ((100 - couponPercent) / 100)) : 0
                  }}
                </p>
              </li>
              <li class="list-group-item d-flex justify-content-between pb-0">
                <p>運費</p>
                <p>+$ {{ $filters.currency(feeDeliver) }}</p>
              </li>
              <li class="list-group-item d-flex justify-content-between pb-0">
                <p class="pt-3">應付總額</p>
                <p>
                  $
                  <span class="text-qopink fs-1 fw-bold">{{
                    $filters.currency(sumTotal + feeDeliver - sumTotal / (100 - couponPercent))
                  }}</span>
                </p>
              </li>
            </ul>
          </div>
        </section>
      </aside>

      <div class="col-12 col-lg-8">
        <h2 class="mt-lg-0 mt-5 pt-5">購物車內容</h2>
        <section class="border-1 rounded-3 table_overflow border p-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">商品明細</th>
                <th scope="col">單價</th>
                <th scope="col">數量</th>
                <th scope="col">小計</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in carts" :key="item.id">
                <th scope="row">
                  <img
                    :src="item.product.imageUrl"
                    :alt="item.product.title"
                    class="product_img_rwd of-cover op-top"
                    width="50"
                    height="50"
                    style="height: 50px; width: 50px"
                  />
                </th>
                <td>
                  <a
                    @click.prevent="getProduct(item.product.id)"
                    class="link-dark text-decoration-none text-nowrap"
                    style="cursor: pointer"
                  >
                    {{ item.product.title }}
                  </a>
                </td>
                <td class="text-nowrap">
                  NT$ {{ $filters.currency(item.product.price) }}
                  <span class="text-secondary" style="font-size: 3px"
                    >/{{ item.product.unit }}</span
                  >
                </td>
                <td>
                  <input
                    type="number"
                    class="amount carAmount"
                    min="1"
                    max="10"
                    step="1"
                    v-model.number="item.qty"
                    data-id="0"
                    @change="updateCart(item)"
                  />
                </td>
                <td class="text-nowrap">
                  NT$ {{ $filters.currency(item.qty * item.product.price) }}
                </td>
                <td>
                  <a
                    href="javascript:"
                    data-id="0"
                    class="link-qopink carDel"
                    @click="delCart(item)"
                  >
                    <i class="bi bi-x-lg" />
                  </a>
                </td>
              </tr>
            </tbody>
            <tfoot v-if="carts.length === 0">
              <tr>
                <td colspan="6">
                  <p class="text-center py-4">無加入任何商品</p>
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="d-flex justify-content-end">
            <span class="ms-auto">購物車 共計 {{ sumFinalQty }} 項商品</span>
          </div>
        </section>
        <FormValidate
          v-if="carts.length > 0"
          id="cartForm"
          @submit="createOrder"
          v-slot="{ errors }"
        >
          <h2 class="mt-3">會員專區</h2>
          <section>
            <ul class="list-group">
              <li class="list-group-item bg-qopink text-black">
                {{ tempForm.user.email }} 已登入
                <i class="bi bi-check-circle-fill text-danger" />
              </li>
              <li class="list-group-item">
                <h3>優惠折抵</h3>
                <div for="offTicket">
                  <select
                    name="offTicket"
                    id="offTicket"
                    class="form-select coupon_ticket"
                    @change="addCouponCode"
                    v-model="couponCode"
                  >
                    <option value="default" selected disabled>選擇優惠券</option>
                    <option :value="item.code" v-for="item in options" :key="item.id">
                      {{ item.title }}
                    </option>
                  </select>
                </div>
                <div class="col-12 d-flex flex-column" style="color: #ff0000" />
              </li>
            </ul>
          </section>
          <h2 class="mt-3">付款運送方式</h2>
          <section>
            <ul class="list-group">
              <li class="list-group-item">
                <h3>配送方式</h3>
                <div class="d-flex flex-column">
                  <div>
                    <input
                      required
                      type="radio"
                      class="shopCarHaul"
                      name="shopCarHaul"
                      id="5"
                      value="120"
                      checked
                    /><label for="5">宅配 </label>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <h3>付款方式</h3>
                <div class="mb-2">
                  <div>
                    <input
                      type="radio"
                      class="shopCarPay"
                      name="shopCarPay"
                      id="6"
                      value="6"
                    /><label for="6">信用卡(VISA、MasterCard、JCB) </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      class="shopCarPay"
                      name="shopCarPay"
                      id="7"
                      value="7"
                      checked
                    /><label for="7">虛擬帳號付款 </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      class="shopCarPay"
                      name="shopCarPay"
                      id="8"
                      value="8"
                    /><label for="8">超商付款 </label>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <h3>購買人資訊</h3>
                <div class="col-md-12">
                  <label for="inputEmail4" class="form-label mb-0">信箱</label>
                  <input
                    type="mail"
                    class="form-control mb-2"
                    id="email"
                    name="email"
                    value="snowman12320@gmail.com"
                    placeholder="購買人姓名"
                    maxlength="10"
                    disabled
                  />
                </div>
                <div class="col-md-12">
                  <label for="inputEmail4" class="form-label mb-0">姓名</label>
                  <input
                    type="text"
                    class="form-control mb-2"
                    id="nick"
                    name="nick"
                    value="陳O良"
                    placeholder="購買人姓名"
                    maxlength="10"
                    disabled
                  />
                </div>
                <div class="col-md-12">
                  <label for="inputPassword4" class="form-label mb-0">手機</label>
                  <input
                    type="tel"
                    class="form-control mb-2"
                    id="mobile"
                    name="mobile"
                    value="0912345678"
                    placeholder="購買人電話"
                    maxlength="10"
                    disabled
                  />
                </div>
                <div class="col-md-12">
                  <label for="inputPassword4" class="form-label mb-0">地址</label>
                  <input
                    type="text"
                    class="form-control mb-2"
                    id="mobile"
                    name="mobile"
                    value="台南市新營區"
                    placeholder="收件地址"
                    maxlength="10"
                    disabled
                  />
                </div>
              </li>
              <li class="list-group-item">
                <div class="col-12">
                  <div>
                    <input
                      @click="funcBuyPerson"
                      type="radio"
                      id="buy_person"
                      class="d-inline-block"
                      name="person"
                    /><label for="buy_person">同購買人 </label>
                    <div class="d-none">
                      <p class="ps-2 my-2 mb-0">取件人資訊 :</p>
                      <div class="bg-light rounded-3 p-2 text-black">
                        <p class="m-0 p-0">信箱：snowman12320@gmail.com</p>
                        <p class="m-0 p-0">姓名：陳威良</p>
                        <p class="m-0 p-0">手機：0977777777</p>
                        <p class="m-0 p-0">地址：台灣省</p>
                      </div>
                    </div>
                  </div>

                  <div class="mt-3">
                    <input type="radio" id="add_person" name="person" checked /><label
                      for="add_person"
                      >新增收件人
                    </label>
                    <div class="d-flex flex-column d-none p-1 pb-0">
                      <label for="email">信箱：</label>
                      <FieldValidate
                        id="email"
                        name="email"
                        type="email"
                        class="form-control"
                        placeholder="請輸入 Email"
                        rules="email|required"
                        :class="{
                          'is-invalid': errors['email'],
                          'is-valid': !errors['email'] && form.user.email
                        }"
                        v-model="form.user.email"
                      />
                      <ErrorMessage name="email" class="invalid-feedback" />
                      <!-- ! name要對到錯誤標籤的name / error['跟name一樣'] / :rule="自訂規則函式或vee內建" / -->
                      <label for="name">姓名：</label>
                      <FieldValidate
                        require
                        type="text"
                        name="姓名"
                        id="name"
                        class="form-control w-md-50 mb-2"
                        placeholder="姓氏大名"
                        maxlength="10"
                        :rules="isName"
                        :class="{
                          'is-invalid': errors['姓名'],
                          'is-valid': !errors['姓名'] && form.user.name
                        }"
                        v-model="form.user.name"
                      >
                      </FieldValidate>
                      <ErrorMessage name="姓名" class="invalid-feedback" />

                      <label for="tel">手機：</label>
                      <FieldValidate
                        type="tel"
                        name="手機"
                        id="tel"
                        class="form-control w-md-50 mb-2"
                        placeholder="09-12345678"
                        maxlength="10"
                        :rules="isPhone"
                        :class="{
                          'is-invalid': errors['手機'],
                          'is-valid': !errors['手機'] && form.user.name
                        }"
                        v-model="form.user.tel"
                      >
                      </FieldValidate>
                      <ErrorMessage name="手機" class="invalid-feedback" />

                      <p>*取貨通知將以此電話聯繫</p>
                      <label for="address">地址：</label>
                      <FieldValidate
                        require
                        type="text"
                        name="地址"
                        id="address"
                        class="form-control w-md-50 mb-2"
                        placeholder="取貨地址(縣市鄉鎮區巷弄樓層)"
                        :rules="isAddress"
                        :class="{
                          'is-invalid': errors['地址'],
                          'is-valid': !errors['地址'] && form.user.address
                        }"
                        v-model="form.user.address"
                      >
                      </FieldValidate>
                      <ErrorMessage name="地址" class="invalid-feedback" />
                    </div>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <p class="mb-0">備註</p>
                <textarea
                  cols="30"
                  rows="3"
                  class="w-100 form-control"
                  placeholder="特別提醒事項..."
                />
              </li>
              <li class="list-group-item">
                <div class="col-12">
                  <div class="mb-3 position-relative">
                    <FieldValidate
                      :disabled="!isLookOver"
                      :rules="termCheck"
                      required
                      id="termCheck"
                      name="termCheck"
                      v-model="isTermChecked"
                      type="checkbox"
                      class="form-check-input"
                      :class="{
                        'is-invalid': errors['termCheck'],
                        'is-valid': !errors['termCheck'],
                        'opacity-50': !isLookOver
                      }"
                    >
                    </FieldValidate>
                    <ErrorMessage
                      name="termCheck"
                      class="ms-3 invalid-feedback position-absolute"
                      style="bottom: -18px"
                    />
                    <label for="termCheck">
                      <span data-translate-keys="agree-terms" data-translate-html="true"
                        >同意
                      </span>
                      <button
                        type="button"
                        class="text-decoration-underline text-nbaBlue border-0 bg-white"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        @click="atTop = true"
                      >
                        會員責任規範及個資聲明
                      </button>
                    </label>
                  </div>

                  <div class="mb-3 position-relative">
                    <FieldValidate
                      :rules="buyCheck"
                      required
                      id="buyCheck"
                      name="buyCheck"
                      :value="true"
                      type="checkbox"
                      class="form-check-input"
                      :class="{
                        'is-invalid': errors['buyCheck'],
                        'is-valid': !errors['buyCheck']
                      }"
                    >
                    </FieldValidate>
                    <ErrorMessage
                      name="buyCheck"
                      class="ms-3 invalid-feedback position-absolute"
                      style="bottom: -18px"
                    />
                    <label for="buyCheck">
                      <span data-translate-keys="agree-terms" data-translate-html="true"
                        >同意，為保障彼此之權益，賣家在收到您的訂單後仍保有決定是否接受訂單及出貨與否之權利</span
                      >
                    </label>
                  </div>
                </div>
              </li>
            </ul>
            <div class="w-100 my-3 text-center">
              <button type="submit" class="btn btn-nbaBlue w-100" id="_cartCheckout">
                立即結帳
              </button>
              <RouterLink to="/products-view/products-content/title" class="text-black"
                >繼續購物</RouterLink
              >
            </div>
          </section>
        </FormValidate>
      </div>
    </div>
    <CartModal ref="CartModal" @my-scroll="handleMyScroll" @toggle:agreeTerm="agreeTerm" />
  </div>
</template>

<style scoped>
.table_overflow {
  overflow-x: auto;
}

[type='radio']:checked ~ div {
  display: block !important;
}

.was-validated .form-check-input:valid:checked,
.form-check-input.is-valid:checked {
  background-color: blue;
  border-color: blue;
}

.was-validated .form-check-input:invalid:focus,
.form-check-input.is-invalid:focus {
  box-shadow: none;
}
.form-control:focus {
  box-shadow: none;
}
</style>
