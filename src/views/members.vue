<template >
    <div class=" container ">
        <div class="row mt-5 gap-3 gap-md-0">
            <memberSide class="col-md-2"></memberSide>
            <memberOrders class="col-md-10"></memberOrders>
        </div>
    </div>
</template>
<script>
import memberOrders from '../components/memberOrders.vue';
import memberSide from '../components/memberSide.vue';
export default {
  components: { memberOrders, memberSide }
};
</script>
