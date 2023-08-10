// 註冊指令
//* 前面用validator = 會顯示此變數不曾使用的錯誤 且需先定義
export default {
  // directive 生命週期
  mounted (el, binding) {
    el.focus();
    // 將外部的值改為
    el.className = binding.value;
  },
  updated: function (el, binding, vnode) {
    // el 元素本體
    // binding 綁定的資源狀態
    // vnode 虛擬 DOM 節點
    // console.log('update', el, binding, vnode);
    const className = binding.value;

    // 尋找當前的 model 名稱（取得 key 值，並帶入第一個）
    // const currentModel = Object.keys(binding.instance)[0];
    // console.log(currentModel);
    // 從當前 Model 取值
    // const value = binding.instance[currentModel];
    // console.log(currentModel, value); //? {}

    // ? 改寫取得的值路徑 (跟老師的範本不同)
    const value = vnode.dirs[0].value;
    // console.log('update', vnode.dirs[0]);

    // ? Email validate 範本的驗證都是返回錯
    // const re =
    //   /^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i;
    // const re = /^[0-9]+$/;
    const re = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    if (!re.test(value)) {
      el.className = `${className} is-invalid`;
    } else {
      el.className = `${className} is-valid`;
    }

    // ! 嘗試修正驗證 > 沒有正確漾式是因為 上方輸入值取得空值 , 兩種都可以改變class
    // const re = /^[0-9]+$/;
    // if (!re.test(value)) {
    //   el.classList.remove('is-valid');
    //   el.classList.add('is-invalid');
    // } else {
    //   el.classList.remove('is-invalid');
    //   el.classList.add('is-valid');
    // }
  }
};
