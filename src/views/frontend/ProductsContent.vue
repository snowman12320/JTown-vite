<script>
import ProductsSide from '@/components/ProductsSide.vue'
import ProductsList from '@/components/ProductsList.vue'

export default {
  components: {
    ProductsSide,
    ProductsList
  }
}
</script>

<template>
  <div>
     <div id="Product" class="my-8 pt-6 d-flex justify-content-center align-items-center">
      <h2 class="text-pickBlack">NEW</h2>
      <img
        src="@/assets/image/nbaWeb/05284b30a1fda6bcdc09420b5c1e7127.svg"
        height="40"
        class="mx-2"
        alt="recentlyLogo"
      />
      <h2 class="text-pickBlack">PRODUCTS</h2>
    </div>
    <div class="container-xxl">
      <main class="row g-md-5">
        <ProductsSide></ProductsSide>
        <section class="col-lg-10 mb-5">
          <ProductsList></ProductsList>
        </section>
      </main>
    </div>
  </div>
</template>
