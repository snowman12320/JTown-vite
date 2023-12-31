import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import App from '@/App.vue';
import ErrorView from '@/views/ErrorView.vue'; 

describe('ErrorView', () => {
  it('renders a component via routing', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/ErrorView',
          name: 'ErrorView',
          component: ErrorView 
        }
      ]
    });

    router.push('/ErrorView');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    });

    expect(wrapper.findComponent(ErrorView).exists()).toBe(true);
  });
});
