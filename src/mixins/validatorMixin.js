export default {
  methods: {
    isName(value) {
      if (!value) {
        return '此欄為必填';
      }
      return true;
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
    isAddress(value) {
      if (!value) {
        return '地址為必填';
      }
      return true;
    },
    termCheck(value) {
      if (!value) {
        return '請閱讀並將卷軸拉至底部，決定是否勾選同意';
      }
      return true;
    },
    buyCheck(value) {
      if (!value) {
        return '請勾選同意';
      }
      return true;
    }
  }
};
