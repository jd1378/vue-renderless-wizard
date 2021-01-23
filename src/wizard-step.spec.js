import { mount } from '@vue/test-utils';
import WizardStep from './wizard-step.vue';

describe('wizard-step', () => {
  describe('wizard manager registeration', () => {
    let wrapper;
    let registerStep;
    let unregisterStep;

    beforeEach(() => {
      registerStep = jest.fn();
      unregisterStep = jest.fn();
      wrapper = mount(WizardStep, {
        provide: {
          wizardManager: {
            registerStep,
            unregisterStep,
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

    it('calls unregisterStep of wizardManager when destroyed', () => {
      expect(unregisterStep).toBeCalledTimes(0);
      wrapper.destroy();
      expect(unregisterStep).toBeCalledTimes(1);
    });
  });

  describe('render', () => {
    it('renders fine in absence of wizard manager', () => {
      const transitionStub = () => ({
        render: function () {
          return this.$options._renderChildren;
        },
      });
      const wrapper = mount(WizardStep, {
        slots: {
          default: '<div>step 0</div>',
        },
        stubs: {
          transition: transitionStub(),
        },
      });
      expect(wrapper.html()).toBe('<div>step 0</div>');
      let errored = false;
      try {
        wrapper.destroy();
      } catch (err) {
        errored = true;
      }
      expect(errored).toBe(false);
    });

    it('renders if lazy and active', () => {
      const transitionStub = () => ({
        render: function () {
          return this.$options._renderChildren;
        },
      });
      const wrapper = mount(WizardStep, {
        propsData: {
          lazy: true,
          active: true,
        },
        slots: {
          default: '<div>step 0</div>',
        },
        stubs: {
          transition: transitionStub(),
        },
      });
      expect(wrapper.html()).toBe('<div>step 0</div>');
    });

    it("doesn't render if lazy and not active", () => {
      const transitionStub = () => ({
        render: function () {
          return this.$options._renderChildren;
        },
      });
      const wrapper = mount(WizardStep, {
        propsData: {
          lazy: true,
          active: false,
        },
        slots: {
          default: '<div>step 0</div>',
        },
        stubs: {
          transition: transitionStub(),
        },
      });
      expect(wrapper.html()).toBe('');
    });
  });

  describe('scoped slot', () => {
    let scopeProps;

    function renderDefault(props) {
      scopeProps = props;
      return this.$createElement('div', 'step 0');
    }

    beforeEach(() => {
      scopeProps = {};
      mount(WizardStep, {
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
        propsData: {
          active: true,
        },
        scopedSlots: {
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
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().active).toBeTruthy();
      expect(wrapper.emitted().active.length).toBe(1);
    });
  });

  describe('props', () => {
    describe('transition', () => {
      it("will be called with 'backwarding' and 'localActive' if it's a function", () => {
        const getTransition = jest.fn();
        mount(WizardStep, {
          provide: {
            wizardManager: {
              backwarding: true,
            },
          },
          propsData: {
            transition: getTransition,
          },
          data() {
            return {
              localActive: true,
            };
          },
          slots: {
            default: '<div>step 0</div>',
          },
        });
        expect(getTransition).toBeCalled();
        // backwarding and localActive
        expect(getTransition).toBeCalledWith(true, true);
      });

      it('spreads "transition" prop to data object of transition component', () => {
        const propCall = jest.fn();
        const transitionStub = () => ({
          props: ['name'],
          render: function () {
            propCall(this.$props);
            return this.$options._renderChildren;
          },
        });
        mount(WizardStep, {
          propsData: {
            transition: {
              props: {
                name: 'test-name',
              },
            },
          },
          slots: {
            default: '<div>step 0</div>',
          },
          stubs: {
            transition: transitionStub(),
          },
        });
        expect(propCall).toBeCalledWith({
          name: 'test-name',
        });
      });
    });
  });
});
