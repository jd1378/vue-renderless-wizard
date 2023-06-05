import { mount } from '@vue/test-utils';
import WizardManager from '../src/components/wizard-manager.vue';
import { describe, it, expect, beforeEach } from 'vitest';
import { h, Comment, reactive } from 'vue';

function renderEmpty() {
  return h(Comment);
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
        reactiveData: {
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

    describe('reactiveData', () => {
      let scopeProps;
      function renderDefault(props) {
        scopeProps = props || {};
        return h('div', 'manager');
      }

      beforeEach(() => {
        mount(WizardManager, {
          propsData: {
            reactiveData: reactive({
              a: 'b',
              c: 'd',
            }),
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
