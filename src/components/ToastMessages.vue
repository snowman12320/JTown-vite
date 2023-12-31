<script>
import Toast from '@/components/Toast.vue'

import { mapState } from 'pinia'
import messageStore from '@/stores/messageStore'

export default {
  components: { Toast },
  computed: {
    ...mapState(messageStore, ['messages'])
  }
}
</script>

<template>
  <div>
    <div class="toast-container position-absolute pe-3 top-0 end-0"/>
    <div class="toast-container position-fixed pe-3 end-0" style="z-index: 1050; top: 10%">
      <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
    </div>
  </div>
</template>
