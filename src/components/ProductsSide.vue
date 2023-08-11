<template>
  <aside class="col-lg-2 lh-lg aside sticky-lg-top shadow align-self-start py-3" style="top:100px">
    <!--  -->
    <div class="my-3">
      <multiselect @click="getProducts()" v-model="cacheSearch" :options="options" :custom-label="nameWithLang"
        placeholder="search" label="title" track-by="title"></multiselect>
    </div>
    <ul class="list-unstyled d-flex flex-lg-column flex-row flex-wrap  justify-content-center my-3">
      <li class="mx-4 mx-md-0">
        <input ref="all" type="radio" class="d-none" name="side" id="all" value="" v-model="cacheCategory"
          :checked="cacheCategory === false">
        <label for="all">
          <span class="aside_span"> － </span>
          All
        </label>
      </li>
      <li v-for="(item, index) in uniqueCategories" :key="index">
        <input type="radio" class="d-none" name="side" :id="index" :value="item" v-model="cacheCategory">
        <label :for="index" class="mx-4 mx-md-0">
          <span class="aside_span"> － </span>
          {{ item }}
        </label>
      </li>
      <!-- 篩選 -->
    </ul>
    <hr class="py-2">
    <div class="d-flex flex-md-column flex-row gap-3 align-items-center align-items-lg-start justify-content-center">
      <h2 class="fs-6">PRICE：</h2>
      <div class="form-check">
        <label class="form-check-label" for="2999">
          <input type="radio" class="form-check-input" v-model="filterCheck" name="filterCheck" id="2999" value="2999">
          0-2999 </label>
      </div>
      <div class="form-check">
        <label class="form-check-label" for="5000">
          <input type="radio" class="form-check-input" v-model="filterCheck" name="filterCheck" id="5000" value="5000">
          5000+ </label>
      </div>
    </div>
  </aside>
</template>
<script>
import Multiselect from '@/components/Multiselect.vue';

export default {
  inject: ['emitter'],
  components: { Multiselect },
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      uniqueCategories: [],
      cacheSearch: '',
      cacheCategory: '',
      filterCheck: '',
      input_all: null,
      options: []
    };
  },
  created () {
    this.getProducts();
  },
  watch: {
    cacheSearch () {
      this.emitter.emit('customEvent_search', this.cacheSearch.title);
      this.cacheCategory = '';
    },
    cacheCategory () {
      this.cacheSearch = '';//* 避免分類內容和搜尋內容，兩個條件衝突
      this.filterCheck = '';
      this.emitter.emit('customEvent_category', this.cacheCategory);
    },
    filterCheck () {
      this.emitter.emit('customEvent_Check', this.filterCheck);
    }
  },
  methods: {
    nameWithLang ({ title }) { //* 整理選單
      return `${title}`;
    },
    getProducts () {
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        this.products = response.data.products;
        this.options = response.data.products;
        this.isLoading = false;
        this.products.forEach(product => {
          if (!this.uniqueCategories.includes(product.category)) {
            this.uniqueCategories.push(product.category);
          }
        });
      });
    }
  }
};
</script>
