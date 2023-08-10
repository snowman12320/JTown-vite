
// !不能與其他mixin放在一起
import Offcanvas from 'bootstrap/js/dist/offcanvas';
export default {
  methods: {
    showOffcanvas () {
      this.offcanvas.show();
    },
    hideOffcanvas () {
      this.offcanvas.hide();
    }
  },
  mounted () {
    //* 物件繼承並綁定地址，然後存到物件中實體化
    this.offcanvas = new Offcanvas(this.$refs.offcanvas);
  }
};
