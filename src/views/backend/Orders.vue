<script>
import DelModal from '@/components/DelModal.vue';
import OrderModal from '@/components/OrderModal.vue';
import Pagination from '@/components/Pagination.vue';

import messageStore from '@/stores/messageStore';
import { mapActions } from 'pinia';

export default {
  components: {
    Pagination,
    DelModal,
    OrderModal
  },
  data() {
    return {
      orders: [],
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1,
       search: '',
      filterPaid: 'default',
      ordersAll: [],
      tempPage: 1,
      selectSort: 'default'
    };
  },
  created() {
    this.getOrders();
    this.getOrdersAll();
  },
  computed: {
    filterOrder() {
      if (
        !this.search &&
        this.filterPaid.includes('default') &&
        this.selectSort.includes('default')
      ) {
        return this.orders;
      } else {
        //! 無法先排序 > 因為上面擋住了！！！( Irregular whitespace not allowed  no-irregular-whitespace)
        return this.ordersAll
          .filter((order) => this.filterOrderByIdAndDate(order))
          .filter(this.getFilterPaid())
          .sort(this.getSelectSort());
      }
    }
  },
  methods: {
    ...mapActions(messageStore, ['pushMessage']),
    //
    filterOrderByIdAndDate(order) {
      return (
        order.id.toLowerCase().includes(this.search.toLowerCase().trim()) ||
        this.$filters.date(order.create_at).match(this.search.trim())
      );
    },
    getFilterPaid() {
      const filterPaidOptions = {
        unpaid: (item) => item.is_paid === false,
        default: () => true
      };
      return filterPaidOptions[this.filterPaid || 'default'];
    },
    getSelectSort() {
      // https://blog.csdn.net/Fairyasd/article/details/125502752
      // https://blog.csdn.net/m0_57253767/article/details/126871697
      const sortFunc = {
        //! 都是秒數但要*1000才能，YYYY格式不行
        // Low: (a, b) => new Date(a.create_at * 1000).toISOString().split('T')[0] > new Date(b.create_at * 1000).toISOString().split('T')[0] ? 1 : -1,
        // Height: (a, b) => new Date(b.create_at).getTime() - new Date(a.create_at).getTime(),
        Low: (a, b) => new Date(a.create_at * 1000) - new Date(b.create_at * 1000), //* 低>高 升冪 (create_at = 1689688205)
        Height: (a, b) => new Date(b.create_at * 1000) - new Date(a.create_at * 1000),
        default: () => 0
      };
      return sortFunc[this.selectSort || 'default'];
    },
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const url = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/admin/orders?page=${currentPage}`;
      this.isLoading = true;
      this.$http.get(url, this.tempProduct).then((res) => {
        this.orders = res.data.orders;
        this.pagination = res.data.pagination;
        this.isLoading = false;
      });
    },
    openModal(isNew, item) {
      this.tempOrder = { ...item };
      this.isNew = isNew;
      const orderComponent = this.$refs.orderModal;
      orderComponent.showModal();
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item };
      if (!item.title) this.tempOrder.title = this.tempOrder.id;
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    updatePaid(item) {
      this.isLoading = true;
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid
      };
      this.$http.put(api, { data: paid }).then((res) => {
        this.getOrders(this.currentPage);
           const orderComponent = this.$refs.orderModal;
        orderComponent.hideModal();
        this.isLoading = false;
        this.pushMessage(res, '更新付款狀態');
      });
    },
    delOrder() {
      const url = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/admin/order/${this.tempOrder.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getOrders(this.currentPage);
        this.pushMessage(res, 'delete');
      });
    },
    getOrdersAll() {
      const url = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/admin/orders?page=${this.tempPage}`;
      this.$http.get(url, this.tempProduct).then((res) => {
        this.ordersAll = this.ordersAll.concat(res.data.orders); // 將每一頁的資料加入到 orders 陣列中
        if (this.tempPage < this.pagination.total_pages) {
          // 如果當前頁數小於最後一頁，繼續取得下一頁的資料
          this.tempPage++;
          this.getOrdersAll();
        } else {
          //! 須返回某個數值，不然會噴錯
          console.info(
            'getOrdersAll,random success',
            new Date(this.ordersAll[11].create_at * 1000).toISOString().split('T')[0]
          );
          // console.log('getOrdersAll,random success', new Date(new Date(this.ordersAll[11].create_at * 1000).toISOString().split('T')[0]).getTime());
        }
      });
    },
    delAllOrder() {
      // !避免誤刪
      const url = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/admin/order/allll`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getOrders(this.currentPage);
        this.pushMessage(res, 'delete all');
      });
    }
  }
};
</script>

<template>
  <div class="w-100">
    <LoadingMask :active="isLoading" />
    <!--  -->
    <div class="d-flex justify-content-end">
      <div class="mt-3 d-flex flex-column flex-md-row gap-1 flex-nowrap">
        <input
          v-model="search"
          type="search"
          class="form-control"
          aria-describedby="helpId"
          placeholder="search order ID / DATE"
        />
        <!--  -->
        <div class="flex-shrink-0">
          <select v-model="filterPaid" class="form-select form-select-lg">
            <option value="default" selected>to sift</option>
            <option value="unpaid">no paid</option>
          </select>
        </div>
        <button
          @click="openDelOrderModal((item = { title: 'ALL' }))"
          type="button"
          class="btn btn-nbaRed flex-shrink-0"
        >
          Delete ALL
        </button>
      </div>
    </div>
    <!--  -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th
            class="d-flex align-items-center justify-content-around d-md-flex d-none"
            @click="selectSort = selectSort === 'Height' ? 'Low' : 'Height'"
          >
            <span>購買時間</span>
            <div>
              <div class="form-check">
                <input
                  class="form-check-input d-none"
                  type="radio"
                  name="3"
                  id="1"
                  v-model="selectSort"
                  :value="selectSort"
                  :checked="selectSort === 'Low'"
                />
                <label
                  class="form-check-label"
                  for="1"
                  :class="{
                    ' text-primary': selectSort === 'Low' || selectSort === 'default'
                  }"
                >
                  <i class="bi bi-caret-up-fill"></i>
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input d-none"
                  type="radio"
                  name="3"
                  id="2"
                  v-model="selectSort"
                  :value="selectSort"
                  :checked="selectSort === 'Height'"
                />
                <label
                  class="form-check-label"
                  for="2"
                  :class="{
                    ' text-primary': selectSort === 'Height' || selectSort === 'default'
                  }"
                >
                  <i class="bi bi-caret-down-fill"></i>
                </label>
              </div>
            </div>
          </th>
          <th>訂單編號</th>
          <th class="d-md-table-cell d-none">姓名</th>
          <th class="d-md-table-cell d-none">Email</th>
          <th class="d-md-table-cell d-none">購買款項</th>
          <th class="d-md-table-cell d-none">應付金額</th>
          <th class="d-md-table-cell d-none">是否付款</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key) in filterOrder"
          :key="key"
          :class="{ 'text-secondary': !item.is_paid }"
        >
          <td class="d-md-table-cell d-none">
            {{ $filters.dateAndTime(item.create_at) }}
          </td>
          <td class="">{{ item.id }}</td>
          <td class="d-md-table-cell d-none">{{ item.user.name }}</td>
          <td class="d-md-table-cell d-none">
            <span v-text="item.user.email" v-if="item.user"></span>
          </td>
          <td class="d-md-table-cell d-none">
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} - 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right d-md-table-cell d-none">{{ Math.floor(item.total) }}</td>
          <td class="d-md-table-cell d-none">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${item.id}`"
                v-model="item.is_paid"
                @change="updatePaid(item)"
              />
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-nbaBlue btn-sm" @click="openModal(false, item)">
                檢視
              </button>
              <button type="button" class="btn btn-outline-nbaRed btn-sm" @click="openDelOrderModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <OrderModal :order="tempOrder" ref="orderModal" @update-paid="updatePaid"></OrderModal>
    <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder" @del-all="delAllOrder()">
    </DelModal>
    <Pagination
      v-show="!search && filterPaid === 'default'"
      :pages="pagination"
      @emit-pages="getOrders"
    >
    </Pagination>
  </div>
</template>

<style scoped lang="scss">
tbody tr:nth-child(even) {
  background-color: #eee;
}

tbody tr:hover {
  background-color: rgba(0, 81, 255, 0.225);
}

.table {
  th:nth-child(1) {
    cursor: pointer;
  }

  .form-check-label {
    font-size: 5px;
    color: rgba(79, 226, 226, 0.89);
  }
}
</style>
