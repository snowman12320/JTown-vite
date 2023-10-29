import { test, describe, expect, beforeEach, vi, beforeAll, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createPinia, setActivePinia } from 'pinia'; // Import Pinia functions
import cartStore from '@/stores/cartStore.js';
// import sinon from 'sinon';
// import { mockFn } from 'vite-plugin-test';

beforeAll(() => {
  setActivePinia(createPinia());
});

describe('cartStore', () => {
  let store;
  const item = {
    id: 1,
    product_id: 123,
    qty: 2
  };
  let getCartSpy; // Declare the spy variable

  beforeEach(() => {
    store = cartStore();
    getCartSpy = vi.spyOn(store, 'getCart');
  });

  afterEach(() => {
    store.$reset();
  });

  test('store is defined', () => {
    expect(store).toBeDefined();
  });

  test('fetches cart data and calculates totals', async () => {
    const mockResponse = {
      data: {
        carts: [
          { total: 3000, qty: 2 },
          { total: 1500, qty: 1 }
        ]
      }
    };

    const mockAxios = new MockAdapter(axios); // Create a mock Axios instance
    mockAxios
      .onGet('https://vue3-course-api.hexschool.io/api/william-api/cart')
      .reply(200, mockResponse);

    // Call the getCart function
    await store.getCart();

    // Verify that isLoading is set to false
    expect(store.isLoading).toBe(false);

    // Verify that carts and totals are set correctly
    expect(store.carts).toEqual(mockResponse.data.carts); // Use store.carts instead of store.vm.carts
    expect(store.sumTotal).toBe(4500); // Corrected sumTotal calculation
    expect(store.sumFinalQty).toBe(3); // Corrected sumFinalQty calculation
  });

  // mockAxios.onPut('https://vue3-course-api.hexschool.io/api/william-api/cart').reply(200);
  test.skip('updateCart sets loadingItem and fetches cart data', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onPut(/\/api\/william-api\/cart\/\d+/).reply(200);
    // const mockAxios = new MockAdapter(axios);
    // mockAxios.onPut('https://vue3-course-api.hexschool.io/api/william-api/cart/1').reply(200);

    await store.updateCart(item);

    expect(store.statusBtn_car.loadingItem).toBe(item.id);

    expect(mockAxios.history.put.length).toBe(1);

    store.statusBtn_car.loadingItem = '';
  });

  test.skip('getCart function is called', async () => {
    expect(typeof store.getCart).toBe('function');

    // Trigger the code that calls store.getCart
    await store.getCart();
    // Verify that the getCart function is called
    expect(getCartSpy).toHaveBeenCalled();
  });
});
