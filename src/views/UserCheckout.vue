<template>
  <div class="user_check">
    <Loading :active="isLoading"></Loading>
    <div class="row content container mx-auto mt-3">
      <section class="mx-auto header">
        <div class="d-flex justify-content-center my-5">
          <img
            height="130"
            src="@/assets/nbaWeb/1588928235basketball-fire-logo-silhouette-freesvg.org.svg"
            alt=""
          />
          <img class="" height="130" src="@/assets/nbaWeb/1506074059.svg" alt="" />
          <img
            class=""
            height="130"
            src="@/assets/nbaWeb/05284b30a1fda6bcdc09420b5c1e7127.svg"
            alt=""
          />
        </div>
        <p class="text-center">訂單已完成！</p>
        <p class="text-center">付款完成後，會盡快為您安排出貨！</p>
      </section>
    </div>
    <div class="my-5 row justify-content-center container-xl mx-auto">
      <form class="" @submit.prevent="payOrder">
        <div class="table_1">
          <table class="table align-middle">
            <thead>
              <th>品名</th>
              <th>數量</th>
              <th class="text-start">單價</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td>{{ item.product.title }}</td>
                <td>{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="text-start">$ {{ $filters.currency(Math.round(item.final_total)) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-end">總計</td>
                <td class="text-end">$ {{ $filters.currency(Math.round(order.total) + 120) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <!--  -->
        <table class="table">
          <tbody>
            <tr>
              <th width="100">訂單時間</th>
              <td>{{ create_at }}</td>
            </tr>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
            <tr v-if="!!order.is_paid">
              <th>付款時間</th>
              <td>{{ paid_date }}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-end" v-if="order.is_paid === false">
          <button class="btn btn-danger">pay now</button>
        </div>
        <div class="text-end" v-else>
          <router-link to="/"
            ><button class="btn btn-outline-primary">get other thing!</button></router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
// import loginMixin from '../mixins/loginMixin';

import useLoginStore from '@/stores/useLoginStore.js'
import { mapActions, mapState } from 'pinia'
export default {
  // mixins: [loginMixin],
  inject: ['emitter'],
  data() {
    return {
      order: {
        user: {}
      },
      orderId: '',
      // isLoading: false,
      paid_date: '',
      create_at: ''
    }
  },
  computed: {
    ...mapState(useLoginStore, ['isLoading', 'isLogin'])
  },
  methods: {
    ...mapActions(useLoginStore, ['checkLoginStatus']),
    getOrder() {
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order/${
        this.orderId
      }`
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.order = res.data.order
          this.paid_date = new Date(this.order.paid_date * 1000).toLocaleString()
          this.create_at = new Date(this.order.create_at * 1000).toLocaleString()
        }
      })
    },
    payOrder() {
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/pay/${
        this.orderId
      }`
      this.$http.post(url).then((res) => {
        // console.log(res);
        if (res.data.success) {
          this.getOrder()
        }
      })
    }
  },
  created() {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
<style scoped lang="scss">
.user_check {
  min-height: 100vh;

  .header {
    img {
      height: 100px !important;
      width: auto !important;
    }
  }

  .table_1 {
    overflow-x: auto;

    tr {
      white-space: nowrap;
    }
  }
}
</style>
