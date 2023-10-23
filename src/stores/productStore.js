import { defineStore } from 'pinia';
import router from '../router/router.js';
import axios from 'axios';

export default defineStore('productStore', {
  state: () => ({
    isLoading_productStore: false,
    //
    product_item: [],
    //
    cacheCategory: null,
    cacheSearch: null,
    filterCheck: null
  }),
  getters: {},
  actions: {
    getProduct_item(id) {
      //! 只取一個商品，傳入該商品id到內頁使用
      router.push(`/products-view/products-item/${id}`);
      this.isLoading_productStore = true;
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/product/${id}`;
      axios.get(api).then((res) => {
        this.isLoading_productStore = false;
        if (res.data.success) {
          this.product_item = res.data.product; //* 更新內頁商品資料
          //* 輪播回到第一張，取得所有的carousel-item元素，移除所有carousel-item元素的active類別
          const carouselItems = document.querySelectorAll('.carousel-item');
          carouselItems.forEach(function (item) {
            item.classList.remove('active');
          });
          carouselItems[0].classList.add('active');
          window.scrollTo(0, 0);
        }
      });
    },
    setCategory(val) {
      this.cacheCategory = val;
      this.cacheSearch = ''; //* 衝突，避免分類內容和搜尋內容，兩個條件衝突
      this.filterCheck = ''; //* 重置，避免資料顯示不完全
    },
    setCacheSearch(val) {
      if (val.title) {
        this.cacheSearch = val.title.trim().toLowerCase();
      } else {
        this.cacheSearch = val.trim().toLowerCase();
      }
      this.cacheCategory = '';
      this.filterCheck = '';
    },
    setFilterCheck(val) {
      this.filterCheck = val;
      //*不重置，篩選價格時不清空搜尋，會一直篩選全部
      // this.cacheSearch = ''
      // this.cacheCategory = ''
    }
  }
});
