import { mount } from '@vue/test-utils';
import WizardManager from '../src/components/wizard-manager.vue';
import { describe, it, expect, beforeEach } from 'vitest';
import { h, nextTick } from 'vue';

function renderEmpty() {
  return h();
}

describe('wizard-manager', () => {
  describe('injection', () => {
    it('provides itself', () => {
      let injected;
      const childComponent = {
        inject: {
          wizardManager: {
            default: () => false,
          },
        },
        template: '<div>test</div>',
        mounted() {
          injected = this.wizardManager;
        },
      };

      const parentComponent = {
        components: {
          childComponent,
          WizardManager,
        },
        template: '<WizardManager><child-component/></WizardManager>',
      };

      const wrapper = mount(parentComponent);
      expect(wrapper.html()).toBe('<div>test</div>');
      expect(injected).toBeTruthy();
      expect(injected).toHaveProperty('currentStep');
    });
  });

  describe('render', () => {
    it('renders content', () => {
      const wrapper = mount(WizardManager, {
        slots: {
          default: '<div>manager</div>',
        },
      });
      expect(wrapper.html()).toBe('<div>manager</div>');
    });
  });

  describe('scoped slot', () => {
    let scopeProps = {};

    function renderDefault(props) {
      scopeProps = props || {};
      return h('div', 'manager');
    }

    const wrapper = mount(WizardManager, {
      slots: {
        default: renderDefault,
      },
      propsData: {
        initialData: {
          foo: 'bar',
        },
      },
    });

    it('has currentStep prop', () => {
      expect(scopeProps).toHaveProperty('currentStep');
    });
    it('has currentStepIndex prop', () => {
      expect(scopeProps).toHaveProperty('currentStepIndex');
    });
    it('has stepsCount prop', () => {
      expect(scopeProps).toHaveProperty('stepsCount');
    });
    it('has realStepsCount prop', () => {
      expect(scopeProps).toHaveProperty('realStepsCount');
    });
    it('has next function', () => {
      expect(scopeProps).toHaveProperty('next');
      expect(scopeProps.next).toBeInstanceOf(Function);
    });
    it('has prev function', () => {
      expect(scopeProps).toHaveProperty('prev');
      expect(scopeProps.prev).toBeInstanceOf(Function);
    });
    it('has setStep function', () => {
      expect(scopeProps).toHaveProperty('setStep');
      expect(scopeProps.setStep).toBeInstanceOf(Function);
    });
    it('has reset function', () => {
      expect(scopeProps).toHaveProperty('reset');
      expect(scopeProps.reset).toBeInstanceOf(Function);
    });
    it('has hasNext prop', () => {
      expect(scopeProps).toHaveProperty('hasNext');
    });
    it('has hasPrev prop', () => {
      expect(scopeProps).toHaveProperty('hasPrev');
    });
    it('has data prop', () => {
      expect(scopeProps).toHaveProperty('data');
    });
    it('has validating prop', () => {
      expect(scopeProps).toHaveProperty('validating');
    });
    it('has backwarding prop', () => {
      expect(scopeProps).toHaveProperty('backwarding');
    });

    describe('reset function', () => {
      it('emits reset event when successful', async () => {
        expect(wrapper.emitted().reset).toBeFalsy();
        scopeProps.reset();
        await nextTick();
        expect(wrapper.emitted().reset).toBeTruthy();
        expect(wrapper.emitted().reset.length).toBe(1);
      });

      it('resets to initial data when successful', async () => {
        scopeProps.data.foo = 'rab'; // change data throup scope props
        scopeProps.reset();
        await nextTick();
        expect(scopeProps.data).toStrictEqual({
          foo: 'bar',
        });
      });

      it('does not emit "reset" or set to initialData when failed', async () => {
        let scopeProps = {};

        function renderDefault(props) {
          scopeProps = props || {};
          return h('div', 'manager');
        }

        const wrapper = mount(WizardManager, {
          slots: {
            default: renderDefault,
          },
          propsData: {
            modelValue: 0,
            initialData: {
              foo: 'bar',
            },
          },
        });

        wrapper.vm.currentStep = 10;
        scopeProps.data.foo = 'rab';
        await nextTick();
        expect(wrapper.vm.currentStep).toBe(10);
        expect(wrapper.emitted().reset).toBeFalsy();
        scopeProps.reset(); // tries to set currentStep to 'value' prop but since the step doesn't exist, it fails.
        await nextTick();
        expect(wrapper.emitted().reset).toBeFalsy();
        // it has failed to reset
        expect(scopeProps.data).toStrictEqual({
          foo: 'rab',
        });
      });
    });
  });

  describe('events', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(WizardManager, {
        slots: {
          default: renderEmpty,
        },
      });
    });

    it('emits "reset" when reset is called', async () => {
      wrapper.vm.reset();
      await nextTick();
      expect(wrapper.emitted().reset).toBeTruthy();
      expect(wrapper.emitted().reset.length).toBe(1);
    });
  });

  describe('props', () => {
    describe('value', () => {
      it('is the default `currentStep` index of wizard', () => {
        const wrapper = mount(WizardManager, {
          propsData: {
            modelValue: 99,
          },
          slots: {
            default: renderEmpty,
          },
        });
        expect(wrapper.vm.currentStep).toBe(99);
      });
    });

    describe('initialData', () => {
      let scopeProps;
      function renderDefault(props) {
        scopeProps = props || {};
        return h('div', 'manager');
      }

      beforeEach(() => {
        mount(WizardManager, {
          propsData: {
            initialData: {
              a: 'b',
              c: 'd',
            },
          },
          slots: {
            default: renderDefault,
          },
        });
      });

      it('is provided as data in slot scope', () => {
        expect(scopeProps).toBeTruthy();
        expect(scopeProps.data).toStrictEqual({
          a: 'b',
          c: 'd',
        });
      });
    });
  });
});
