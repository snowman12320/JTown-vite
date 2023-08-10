//* 混合vue方法，減少重複程式碼，可以把重複計算或監聽屬性，以此打包
import Modal from 'bootstrap/js/dist/modal';

export default {
  methods: {
    showModal () {
      this.modal.show();
    },
    hideModal () {
      this.modal.hide();
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal); //* 繼承一個彈窗，並取得dom去操作
  }
};
