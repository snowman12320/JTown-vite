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
      options: [], //下拉選單的選項
      cacheSearch: "",
      cacheCategory: "",
      filterCheck: "",
      toggleCollapse: false,
    };
  },
  created() {
    this.getProducts();
  },
  mounted() {
    this.toggleCollapse = window.innerWidth > 768 ? true : false;
  },
  watch: {
    cacheSearch(val) {
      this.cacheCategory = val.category;
      this.setCacheSearch(val);
      this.notSelectAllRadios();
      this.setToggleBehavior();
    },
    async cacheCategory(val) {
      //!  this.cacheSearch = ""; // 選分類不能清空搜尋，會讓監聽搜尋又觸發變更分類（資料狀態）
      this.setCategory(val);
      this.notSelectAllRadios();
      this.setToggleBehavior();
    },
    filterCheck(val) {
      this.setFilterCheck(val);
      this.setToggleBehavior();
    },
  },
  methods: {
    ...mapActions(productStore, ["setCategory", "setCacheSearch", "setFilterCheck"]),
    nameWithLang({ title }) {
      return `${title}`;
    },
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
    notSelectAllRadios() {
      document
        .querySelectorAll('input[type="radio"][name="filterCheck"]')
        .forEach((radio) => (radio.checked = false));
    },
    setToggleBehavior() {
      if (window.innerWidth < 768) {
        this.toggleCollapse = false;
        window.scrollTo({
          top: 200,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<template>
  <aside
    class="col-lg-2 lh-lg aside sticky-top shadow align-self-start pt-4 pb-2 my-3"
    style="top: 70px"
  >
    <div class="mb-3 d-flex align-items-center" style="height: 20px">
      <multiselect
        @click="getProducts"
        v-model="cacheSearch"
        :options="options"
        :custom-label="nameWithLang"
        placeholder="search"
        label="title"
        track-by="title"
      ></multiselect>
      <i
        class="bi bi-funnel d-md-none fs-1 ps-2"
        @click="toggleCollapse = !toggleCollapse"
      />
    </div>
    <main v-show="toggleCollapse">
      <ul
        class="list-unstyled d-flex flex-column flex-wrap justify-content-center align-items-center align-items-md-start my-3"
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
      </ul>
      <hr class="py-2" />
      <div
        class="d-flex flex-column gap-3 align-items-center align-items-md-start justify-content-center"
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
            />
            {{ "&lt; 999" }}
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
          <label class="form-check-label" for="3000">
            <input
              type="radio"
              class="form-check-input"
              v-model="filterCheck"
              name="filterCheck"
              id="3000"
              value="3000"
            />
            3000 +
          </label>
        </div>
      </div>
    </main>
  </aside>
</template>

<style lang="scss" scoped>
.form-check-input:checked {
  background-color: #0353a5;
  border-color: #0353a5;
  box-shadow: none;
}
</style>
