<script>
import ProductModal from '@/components/ProductModal.vue'
import Pagination from '@/components/Pagination.vue'
import DelModal from '@/components/DelModal.vue'

import { mapActions } from 'pinia'
import messageStore from '@/stores/messageStore'

export default {
  components: {
    ProductModal,
    DelModal,
    Pagination
  },
  data() {
    return {
      products: [], //* 原始資料
      pagination: {}, //* 頁數資料
      tempProduct: {}, //* 暫存區
      isNew: false, //* 判斷有無資料
      isLoading: false, //* 載入效果開關
      temp_current_page: 1 //* 紀錄目前頁數，避免第二頁更新時跳到第一頁
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    ...mapActions(messageStore, ['pushMessage']),
    // 產品後台 取得遠端資料
    // !透過頁數取得資料
    getProducts(page = this.temp_current_page) {
      this.temp_current_page = page //* 有切換頁數就紀錄頁數，沒有就是原本null，不需要再res後再紀錄
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/admin/products/?page=${this.temp_current_page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },
    //! 新增時會帶一個true，編輯時會帶false和資料
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    //* 以下進行新增或編輯，使用不同ＡＰＩ
    updateProduct(item) {
      this.tempProduct = item
      // 新增
      let api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // 編輯
      if (!this.isNew) {
        api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${
          item.id
        }`
        httpMethod = 'put'
      }
      const productComponent = this.$refs.productModal
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        productComponent.hideModal()
        if (res.data.success) {
          this.getProducts()
          this.pushMessage(res, '更新')
        } else {
          this.pushMessage(res, '更新')
        }
      })
    },
    // 開啟刪除 Modal
    openDelProductModal(item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    delProduct() {
      // !塞入要刪除的ＩＤ
      const url = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/admin/product/${this.tempProduct.id}`
      this.$http.delete(url).then((response) => {
        this.pushMessage(response, response.data.message)
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.getProducts()
      })
    }
  }
}
</script>

<template>
  <div class="w-100">
    <LoadingMask :active="isLoading" />
    <div class="text-end mt-3">
      <button class="btn btn-nbaBlue" type="button" @click="openModal(true)">新增產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th class="d-md-table-cell d-none" width="120">分類</th>
          <th>產品名稱</th>
          <th class="d-md-table-cell d-none" width="120">原價</th>
          <th class="d-md-table-cell d-none" width="120">售價</th>
          <th class="d-md-table-cell d-none" width="100">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="d-md-table-cell d-none">{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right d-md-table-cell d-none">
            <!-- 使用methods/filters自定義的方法去加上千分位 -->
            {{ $filters.currency(item.origin_price) }}
          </td>
          <td class="text-right d-md-table-cell d-none">
            {{ $filters.currency(item.price) }}
          </td>
          <td class="d-md-table-cell d-none">
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button type="button" class="btn btn-outline-nbaBlue btn-sm" @click="openModal(false, item)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-nbaRed btn-sm" @click="openDelProductModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- props傳遞總頁數 emit傳出目前頁數 -->
    <Pagination :pages="pagination" @emit-pages="getProducts" />
    <!-- 更新資料，先帶原始資料進去元件，元件內修改後，再透過emit傳遞觸發函式和資料出來 -->
    <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct" />
    
    <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct" />
  </div>
</template>

<style lang="scss" scoped>
tr:nth-child(even) {
  background-color: #eee;
}

tr:hover {
  background-color: rgba(0, 81, 255, 0.237);
}
</style>
