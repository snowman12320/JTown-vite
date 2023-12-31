import { expect, it, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import loginStore from '@/stores/loginStore';
import axios from 'axios';
import sinon from 'sinon';// using vitest as your test runner, you can use sinon to stub the axios.post method. Here's how you can do i

describe('loginStore', () => {
  let axiosPostStub;

  beforeEach(() => {
    setActivePinia(createPinia());
    axiosPostStub = sinon.stub(axios, 'post');
  });

  afterEach(() => {
    axiosPostStub.restore();
  });

  it('sets isLoading to false after checking login status', async () => {
    const store = loginStore();
    axiosPostStub.resolves({ data: { success: true } });

    await store.checkLoginStatus();

    expect(store.isLoading).toBe(false);
  });

  it('sets isLogin correctly based on API response', async () => {
    const store = loginStore();
    axiosPostStub.resolves({ data: { success: true } });

    await store.checkLoginStatus();

    expect(store.isLogin).toBe(true);
  });

  it('updates toast correctly when an error occurs', async () => {
    const store = loginStore();
    const error = new Error('Test error');
    axiosPostStub.rejects(error);

    await store.checkLoginStatus();

    expect(store.toast.res).toBe('warning');
    expect(store.toast.info).toBe(`Error checking login status: ${error}`);
  });
});