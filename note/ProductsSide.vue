<script>
import Multiselect from "@/components/Multiselect.vue";

import productStore from "@/stores/productStore";
import { mapActions } from "pinia";

export default {
  components: { Multiselect },
  data() {
    return {
      status: {
        loadingItem: "",
      },
      uniqueCategories: [],
      options: [], //*下拉選單的選項
      //
      cacheSearch: "",
      cacheCategory: "",
      filterCheck: "",
    };
  },
  created() {
    this.getProducts();
  },
  watch: {
    cacheSearch(val) {
      this.setCacheSearch(val);
    },
    cacheCategory(val) {
      this.setCategory(val);
    },
    filterCheck(val) {
      this.setFilterCheck(val);
    },
  },
  methods: {
    ...mapActions(productStore, ["setCategory", "setCacheSearch", "setFilterCheck"]),
    // 下拉選項，帶入商品名稱
    nameWithLang({ title }) {
      return `${title}`;
    },
    // 取得分類選單
    getProducts() {
      const url = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/products/all`;
      this.$http.get(url).then((res) => {
        let products = res.data.products;
        this.options = res.data.products;
        products.forEach((i) => {
          if (!this.uniqueCategories.includes(i.category)) {
            this.uniqueCategories.push(i.category);
          }
        });
      });
    },
  },
};
</script>

<template>
  <aside
    class="col-lg-2 lh-lg aside sticky-lg-top shadow align-self-start py-3 mb-3"
    style="top: 100px"
  >
    <!--  -->
    <div class="my-3">
      <multiselect
        @click="getProducts"
        v-model="cacheSearch"
        :options="options"
        :custom-label="nameWithLang"
        placeholder="search"
        label="title"
        track-by="title"
      ></multiselect>
    </div>
    <ul
      class="list-unstyled d-flex flex-lg-column flex-row flex-wrap justify-content-center my-3"
    >
      <li class="mx-4 mx-md-0">
        <input
          ref="all"
          type="radio"
          class="d-none"
          name="side"
          id="all"
          value=" "
          v-model="cacheCategory"
          :checked="cacheCategory === ''"
        />
        <label for="all">
          <span class="aside_span"> － </span>
          All
        </label>
      </li>
      <li v-for="(item, index) in uniqueCategories" :key="index">
        <input
          type="radio"
          class="d-none"
          name="side"
          :id="index"
          :value="item"
          v-model="cacheCategory"
        />
        <label :for="index" class="mx-4 mx-md-0">
          <span class="aside_span"> － </span>
          {{ item }}
        </label>
      </li>
      <!-- 篩選 -->
    </ul>
    <hr class="py-2" />
    <div
      class="d-flex flex-md-column flex-row gap-3 align-items-center align-items-lg-start justify-content-center"
    >
      <h2 class="fs-6">PRICE：</h2>
      <div class="form-check">
        <label class="form-check-label" for="999">
          <input
            type="radio"
            class="form-check-input"
            v-model="filterCheck"
            name="filterCheck"
            id="999"
            value="999"
            v-text="'< 999'"
          />
        </label>
      </div>
      <div class="form-check">
        <label class="form-check-label" for="2999">
          <input
            type="radio"
            class="form-check-input"
            v-model="filterCheck"
            name="filterCheck"
            id="2999"
            value="2999"
          />
          999 - 2999
        </label>
      </div>
      <div class="form-check">
        <label class="form-check-label" for="5000">
          <input
            type="radio"
            class="form-check-input"
            v-model="filterCheck"
            name="filterCheck"
            id="5000"
            value="5000"
          />
          5000 +
        </label>
      </div>
    </div>
  </aside>
</template>
