import { mount } from '@vue/test-utils';
import WizardStep from '../src/wizard-step.vue';

const transitionStub = () => ({
  render: function () {
    return this.$options._renderChildren;
  },
});

describe('wizard-step', () => {
  const scopedDefault = {
    template: `<div>step 0</div>`,
  };

  describe('parent registeration', () => {
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
        stubs: {
          transition: transitionStub(),
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
        stubs: {
          transition: transitionStub(),
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
});
