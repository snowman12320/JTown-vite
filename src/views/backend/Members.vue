<template>
  <div class="container">
    <div class="row mt-5 gap-3 gap-md-0">
      <MemberSide class="col-md-2"></MemberSide>
      <MemberOrders class="col-md-10"></MemberOrders>
    </div>
  </div>
</template>

<script>
import MemberOrders from '@/components/MemberOrders.vue'
import MemberSide from '@/components/MemberSide.vue'

export default {
  components: { MemberOrders, MemberSide }
}
</script>
