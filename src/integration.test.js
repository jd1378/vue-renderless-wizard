import { mount } from '@vue/test-utils';
import WizardManager from './wizard-manager.vue';
import WizardStep from './wizard-step.vue';

const cleanupRegex = /(\s|\n|\r|<!---->)+/gi;

const transitionStub = () => ({
  render: function () {
    return this.$options._renderChildren;
  },
});

const exampleTwoStepWizard = {
  props: {
    lazy: {
      type: Boolean,
    },
  },
  components: {
    WizardManager,
    WizardStep,
  },
  methods: {
    setValue(val) {
      this.value = val;
    },
  },
  template: `
    <WizardManager ref="manager" :lazy="lazy">
      <div>
        <WizardStep ref="step1"><div>step1</div></WizardStep>
        <WizardStep ref="step2"><div>step2</div></WizardStep>
      </div>
    </WizardManager>
  `,
};

describe('integration of steps and wizard', () => {
  describe('render', () => {
    it('renders all steps inside wizard manager by default', () => {
      const wrapper = mount(
        // prevent mutation
        { ...exampleTwoStepWizard },
        {
          stubs: {
            transition: transitionStub(),
          },
        }
      );
      expect(wrapper.html().replace(cleanupRegex, '')).toBe(
        '<div><div>step1</div><div>step2</div></div>'
      );
    });

    describe('lazy', () => {
      it('renders first active step by default', () => {
        const editedExample = {
          ...exampleTwoStepWizard,
          template: `
            <WizardManager :lazy="lazy">
              <div>
                <WizardStep><div>step1</div></WizardStep>
                <WizardStep :active="true"><div>step2</div></WizardStep>
              </div>
            </WizardManager>
          `,
        };
        const wrapper = mount(editedExample, {
          propsData: {
            lazy: true,
          },
          stubs: {
            transition: transitionStub(),
          },
        });
        expect(wrapper.html().replace(cleanupRegex, '')).toBe(
          '<div><div>step2</div></div>'
        );
      });

      it('only shows last active step (by property) after mount', async () => {
        // extra means anything after first appearance of an active step
        const editedExample = {
          ...exampleTwoStepWizard,
          template: `
            <WizardManager :lazy="lazy">
              <div>
                <WizardStep :active="true"><div>step1</div></WizardStep>
                <WizardStep :active="true"><div>step2</div></WizardStep>
              </div>
            </WizardManager>
          `,
        };
        const wrapper = mount(editedExample, {
          propsData: {
            lazy: true,
          },
          stubs: {
            transition: transitionStub(),
          },
        });
        expect(wrapper.html().replace(cleanupRegex, '')).toBe(
          '<div><div>step1</div><div>step2</div></div>'
        );
        await wrapper.vm.$nextTick();
        expect(wrapper.html().replace(cleanupRegex, '')).toBe(
          '<div><div>step2</div></div>'
        );
      });

      it('makes first step active after mount and render it by default', async () => {
        const editedExample = {
          ...exampleTwoStepWizard,
          template: `
            <WizardManager :lazy="lazy">
              <div>
                <WizardStep><div>step1</div></WizardStep>
                <WizardStep><div>step2</div></WizardStep>
              </div>
            </WizardManager>
          `,
        };
        const wrapper = mount(editedExample, {
          propsData: {
            lazy: true,
          },
          stubs: {
            transition: transitionStub(),
          },
        });
        expect(wrapper.html().replace(cleanupRegex, '')).toBe('<div></div>');
        await wrapper.vm.$nextTick();
        expect(wrapper.html().replace(cleanupRegex, '')).toBe(
          '<div><div>step1</div></div>'
        );
        await wrapper.vm.$nextTick(); // it's persistant
        expect(wrapper.html().replace(cleanupRegex, '')).toBe(
          '<div><div>step1</div></div>'
        );
      });
    });
  });
  describe('step registeration', () => {
    it('keeps reference of <WizardStep> components inside', () => {
      let wrapper = mount(
        // prevent mutation
        { ...exampleTwoStepWizard },
        {
          stubs: {
            transition: transitionStub(),
          },
        }
      );
      expect(wrapper.vm.$refs.manager.stepsCount).toBe(2);
      // test with a disabled step
      wrapper = mount(
        // prevent mutation
        {
          ...exampleTwoStepWizard,
          template: `
            <WizardManager ref="manager">
              <div>
                <WizardStep ref="step1"><div>step1</div></WizardStep>
                <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                <WizardStep ref="step2"><div>step2</div></WizardStep>
              </div>
            </WizardManager>
          `,
        },
        {
          stubs: {
            transition: transitionStub(),
          },
        }
      );
      expect(wrapper.vm.$refs.manager.stepsCount).toBe(3);
    });
  });
  describe('wizard manager v-model and value prop', () => {
    it('controls `currentStep` index of wizard', async () => {
      const wrapper = mount(
        // prevent mutation
        {
          ...exampleTwoStepWizard,
          template: `
            <WizardManager v-model="value" ref="manager" v-on="$listeners" >
              <div>
                <WizardStep ref="step1"><div>step1</div></WizardStep>
                <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                <WizardStep ref="step2"><div>step2</div></WizardStep>
              </div>
            </WizardManager>
          `,
        },
        {
          data() {
            return {
              value: 0,
            };
          },
          stubs: {
            transition: transitionStub(),
          },
        }
      );
      expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
      wrapper.vm.setValue(2);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$refs.manager.currentStep).toBe(2);
    });
    it('sets initial step of wizard (and after mount for render) correctly', async () => {
      const wrapper = mount(
        {
          ...exampleTwoStepWizard,
          template: `
            <WizardManager v-model="value" ref="manager" v-on="$listeners" lazy>
              <div>
                <WizardStep ref="step1"><div>step1</div></WizardStep>
                <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                <WizardStep ref="step2"><div>step2</div></WizardStep>
              </div>
            </WizardManager>
          `,
        },
        {
          data() {
            return {
              value: 2,
            };
          },
          stubs: {
            transition: transitionStub(),
          },
        }
      );
      expect(wrapper.vm.$refs.manager.currentStep).toBe(2);
      await wrapper.vm.$nextTick();
      expect(wrapper.html().replace(cleanupRegex, '')).toBe(
        '<div><div>step2</div></div>'
      );
    });
    describe('activating a disabled step with v-model', () => {
      it("won't activate disabled step", async () => {
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
              <WizardManager v-model="value" ref="manager" v-on="$listeners">
                <div>
                  <WizardStep ref="step1"><div>step1</div></WizardStep>
                  <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                  <WizardStep ref="step2"><div>step2</div></WizardStep>
                </div>
              </WizardManager>
            `,
          },
          {
            data() {
              return {
                value: 0,
              };
            },
            stubs: {
              transition: transitionStub(),
            },
          }
        );
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
        wrapper.vm.setValue(1);
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.$refs.manager.currentStep).not.toBe(1);
      });

      it('activates previous step instead if new value is less than current value', async () => {
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
              <WizardManager v-model="value" ref="manager" v-on="$listeners" :lazy="lazy">
                <div>
                  <WizardStep ref="step1"><div>step1</div></WizardStep>
                  <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                  <WizardStep ref="step2"><div>step2</div></WizardStep>
                </div>
              </WizardManager>
            `,
          },
          {
            data() {
              return {
                value: 2,
              };
            },
            stubs: {
              transition: transitionStub(),
            },
          }
        );
        expect(wrapper.vm.$refs.manager.currentStep).toBe(2);
        wrapper.vm.setValue(1);
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
      });

      it('activates next step instead if new value is more than current value', async () => {
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
              <WizardManager v-model="value" ref="manager" v-on="$listeners" :lazy="lazy">
                <div>
                  <WizardStep ref="step1"><div>step1</div></WizardStep>
                  <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                  <WizardStep ref="step2"><div>step2</div></WizardStep>
                </div>
              </WizardManager>
            `,
          },
          {
            data() {
              return {
                value: 0,
              };
            },
            stubs: {
              transition: transitionStub(),
            },
          }
        );
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
        wrapper.vm.setValue(1);
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.$refs.manager.currentStep).toBe(2);
      });
    });
  });
});
