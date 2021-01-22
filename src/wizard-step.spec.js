import { mount } from '@vue/test-utils';
import WizardStep from './wizard-step.vue';

describe('wizard-step', () => {
  const scopedDefault = {
    template: `<div>step 0</div>`,
  };

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
          default: scopedDefault,
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

  describe('events', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(WizardStep, {
        slots: {
          default: scopedDefault,
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
            default: scopedDefault,
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
            default: scopedDefault,
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
