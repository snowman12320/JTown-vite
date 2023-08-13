<script>
// import Header from '@/components/Header.vue';
// import Footer from '@/components/Footer.vue';
// import loginMixin from '../mixins/loginMixin';
// import emitter from '@/methods/emitter';
// import ToastMessages from '@/components/ToastMessages.vue';
// export default {
//   mixins: [loginMixin],
//   components: {
//     Header,
//     Footer,
//     ToastMessages
//   },
//   provide () {
//     return {
//       emitter
//     };
//   }
// };

import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import loginMixin from '../mixins/loginMixin'
const { isLoading, isLogin } = loginMixin
import { provide } from 'vue'

import ToastMessages from '@/components/ToastMessages.vue'

export default {
  components: {
    Header,
    Footer,
    ToastMessages
  },
  setup() {
    const emitter = {
      events: {},
      on(event, callback) {
        if (!this.events[event]) {
          this.events[event] = []
        }
        this.events[event].push(callback)
      },
      emit(event, data) {
        if (!this.events[event]) {
          return
        }
        this.events[event].forEach((callback) => {
          callback(data)
        })
      }
    }

    provide('emitter', emitter)
  }
}
</script>

<template>
  <div class="">
    <Loading :active="isLoading"></Loading>
    <Header :is-login="isLogin"></Header>
    <ToastMessages></ToastMessages>
    <router-view />
    <Footer></Footer>
  </div>
</template>
