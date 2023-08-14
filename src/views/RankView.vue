<template>
  <div class="rankView">
    <Loading :active="isLoading"></Loading>
    <Header :is-login="isLogin"></Header>
    <ToastMessages></ToastMessages>
    <p style="margin-top: 104px !important"></p>
    <!-- banner -->
    <!-- 記得外推 圖才會完整 -->
    <!-- <section class="allstar_banner bgp-bottom bgs-cover mb-3"
      :style="{ 'background-image': `url(${require('@/assets/nbaWeb/allstar-2016-011016-top-1.jpg')})` }" style="
          background-repeat: no-repeat ;
          height: 500px;
          margin-top: 104px !important;
        "></section> -->
    <section
      class="allstar_banner bgp-bottom bgs-cover mb-3"
      :style="{ 'background-image': `url(${getImageUrl()})` }"
      style="background-repeat: no-repeat; height: 500px; margin-top: 104px !important"
    ></section>
    <div class="w-50 mx-auto">
      <RankList></RankList>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
// import loginMixin from '../mixins/loginMixin';
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import RankList from '@/components/RankList.vue'

import { useLoginStore } from '@/stores/useLoginStore.js'
import { mapActions, mapState } from 'pinia'

export default {
  // mixins: [loginMixin],
  components: {
    Header,
    Footer,
    ToastMessages,
    RankList
  },
  provide() {
    return {
      emitter
    }
  },
  mounted() {
    this.checkLoginStatus() // 在组件挂载时调用检查登录状态的方法
  },
  computed: {
    ...mapState(useLoginStore, ['isLoading', 'isLogin'])
  },
  methods: {
    ...mapActions(useLoginStore, ['checkLoginStatus']),
    // https://zhuanlan.zhihu.com/p/399939287
    getImageUrl() {
      return new URL('@/assets/nbaWeb/allstar-2016-011016-top-1.jpg', import.meta.url).href
    }
  }
}
</script>
<style scoped lang="scss">
.rankView {
  background-attachment: fixed;
  background-image: url(../assets/nbaWeb/bg-rank.jpg);
  background-repeat: round;
}
</style>
