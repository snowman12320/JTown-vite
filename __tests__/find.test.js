/**
 * @vitest-environment jsdom
 */

// globals: true,
import { test, describe, expect } from 'vitest';
import { mount } from '@vue/test-utils';
// import { createVitest } from '@vitest/vitest';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

import FullFooter from '@/components/FullFooter.vue';
import ProductsItem from '@/views/frontend/ProductsItem.vue';
// import { render } from 'vue';

describe('', () => {
  test('findComponent / toggles the isHover', async () => {

    // render(FullFooter);

    const wrapper = mount(FullFooter);
    wrapper.findComponent(FullFooter);
    expect(wrapper.text()).toContain('2023');
    // console.log(wrapper.html())

    expect(wrapper.vm.isHover).toBe(false);
    await wrapper.vm.updateHover();
    expect(wrapper.vm.isHover).toBe(true);
    await wrapper.vm.updateHover();
    expect(wrapper.vm.isHover).toBe(false);
  });

  //jsdom
  //cloud.tencent.com/developer/article/2116202`
  test('findComponent', async () => {
    expect(ProductsItem).toBeDefined();

    // const wrapper = mount(ProductsItem);
    // expect(wrapper.find('#plus').exists()).toBe(true);
    // await wrapper.find('#plus').trigger('click');
    // expect(wrapper.find('span').text()).toBe('Count: 1');
  });

  // test('StoryList', () => {
  // const wrapper = mount(StoryList);
  //   expect(getStory).toHaveBeenCalledTimes(1);
  // });
});

// createVitest().run();
