<template>
  <div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>Remove "{{ item.title }}"</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Whether to delete
          <strong class="text-danger">"{{ item.title }}" ?</strong> <br>
          <small class="text-secondary">(it cannot be recovered after deletion)。</small>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            Cancel
          </button>
          <!--  -->
          <button v-if="item.title === 'ALL'" type="button" class="btn btn-danger" @click="$emit('del-all')">
            Confirm ALL
          </button>
          <button v-else type="button" class="btn btn-danger" @click="$emit('del-item')">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';
export default {
  mixins: [modalMixin],
  data () {
    return {
      modal: ''
    };
  },
  props: {
    item: {}
  }
};
</script>
