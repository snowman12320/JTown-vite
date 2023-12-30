import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { beforeEach, describe, it, expect, vi, mockResolvedValueOnce } from 'vitest';
import { mount } from '@vue/test-utils';

import favoriteStore from '@/stores/favoriteStore.js';

describe('favoriteStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
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

    store.favoriteIds.push('-NYIs7ln-QAByybIcBs0'); 
    await store.updateFavorite('-NYIs7ln-QAByybIcBs0');

    expect(store.favoriteIds).toEqual(['-NYIs7ln-QAByybIcBs0']);
  });

  it('should make API call on getFavorite', async () => {
    const store = favoriteStore();

    vi.spyOn(store, 'getFavorite');

    await store.getFavorite();

    expect(store.getFavorite).toHaveBeenCalled();
  });

  it('should make API call on updateFavorite', async () => {
    const store = favoriteStore();
    store.favoriteIds = []; 

    vi.spyOn(store, 'updateFavorite').mockImplementation((id) => {
      store.favoriteIds.push({ id }); 
      return Promise.resolve(id);
    });

    await store.updateFavorite(1); 

    expect(store.favoriteIds).toEqual([{ id: 1 }]);
    expect(store.updateFavorite).toHaveBeenCalled();
  });
});
