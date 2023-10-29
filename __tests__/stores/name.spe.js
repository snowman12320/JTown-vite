import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
// 引入任何你想要测试的 store
import { cartStore } from '@/stores/cartStore.js';
import CartOffcanvas from '@/components/CartOffcanvas.vue'

import { describe, expect, it, vi } from 'vitest';

describe('123', () => {
  const wrapper = null;
  wrapper = mount(CartOffcanvas, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })]
    }
  });

  const store = cartStore(); // // 使用 pinia 的测试实例!

  // 可直接操作 state
  store.name = 'my new name';
  it('123', () => {
    // 也可以通过 patch 来完成
    store.$patch({ name: 'new name' });
    expect(store.name).toBe('new name');

    // action 默认是存根的(stubbed)，意味着它们默认不执行其代码。
    // 请看下面的内容来定制这一行为。
    store.someAction();

    expect(store.someAction).toHaveBeenCalledTimes(1);
    expect(store.someAction).toHaveBeenLastCalledWith();
  });
});
