<template>
  <div class="">
    <Loading :active="isLoading"></Loading>
    <div class="row content container mx-auto mt-0">
      <aside class="col-12 col-lg-4" style="z-index: 1">
        <section
          class="sticky-lg-top border-secondary rounded-3 mb-3 border top-20"
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
                      <!-- 在這邊算會有問題 <p style="width: 100px; text-align: end;">
                        $ {{ $filters.currency(Math.round(sumFinalTotal /(couponPercent / 100))) }}</p> -->
                      <p style="width: 100px; text-align: end">$ {{ sumTotal }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <li class="list-group-item d-flex justify-content-between pb-0">
                <p>優惠折抵</p>
                <p class="text-end">
                  <span :class="couponCode !== 'default' ? 'd-block text-danger' : 'd-none'">
                    <i
                      @click="addCouponCode((couponCode = 'default'))"
                      class="bi bi-x-lg"
                      style="cursor: pointer"
                    ></i>
                    已使用"{{ couponCode }}"折抵
                  </span>
                  <!-- -$ {{ $filters.currency(Math.round((sumFinalTotal / (couponPercent / 100)) - sumFinalTotal)) }} -->
                  <!-- 可以在表达式中使用条件语句、三元表达式 -->
                  -$
                  {{ couponPercent ? $filters.currency(sumFinalTotal / (100 - couponPercent)) : 0 }}
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
                    $filters.currency(sumFinalTotal + feeDeliver)
                  }}</span>
                </p>
              </li>
            </ul>
          </div>
        </section>
      </aside>
      <!--  -->
      <div class="col-12 col-lg-8">
        <h2 class="mt-lg-0 mt-5 pt-5">購物車內容</h2>
        <section class="border-1 rounded-3 table_overflow border p-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">商品明細</th>
                <th scope="col">單價</th>
                <th scope="col">數量</th>
                <th scope="col">小計</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr class="" v-for="item in carts" :key="item.id">
                <th scope="row" class="">
                  <img
                    :src="item.product.imageUrl"
                    alt=""
                    srcset=""
                    class="product_img_rwd of-cover op-top"
                    width="50"
                    height="50"
                    style="height: 50px; width: 50px"
                  />
                </th>
                <td class="">
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
                    <i class="bi bi-x-lg"></i>
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
        <Form id="cartForm" @submit="createOrder" v-slot="{ errors }">
          <h2 class="mt-3">會員專區</h2>
          <section>
            <ul class="list-group">
              <li class="list-group-item bg-qopink text-black">
                {{ tempForm.user.email }} 已登入
                <i class="bi bi-check-circle-fill text-danger"></i>
              </li>
              <li class="list-group-item">
                <h3>優惠折抵</h3>
                <div for="offTicket" style="">
                  <select
                    name="offTicket"
                    id="offTicket"
                    class="form-select coupon_ticket"
                    @change="addCouponCode()"
                    v-model="couponCode"
                  >
                    <option value="default" selected disabled>選擇優惠券</option>
                    <option :value="item.code" v-for="(item, index) in options" :key="index">
                      {{ item.title }}
                    </option>
                  </select>
                </div>
                <div class="col-12 d-flex flex-column" style="color: #ff0000"></div>
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
                    disabled=""
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
                    disabled=""
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
                    disabled=""
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
                    disabled=""
                  />
                </div>
              </li>
              <li class="list-group-item">
                <div class="col-12">
                  <div class="">
                    <input
                      @click="funcBuyPerson()"
                      type="radio"
                      id="buy_person"
                      class="d-inline-block"
                      name="person"
                    /><label for="buy_person" class="">同購買人 </label>
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
                  <!--  -->
                  <div class="mt-3">
                    <input type="radio" id="add_person" name="person" checked="" /><label
                      for="add_person"
                      >新增收件人
                    </label>
                    <div class="d-flex flex-column d-none p-1 pb-0">
                      <label for="email">信箱：</label>
                      <Field
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
                      ></Field>
                      <error-message name="email" class="invalid-feedback"></error-message>
                      <!-- ! name要對到錯誤標籤的name / error['跟name一樣'] / :rule="自訂規則函式或vee內建" / -->
                      <label for="name">姓名：</label>
                      <Field
                        type="text"
                        name="姓名"
                        id="name"
                        class="form-control w-md-50 mb-2"
                        value=""
                        placeholder="姓氏大名"
                        maxlength="10"
                        :rules="isName"
                        :class="{
                          'is-invalid': errors['姓名'],
                          'is-valid': !errors['姓名'] && form.user.name
                        }"
                        v-model="form.user.name"
                      >
                      </Field>
                      <error-message name="姓名" class="invalid-feedback"></error-message>
                      <!--  -->
                      <label for="tel">手機：</label>
                      <Field
                        type="tel"
                        name="手機"
                        id="tel"
                        class="form-control w-md-50 mb-2"
                        value=""
                        placeholder="09-12345678"
                        maxlength="10"
                        :rules="isPhone"
                        :class="{
                          'is-invalid': errors['手機'],
                          'is-valid': !errors['手機'] && form.user.name
                        }"
                        v-model="form.user.tel"
                      >
                      </Field>
                      <error-message name="手機" class="invalid-feedback"></error-message>
                      <!--  -->
                      <p>*取貨通知將以此電話聯繫</p>
                      <label for="address">地址：</label>
                      <Field
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
                      </Field>
                      <error-message name="地址" class="invalid-feedback"></error-message>
                      <!--  -->
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
                ></textarea>
              </li>
              <li class="list-group-item">
                <div class="col-12">
                  <div class="mb-3 position-relative">
                    <!-- 無法顯示錯誤訊息原因是你沒有透過 :class 的方式去判斷 error-message何時該顯示，
                     另外 Field 後面也要記得利用 v-bind 去綁定 value  -->
                    <!--  check :value="true" 預設應該是false， 口空的 -->
                    <Field
                      :disabled="!isLookOver"
                      :rules="termCheck"
                      required
                      id="termCheck"
                      name="termCheck"
                      :value="true"
                      type="checkbox"
                      class="form-check-input"
                      :class="{
                        'is-invalid': errors['termCheck'],
                        'is-valid': !errors['termCheck'],
                        'opacity-50': !isLookOver
                      }"
                    >
                    </Field>
                    <error-message
                      name="termCheck"
                      class="ms-3 invalid-feedback position-absolute"
                      style="bottom: -18px"
                    ></error-message>
                    <label for="termCheck" class="">
                      <span data-translate-keys="agree-terms" data-translate-html="true">同意</span>
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
                  <!--  -->
                  <div class="mb-3 position-relative">
                    <Field
                      :rules="buyCheck"
                      required
                      id="buyCheck"
                      name="buyCheck"
                      :value="true"
                      type="checkbox"
                      class="form-check-input"
                      :class="{ 'is-invalid': errors['buyCheck'], 'is-valid': !errors['buyCheck'] }"
                    >
                    </Field>
                    <error-message
                      name="buyCheck"
                      class="ms-3 invalid-feedback position-absolute"
                      style="bottom: -18px"
                    ></error-message>
                    <label for="buyCheck" class="">
                      <span data-translate-keys="agree-terms" data-translate-html="true"
                        >同意，為保障彼此之權益，賣家在收到您的訂單後仍保有決定是否接受訂單及出貨與否之權利</span
                      >
                    </label>
                  </div>
                </div>
              </li>
              <div class="w-100 my-2">
                <button type="submit" class="btn btn-primary w-100" id="_cartCheckout">
                  立即結帳
                </button>
              </div>
            </ul>
          </section>
        </Form>
      </div>
    </div>
    <!-- Modal -->
    <!-- <CartModal ref="CartModal" @my-scroll="handleMyScroll"></CartModal> -->
  </div>
  <!--  -->
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
// import CartModal from '@/components/CartModal.vue'

