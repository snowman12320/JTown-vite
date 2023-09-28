<script>
export default {
  data() {
    return {
      products: {}
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.isLoading = true
          this.products = res.data.products
        }
      })
    },
    getProduct(id) {
      //! 好像只要傳送id即可，
      this.$router.push(`/products-view/products-item/${id}`)
      window.scrollTo(0, 0)
    }
  }
}
</script>

<template>
  <div>
    <div id="Product" class="my-5 d-flex justify-content-center align-items-center">
      <h2>NEW</h2>
      <img
        src="../assets/nbaWeb/05284b30a1fda6bcdc09420b5c1e7127.svg"
        height="80"
        alt="recentlyLogo"
      />
      <h2>PRODUCTS</h2>
    </div>
    <div style="height: 1000px !important; overflow: hidden">
      <div class="masonry">
        <div
          class="item"
          v-for="(item, index) in products"
          :key="item.id"
          data-aos="fade-up"
          :data-aos-duration="`${index * 1000}`"
          :data-aos-delay="`${index * 100}`"
          data-aos-offset="0"
        >
          <div class="overflow-hidden" @click="getProduct(item.id)">
            <div class="card w-100 position-relation newproduct_img" data-num="1">
              <div class="newproduct_cloth px-2">
                <h6>{{ item.category }}</h6>
                <h4>{{ item.title }}</h4>
              </div>
              <img
                data-num="1"
                style="height: auto"
                class="card-img of-cover op-top h-100 w-100"
                :src="item.imageUrl"
                :alt="item.title"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center my-5 d-flex flex-column flex-md-row justify-content-center">
      <router-link
        to="/products-view/products-content/title"
        class="btn btn-outline-dark rounded-pill fs-5 me-md-3 me-0 mb-3 mb-md-0"
      >
        MORE PRODUCT
      </router-link>
    </div>
  </div>
</template>

<style>
.masonry {
  column-count: 4;
  column-gap: 0;
  position: relative;
}

@media (max-width: 768px) {
  .masonry {
    column-count: 2;
  }
}

.masonry::after {
  content: '';
  background: linear-gradient(to bottom, transparent, white);
  height: 100px;
  position: absolute;
  top: 900px;
  left: 0;
  right: 0;
}

.item {
  padding: 2px;
  position: relative;
  counter-increment: item-counter;
  cursor: pointer;
}

.item img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
