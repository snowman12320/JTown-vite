import { defineStore } from 'pinia';
import router from '../router/router.js';
import axios from 'axios';

export default defineStore('productStore', {
  state: () => ({
    isLoading_productStore: false,
    product_item: [],
    cacheCategory: null,
    cacheSearch: null,
    filterCheck: null
  }),
  actions: {
    async getProduct_item(id) {
      try {
        //! 只取一個商品，傳入該商品id到內頁使用
        router.push(`/products-view/products-item/${id}`);
        this.isLoading_productStore = true;
        const api = `${import.meta.env.VITE_APP_API}api/${
          import.meta.env.VITE_APP_PATH
        }/product/${id}`;
        const res = await axios.get(api);
        this.isLoading_productStore = false;
        if (res.data.success) {
          this.product_item = res.data.product;
          const carouselItems = document.querySelectorAll('.carousel-item');
          carouselItems.forEach(function (item) {
            item.classList.remove('active');
          });
          carouselItems[0].classList.add('active');
          window.scrollTo(0, 0);
        }
      } catch (error) {
        this.$toast('error', ' Error fetching product:' + error);

        this.isLoading_productStore = false;
      }
    },
    setCategory(val) {
      this.cacheCategory = val;
      // 不會傳出去，但不重置會無法分類篩選
      this.cacheSearch = ''; //* 衝突，避免分類內容和搜尋內容，兩個條件衝突
      this.filterCheck = ''; //* 重置，避免資料顯示不完全
    },
    setCacheSearch(val) {
      if (val.title) {
        this.cacheSearch = val.title.trim().toLowerCase();
      } else {
        this.cacheSearch = val.trim().toLowerCase();
      }
      // 這邊改變值，不會傳出去，故不能改變選單選擇的狀態
      // this.cacheCategory = '';
      // this.filterCheck = '';
    },
    setFilterCheck(val) {
      this.filterCheck = val;
      //*不重置，篩選價格時不清空搜尋，會一直篩選全部
      // this.cacheCategory = ''
      // this.cacheSearch = ''
    }
  }
});