import loginMixin from '@/mixins/loginMixin'
const { isLogin } = loginMixin

import mitt from 'mitt'

// components: {
//   CartModal
// },
const carts = ref([])
const sumFinalTotal = ref(0)
const sumFinalQty = ref(0)
const sumTotal = ref(0)
const isLoading = ref(true)
const feeDeliver = 120
const product = ref({})
const couponPercent = ref('')
const couponCode = ref('default')
const options = ref([
  {
    code: 'gooaya',
    title: 'gooaya / 每件商品打9折'
  },
  {
    code: 'howhowhasfriend',
    title: 'howhow / 每件商品打8折'
  }
])
const form = reactive({
  user: {
    email: '',
    name: '',
    tel: '',
    address: ''
  }
})
const message = ref('這是留言')
const isBuyPerson = ref(false)
const tempForm = reactive({
  user: {
    email: 'snowman12320@gmail.com',
    name: '陳威良',
    tel: '0912346768',
    address: '台灣省'
  }
})
const isLookOver = ref(false)
const emitter = mitt()

onMounted(() => {
  // if (isLogin.value) {
  //   //?
  //   Swal.fire('Please', ' Sign in or Sign up first.', 'warning')
  //   router.push('/login')
  // } else {
  //   tempForm.user.email = JSON.parse(localStorage.getItem('username'))
  //   emitter.emit('customEvent_getCart', getCart)
  //   getCart()
  //   getCoupons()
  // }

  emitter.on('customEvent_getCart', () => {
    getCart()
  })
})

