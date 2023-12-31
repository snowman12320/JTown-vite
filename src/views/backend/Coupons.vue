<script>
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'

import messageStore from '@/stores/messageStore'
import { mapActions } from 'pinia'

export default {
  components: { CouponModal, DelModal },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isLoading: false,
      isNew: false
    }
  },
  props: {
    config: Object
  },
  created() {
    this.getCoupons()
  },
  methods: {
    ...mapActions(messageStore, ['pushMessage']),
    openCouponModal(isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.showModal()
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    getCoupons() {
      this.isLoading = true
      const url = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/admin/coupons`
      this.$http.get(url, this.tempProduct).then((res) => {
        this.coupons = res.data.coupons
        this.isLoading = false
      })
    },
    updateCoupon(tempCoupon) {
      if (this.isNew) {
        const url = `${import.meta.env.VITE_APP_API}api/${
          import.meta.env.VITE_APP_PATH
        }/admin/coupon`
        this.$http.post(url, { data: tempCoupon }).then((res) => {
          console.log(res, tempCoupon)
          this.pushMessage(res, '新增優惠券')
          this.getCoupons()
          this.$refs.couponModal.hideModal()
        })
      } else {
        const url = `${import.meta.env.VITE_APP_API}api/${
          import.meta.env.VITE_APP_PATH
        }/admin/coupon/${this.tempCoupon.id}`
        this.$http.put(url, { data: this.tempCoupon }).then((res) => {
          this.pushMessage(res, '新增優惠券')
          this.getCoupons()
          this.$refs.couponModal.hideModal()
        })
      }
    },
    delCoupon() {
      const url = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/admin/coupon/${this.tempCoupon.id}`
      this.isLoading = true
      this.$http.delete(url).then((res) => {
        this.pushMessage(res, '刪除優惠券')
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.getCoupons()
      })
    }
  }
}
</script>

<template>
  <div class="w-100">
    <LoadingMask :active="isLoading" />
    <div class="text-end mt-4">
      <button type="button" class="btn btn-nbaBlue" @click="openCouponModal(true)">新增優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th class="d-md-table-cell d-none">折扣百分比</th>
          <th class="d-md-table-cell d-none">到期日</th>
          <th class="d-md-table-cell d-none">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="d-md-table-cell d-none">{{ item.percent }}%</td>
          <td class="d-md-table-cell d-none">{{ $filters.date(item.due_date) }}</td>
          <td class="d-md-table-cell d-none">
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-nbaBlue btn-sm" @click="openCouponModal(false, item)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-nbaRed btn-sm" @click="openDelCouponModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <couponModal :coupon="tempCoupon" ref="couponModal" @update-coupon="updateCoupon" />
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
  </div>
</template>

<style lang="scss" scoped>
tr:nth-child(even) {
  background-color: #eee;
}

tr:hover {
  background-color: rgba(0, 81, 255, 0.227);
}
</style>
