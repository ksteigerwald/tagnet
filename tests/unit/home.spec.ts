import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Home, {
      propsData: {  },
    });
    expect(wrapper.text()).toMatch('foo');
  });
});
