/**
 * @vitest-environment jsdom
 */
import { setActivePinia, createPinia } from 'pinia';
import { cartStore } from '../../src/stores/cartStore.js';
import { test, describe, expect, it, beforeEach } from 'vitest';

// import CartOffcanvas from '@/components/CartOffcanvas.vue';

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('increments', () => {
    const store = cartStore();
    expect(store.qty).toBe(1);
  });
  // qty.increment();
  // expect(qty.n).toBe(1);

  //   const item = {
  //     id: '-NZ6QDu_5n0xJe397hBe'
  //   };
  //   const cart = {
  //     product_id: '-NZ6QDu_5n0xJe397hBe',
  //     qty: 1
  //   };
  //   it('increments by amount', () => {
  //     const qty = cartStore();
  //  updateCart(item.id);
  //     expect(qty.n).toBe(1);
  //   });
});
