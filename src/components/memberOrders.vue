<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <!--  -->
    <el-autocomplete
      :popper-class="'my-autocomplete'"
      class="my-autocomplete-self"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="input order ID"
      @select="handleSelect"
    >
      <template #default="{ item }">
        <div class="p-2 el-autocomplete-list">
          <div class="d-flex justify-content-between">
            <div class="name">{{ item.id }}</div>
            <div class="name d-md-table-cell d-none">
              {{ $filters.dateAndTime(item.create_at) }}
            </div>
          </div>
          <div class="d-flex gap-4">
            <span class="addr text-danger">${{ $filters.currency(item.total) }}</span>
            <div>
              <span v-if="!item.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </div>
          </div>
        </div>
      </template>
    </el-autocomplete>
    <!-- order.length只有0和空白 {{ Boolean(order.length === 0)   }} -->
    <!-- 要用if不然抓不到資料會報錯 -->
    <form class="w-100 my-5" @submit.prevent="payOrder(order)" v-if="!Boolean(order.length === 0)">
      <table class="table align-middle">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th width="100" class="text-start">單價</th>
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
            <td class="text-end">$ {{ $filters.currency(Math.round(order.total)) }}</td>
          </tr>
        </tfoot>
      </table>
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
            <th>電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>地址</th>
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
    <!--  -->
    <Pagination :pages="pagination" @emit-pages="getOrders"> </Pagination>
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue'

export default {
  components: { Pagination },
  data() {
    return {
      orders: [],
      state: '',
      //
      pagination: {},
      isLoading: false,
      order: [],
      paid_date: null,
      create_at: null
    }
  },
  created() {
    this.getOrders()
  },
  mounted() {},
  methods: {
    querySearch(queryString) {
      const orders = this.orders
      const results = queryString ? this.createFilter(queryString) : orders
      // 调用 callback 返回建议列表的数据
      // cb(results);
      return results
    },
    createFilter(queryString) {
      return this.orders.filter((i) => i.id.toLowerCase().includes(queryString.toLowerCase()))
    },
    handleSelect(item) {
      // console.log(item);
      this.isLoading = true
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order/${
        item.id
      }`
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.order = res.data.order
          this.paid_date = new Date(this.order.paid_date * 1000).toLocaleString()
          this.create_at = new Date(this.order.create_at * 1000).toLocaleString()
          this.isLoading = false
          this.querySearch(false)
        }
      })
    },
    //
    getOrders(currentPage = 1) {
      this.currentPage = currentPage
      const url = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/orders?page=${currentPage}`
      this.isLoading = true
      this.$http.get(url, this.tempProduct).then((response) => {
        this.orders = response.data.orders
        this.pagination = response.data.pagination
        this.isLoading = false
      })
    },
    payOrder(order) {
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/pay/${
        order.id
      }`
      this.$http.post(url).then((res) => {
        if (res.data.success) {
          // this.order = [];
          this.handleSelect(order)
          this.getOrders()
        }
      })
    }
  }
}
</script>

<style lang="scss">
// 请注意，popper-class属性只对el-autocomplete的下拉菜单生效，不会影响输入框本身的样式。
.my-autocomplete-self {
  width: 100% !important;
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

@media (max-width: 768px) {
  .el-autocomplete-list {
    max-width: 200px;
  }
}
</style>