onBeforeUnmount(() => {
  emitter.off('customEvent_getCart', () => {
    getCart()
  })
})

function getCart() {
  isLoading.value = true
  const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`

  http.get(api).then((res) => {
    isLoading.value = false
    carts.value = res.data.data.carts
    sumTotal.value = 0
    sumFinalTotal.value = 0
    sumFinalQty.value = 0
    carts.value.forEach((item) => {
      sumTotal.value += item.total
      sumFinalTotal.value += item.final_total
      sumFinalQty.value += item.qty
    })

    localStorage.setItem('local-couponCode', couponCode.value)
    couponCode.value = localStorage.getItem('local-couponCode')

    if (couponCode.value !== 'default') {
      if (router.currentRoute.path.includes('cart-list')) {
        couponPercent.value = res.data.data.carts[0].coupon.percent
      }
    }
  })
}

function delCart(item) {
  isLoading.value = true

  const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${item.id}`
  http.delete(url).then((res) => {
    isLoading.value = false
    httpMessageState(res, '移除購物車品項')
    updateCart(item)
  })

  if (carts.value.length === 0) {
    getCart()
  }
}

function updateCart(item) {
  status.loadingItem = item.id
  isLoading.value = true
  const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${item.id}`
  const cart = {
    product_id: item.product_id,
    qty: item.qty
  }
  http.put(url, { data: cart }).then(() => {
    status.loadingItem = ''
    isLoading.value = false
    getCart()
  })
}

function getProduct(id) {
  const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/product/${id}`
  http.get(api).then((res) => {
    if (res.data.success) {
      product.value = res.data.product
      emitter.emit('customEvent_getProduct', product)
    }
  })
  router.push(`/products-view/products-item/${id}`)
}

function getCoupons() {
  const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/coupons`
  http.get(url).then((res) => {
    if (res.data.success) {
      options.value = res.data.coupons.filter((coupon) => coupon.is_enabled === 1)
    }
  })
}

function addCouponCode() {
  const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/coupon`
  const coupon = {
    code: couponCode.value
  }
  isLoading.value = true
  http.post(url, { data: coupon }).then((res) => {
    if (res.data.success) {
      localStorage.setItem('local-couponCode', couponCode.value)
      httpMessageState(res, '加入優惠券')
      getCart()
      isLoading.value = false
    } else {
      localStorage.removeItem('local-couponCode', couponCode.value)
      emitter.emit('push-message', {
        style: 'danger',
        title: '取消優惠券'
      })
      couponCode.value = 'default'
      couponPercent.value = ''
      getCart()
      isLoading.value = false
    }
  })
}

function isName(value) {
  if (!value) {
    return '此欄為必填'
  }
  return true
}

function isPhone(value) {
  const phoneNumber = /^(09)[0-9]{8}$/
  return phoneNumber.test(value) ? true : '需要正確的電話號碼'
}

function isAddress(value) {
  if (!value) {
    return '地址為必填'
  }
  return true
}

function termCheck(value) {
  if (!value) {
    return '請閱讀"規範與聲明"文件，並將卷軸拉至底部，決定是否勾選同意'
  }
  return true
}

function buyCheck(value) {
  if (!value) {
    return '請勾選同意'
  }
  return true
}

function funcBuyPerson() {
  isBuyPerson.value = !isBuyPerson.value

  if (isBuyPerson.value) {
    form.user.email = tempForm.user.email
    form.user.name = tempForm.user.name
    form.user.tel = tempForm.user.tel
    form.user.address = tempForm.user.address
  } else {
    form.user.email = ''
    form.user.name = ''
    form.user.tel = ''
    form.user.address = ''
  }
}

function createOrder() {
  const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order`
  const order = form

  http.post(url, { data: order }).then((res) => {
    emitter.emit('customEvent_getCart', getCart)
    router.push(`checkout/${res.data.orderId}`)
  })
}

function openModal() {
  const CartCp = refs.CartModal
  CartCp.showModal()
}

function handleMyScroll() {
  isLookOver.value = true
}
</script>

<style scoped>
h1,
h2,
h3,
p {
  font-family: Rubik, sans-serif !important;
}

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
</style>
