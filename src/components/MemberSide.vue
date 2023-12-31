<template >
  <div>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Information <!-- <span class="badge bg-primary rounded-pill">14</span> -->
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Order List
        <span class="badge bg-primary rounded-pill">{{ ordersLength }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ordersLength: null,
      tempPage: 1,
      ordersAll: [],
      pagination: {}
    };
  },
  created () {
    this.getOrders();
    this.getOrdersAll();
  },
  methods: {
    getOrders (currentPage = 1) {
      this.currentPage = currentPage;
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/orders?page=${currentPage}`;
      this.$http.get(url, this.tempProduct).then((response) => {
        this.ordersLength = response.data.orders.length;
        this.pagination = response.data.pagination;
      });
    },
    getOrdersAll () {
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/orders?page=${this.tempPage}`;
      this.$http.get(url, this.tempProduct).then((response) => {
        this.ordersAll = this.ordersAll.concat(response.data.orders); // 將每一頁的資料加入到 orders 陣列中
        if (this.tempPage < this.pagination.total_pages) { // 如果當前頁數小於最後一頁，繼續取得下一頁的資料
          this.tempPage++;
          this.getOrdersAll();
          this.ordersLength = this.ordersAll.length;
        } else {
          console.log('getOrdersAll,random success', new Date(this.ordersAll[11].create_at * 1000).toISOString().split('T')[0]);
          // console.log('getOrdersAll,random success', new Date(new Date(this.ordersAll[11].create_at * 1000).toISOString().split('T')[0]).getTime());
        };
      });
    }
  }
};
</script>
