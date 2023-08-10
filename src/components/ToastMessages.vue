<template>
  <div class="">
    <div class="toast-container position-absolute pe-3 top-0 end-0"></div>
    <div class="toast-container position-fixed pe-3  end-0" style="z-index: 1050;top:10%">
      <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
    </div>
  </div>
</template>
<script>
import Toast from '@/components/Toast.vue';
export default {
  inject: ['emitter'],
  components: { Toast },
  data () {
    return {
      messages: []
    };
  },
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
    });
  }
};
</script>
