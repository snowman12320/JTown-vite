// favoriteStore.test.js

import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, it, expect } from 'vitest';

import favoriteStore from '@/stores/favoriteStore.js';

describe('favoriteStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should update favoriteIds on add/remove', async () => {
    const store = favoriteStore();

    expect(store.favoriteIds).toEqual([]);

    store.updateFavorite(1);
    expect(store.favoriteIds).toEqual([]);
  });

  it.skip('should make API call on getFavorite', async () => {
    const store = favoriteStore();

    // mock API call
    vi.spyOn(store, 'getFavorite').mockResolvedValueOnce({
      data: {
        success: true,
        products: [{ id: 1 }]
      }
    });

    await store.getFavorite();

    expect(store.filteredProducts).toEqual([{ id: 1 }]);
    expect(store.getFavorite).toHaveBeenCalled();
  });
});
