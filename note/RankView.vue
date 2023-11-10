<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FullFooter from '@/components/FullFooter.vue'
import ToastMessages from '@/components/ToastMessages.vue'
import RankList from '@/components/RankList.vue'

import loginStore from '@/stores/loginStore.js'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    FrontNavbar,
    FullFooter,
    ToastMessages,
    RankList
  },

  mounted() {
    this.checkLoginStatus() // 在组件挂载时调用检查登录状态的方法
  },
  computed: {
    ...mapState(loginStore, ['isLoading', 'isLogin'])
  },
  methods: {
    ...mapActions(loginStore, ['checkLoginStatus']),
    // https://zhuanlan.zhihu.com/p/399939287
    getImageUrl() {
      return new URL('@/assets/image/nbaWeb/allstar-2016-011016-top-1.jpg', import.meta.url).href
    }
  }
}
</script>

<template>
  <div class="rankView">
    <LoadingMask :active="isLoading" />
    <FrontNavbar :is-login="isLogin"></FrontNavbar>
    <ToastMessages></ToastMessages>
    <p style="margin-top: 104px !important"></p>
    <section
      class="allstar_banner bgp-bottom bgs-cover mb-3"
      :style="{ 'background-image': `url(${getImageUrl()})` }"
      style="background-repeat: no-repeat; height: 500px; margin-top: 104px !important"
    ></section>
    <div class="w-50 mx-auto">
      <RankList></RankList>
    </div>
    <FullFooter></FullFooter>
  </div>
</template>

<style scoped lang="scss">
.rankView {
  background-attachment: fixed;
  background-image: url(@/assets/image/nbaWeb/bg-rank.jpg);
  background-repeat: round;
}
</style>
