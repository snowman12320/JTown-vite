<script>
import HomeCarousel from "@/components/HomeCarousel.vue";
import HomeStory from "@/components/HomeStory.vue";
import FrontNavbar from "@/components/FrontNavbar.vue";
import FullFooter from "@/components/FullFooter.vue";
import RankList from "../../components/RankList.vue";

import loginStore from "@/stores/loginStore.js";
import { mapActions, mapState } from "pinia";

export default {
  name: "HomeView",
  components: {
    FrontNavbar,
    HomeCarousel,
    HomeStory,
    FullFooter,
    RankList,
  },
  mounted() {
    this.checkLoginStatus();
  },
  computed: {
    ...mapState(loginStore, ["isLoading", "isLogin"]),
  },
  methods: {
    ...mapActions(loginStore, ["checkLoginStatus"]),
  },
};
</script>

<template>
  <div class="position-relative">
    <LoadingMask :active="isLoading" />
    <FrontNavbar />
    <HomeCarousel />
    <div class="container-xxl">
      <RankList />
      <HomeStory customClass="text-nbaBlue" />
    </div>
    <FullFooter />
  </div>
</template>
