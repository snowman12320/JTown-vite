import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import CartOffcanvas from '@/components/CartOffcanvas.vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

// 測試pinia就好 因為邏輯在裡面
test.skip('delCart method deletes the cart and updates', async () => {
  // Set up mock
  mock.onDelete(/cart/).reply(200);

  // Mount component
  const wrapper = mount(CartOffcanvas, {
    data() {
      return {
        tempCart: {
          id: '-NapG4oKOfeXI5z_a1iW'
        }
      };
    }
  });

  // Click delete button
  await wrapper.find('#openDelCartModel').trigger('click');

  // Assert delete called
  expect(mock.history.delete.length).toBe(1);
  expect(mock.history.delete[0].url).toMatch(/cart/);

  // Assert cart deleted
  expect(wrapper.vm.tempCart).toBe(null);
});
