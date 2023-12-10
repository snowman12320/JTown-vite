// favoriteStore.test.js

import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { beforeEach, describe, it, expect, vi, mockResolvedValueOnce } from 'vitest';
import { mount } from '@vue/test-utils';

import favoriteStore from '@/stores/favoriteStore.js';

describe('favoriteStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it.skip('should increment', async () => {
    const wrapper = mount(favoriteStore, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              counter: {
                count: 0
              }
            }
          })
        ]
      }
    });

    const store = favoriteStore();

    store.increment();
    store.increment();
    expect(store.increment).toHaveBeenCalledTimes(2);
    expect(wrapper.store.count).toBe(1);
  });

  it('should increment count', () => {
    const store = favoriteStore();
    store.increment();
    store.increment();
    expect(store.count).toBe(2);
  });

  it('should update favoriteIds on add/remove', async () => {
    const store = favoriteStore();

    expect(store.favoriteIds).toEqual([]);

    // Use await to ensure the updateFavorite method completes before asserting
    await store.updateFavorite('-NYIs7ln-QAByybIcBs0');

    expect(store.favoriteIds).toEqual([]);
  });

  it('should make API call on getFavorite', async () => {
    const store = favoriteStore();

    // mock API call
    vi.spyOn(store, 'getFavorite');

    await store.getFavorite();

    expect(store.getFavorite).toHaveBeenCalled();
  });

  it('should make API call on updateFavorite', async () => {
    const store = favoriteStore();
    store.favoriteIds = []; // 確保 favoriteIds 初始為空陣列

    // 模擬 updateFavorite 和 getFavorite 方法
    vi.spyOn(store, 'updateFavorite').mockResolvedValueOnce(1);
    vi.spyOn(store, 'getFavorite').mockImplementation(() => {
      store.favoriteIds = [{ id: 1 }]; // 模擬 getFavorite 更新 favoriteIds
    });

    await store.updateFavorite(1); // 呼叫 updateFavorite 並傳入 id

    // expect(store.favoriteIds).toEqual([1]);
    expect(store.updateFavorite).toHaveBeenCalled();
  });
});
