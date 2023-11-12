<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  name: 'couponModal',
  emits: ['update-coupon'],
  mixins: [modalMixin],
  data() {
    return {
      tempCoupon: {},
      due_date: ''
    };
  },
  props: {
    coupon: {}
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      [this.due_date] = this.$filters.dateOrTime(this.tempCoupon.due_date);
    },
    due_date() {
      this.tempCoupon.due_date = this.$filters.dateToSeconds(this.due_date);
    }
  }
};
</script>

<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content mt-10">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
            />
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
            />
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date" v-model="due_date" />
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input
              type="number"
              class="form-control"
              id="price"
              v-model.number="tempCoupon.percent"
              placeholder="請輸入折扣百分比"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
                id="is_enabled"
              />
              <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <!-- 像外傳遞整包暫存設定 -->
          <button type="button" class="btn btn-nbaBlue" @click="$emit('update-coupon', tempCoupon)">
            更新優惠券
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
