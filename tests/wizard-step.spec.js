import { mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import WizardStep from '@/components/wizard-step.vue';
import { vi, describe, beforeEach, it, expect } from 'vitest';

describe('wizard-step', () => {
  describe('wizard manager registeration', () => {
    let wrapper;
    let registerStep;
    let unregisterStep;

    beforeEach(() => {
      registerStep = vi.fn();
      unregisterStep = vi.fn();
      wrapper = mount(WizardStep, {
        global: {
          provide: {
            wizardManager: {
              registerStep,
              unregisterStep,
            },
          },
        },
        slots: {
          default: '<div>step 0</div>',
        },
      });
    });

    it('calls registerStep of wizardManager when mounted', () => {
      expect(registerStep).toBeCalledTimes(1);
    });

    it('calls unregisterStep of wizardManager when unmounted', () => {
      expect(unregisterStep).toBeCalledTimes(0);
      wrapper.unmount();
      expect(unregisterStep).toBeCalledTimes(1);
    });
  });

  describe('render', () => {
    it('renders fine in absence of wizard manager', () => {
      const wrapper = mount(WizardStep, {
        slots: {
          default: '<div>step 0</div>',
        },
      });
      expect(wrapper.html()).toContain('<div>step 0</div>');
      let errored = false;
      try {
        wrapper.unmount();
      } catch (err) {
        errored = true;
      }
      expect(errored).toBe(false);
    });

    it('renders if lazy and active', () => {
      const wrapper = mount(WizardStep, {
        propsData: {
          lazy: true,
          active: true,
        },
        slots: {
          default: '<div>step 0</div>',
        },
      });
      expect(wrapper.html()).toContain('<div>step 0</div>');
    });

    it("doesn't render if lazy and not active", () => {
      const wrapper = mount(WizardStep, {
        propsData: {
          lazy: true,
          active: false,
        },
        slots: {
          default: '<div>step 0</div>',
        },
      });
      expect(wrapper.html()).toContain('');
    });
  });

  describe('scoped slot', () => {
    let scopeProps;

    function renderDefault(props) {
      scopeProps = props || {};
      return h('div', 'step 0');
    }

    beforeEach(() => {
      scopeProps = {};
      mount(WizardStep, {
        global: {
          provide: {
            wizardManager: {
              availableStepProgress: 0,
              currentStep: 0,
              availableSteps: 1,
              stepsCount: 1,
              next: () => Promise.resolve(false),
              prev: () => false,
              setStep: () => false,
              reset: () => undefined,
              hasNext: false,
              hasPrev: false,
              data: {},
              validating: false,
              backwarding: false,
            },
          },
        },
        propsData: {
          active: true,
        },
        slots: {
          default: renderDefault,
        },
      });
    });

    it('has active prop', () => {
      expect(scopeProps).toHaveProperty('active');
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

  describe('events', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(WizardStep, {
        slots: {
          default: '<div>step 0</div>',
        },
      });
    });

    it('emits "active" when activated', async () => {
      wrapper.vm.localActive = true;
      await nextTick();
      expect(wrapper.emitted().active).toBeTruthy();
      expect(wrapper.emitted().active.length).toBe(1);
    });
  });

  describe('props', () => {
    describe('transition', () => {
      it("will be called with 'backwarding' and 'localActive' if it's a function", async () => {
        const getTransition = vi.fn();
        mount(WizardStep, {
          global: {
            provide: {
              wizardManager: {
                backwarding: ref(true),
              },
            },
          },
          props: {
            transition: getTransition,
            active: true, // it sets localActive to true for first time
          },
          slots: {
            default: '<div>step 0</div>',
          },
        });
        expect(getTransition).toBeCalled();
        // backwarding and localActive
        expect(getTransition).toBeCalledWith(true, true);
      });
    });
  });
});
