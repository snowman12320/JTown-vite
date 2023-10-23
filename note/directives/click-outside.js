// 1.
// export default function install (Vue) {
//   Vue.directive('click-outside', {
//     bind (el, binding, vnode) {
//       el.clickOutsideEvent = function (event) {
//         // 判斷點擊事件是否發生在目標元素的外部
//         if (!(el === event.target || el.contains(event.target))) {
//           // 呼叫指令綁定時傳入的回呼函式
//           vnode.context[binding.expression](event);
//           this.isCropper = false;
//         }
//       };
//       document.body.addEventListener('click', el.clickOutsideEvent);
//     },
//     unbind (el) {
//       document.body.removeEventListener('click', el.clickOutsideEvent);
//     }
//   });
// }

// 2.
// 在 Vue 中註冊自訂指令 (away)
// import Vue from 'vue';

// Vue.directives('click-outside', {
//   bind (el, binding, vnode) {
//     const onClickOutside = (event) => {
//       if (el.contains(event.target)) return;
//       binding.value();
//     };

//     document.addEventListener('click', onClickOutside);

//     el._clickOutsideCleanup = () => {
//       document.removeEventListener('click', onClickOutside);
//     };
//   },
//   unbind (el) {
//     el._clickOutsideCleanup();
//     delete el._clickOutsideCleanup;
//   }
// });

// 3.
export default {
  mounted (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // 判斷點擊事件是否發生在目標元素的外部
      if (!(el === event.target || el.contains(event.target))) {
        // 呼叫指令綁定時傳入的回呼函式
        vnode.context[binding.value](event);
        this.isCropper = false;
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
};
