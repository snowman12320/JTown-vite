import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import productStore from '@/stores/productStore';
import axios from 'axios';

vi.mock('axios', async () => {
  const actual = await vi.importActual('axios'); 
  return {
    ...actual, 
    default: {
      ...actual.default,
      get: vi.fn(() =>
        Promise.resolve({ data: { success: true, product: { id: 1, name: 'Test Product' } } })
      )
    }
  };
});

describe.skip('productStore', () => {
  let axiosGetSpy;

  beforeEach(() => {
    setActivePinia(createTestingPinia());
    axiosGetSpy = vi.spyOn(axios, 'get');
  });

  afterEach(() => {
    axiosGetSpy.mockRestore();
  });

  it('getProductItem should fetch product data correctly', async () => {
    const store = productStore();
    await store.getProduct_item(1);
    expect(store.product_item).toEqual({ id: 1, name: 'Test Product' });
    expect(axiosGetSpy).toHaveBeenCalled();
  });

  it('getProductItem should handle errors correctly', async () => {
    const store = productStore();
    const error = new Error('Test error');
    axiosGetSpy.mockRejectedValue(error);
    await store.getProduct_item(1);
    expect(store.toast).toEqual({
      id: 1,
      res: 'warning',
      info: `Error fetching product:${error}`
    });
  });

  it('setCategory should set the category correctly', () => {
    const store = productStore();
    store.setCategory('Electronics');
    expect(store.cacheCategory).toBe('Electronics');
    expect(store.cacheSearch).toBe('');
    expect(store.filterCheck).toBe('');
  });

  it('setCacheSearch should set the search cache correctly', () => {
    const store = productStore();
    store.setCacheSearch('Laptop');
    expect(store.cacheSearch).toBe('laptop');
  });

  it('setFilterCheck should set the filter check correctly', () => {
    const store = productStore();
    store.setFilterCheck('Low');
    expect(store.filterCheck).toBe('Low');
  });
});