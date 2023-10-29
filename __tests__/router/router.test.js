/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import App from '@/App.vue';
import ErrorView from '@/views/ErrorView.vue'; // Corrected the import path for ErrorView

describe('ErrorView', () => {
  it('renders a component via routing', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/ErrorView',
          name: 'ErrorView',
          component: ErrorView // Corrected the component name to ErrorView
        }
      ]
    });

    // x router.push('/');
    router.push('/ErrorView');
    await router.isReady();

    // 綁定vue 最前面入口
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    });

    expect(wrapper.findComponent(ErrorView).exists()).toBe(true);
  });
});
