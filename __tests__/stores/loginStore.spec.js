// loginStore.spec.js
import { expect, it, describe, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import loginStore from '@/stores/loginStore';

describe('loginStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('sets isLoading to true when checking login status', async () => {
    const store = loginStore();

    await store.checkLoginStatus();

    expect(store.isLoading).toBe(true);
  });
});
