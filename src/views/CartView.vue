<template>
  <div class="">
    <Loading :active="isLoading"></Loading>
    <Header :is-login="isLogin"></Header>
    <p style="margin-top: 104px !important"></p>
    <ToastMessages></ToastMessages>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import loginMixin from '../mixins/loginMixin';
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  mixins: [loginMixin],
  components: {
    Header,
    Footer,
    ToastMessages
  },
  provide () {
    return {
      emitter
    };
  }
};
</script>
