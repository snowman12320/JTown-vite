import { describe, it, expect, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import productStore from '@/stores/productStore';
import axios from 'axios';

// Mock axios get request
// Corrected mock for axios
vi.mock('axios', async () => {
  const actual = await vi.importActual('axios'); // Import the actual axios module
  return {
    ...actual, // Spread the actual module's exports
    default: {
      // Provide a default export
      ...actual.default, // Include actual default exports
      get: vi.fn(() =>
        Promise.resolve({ data: { success: true, product: { id: 1, name: 'Test Product' } } })
      )
    }
  };
});

describe.skip('productStore', () => {
  // Set up a testing Pinia store before each test
  beforeEach(() => {
    setActivePinia(createTestingPinia());
  });

  it('getProductItem should fetch product data correctly', async () => {
    const store = productStore();
    await store.getProductItem(1); // Assuming the method accepts an ID
    expect(store.product_item).toEqual({ id: 1, name: 'Test Product' });
    expect(axios.get).toHaveBeenCalled();
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
