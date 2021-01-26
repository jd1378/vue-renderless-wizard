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
        expect(wrapper.vm.$refs.manager.currentStep).toBe(2);
      });
    });
  });

  describe('<wizard-step> beforeDestory', () => {
    it('calls unregisterStep of <wizard-manager>', async () => {
      let wrapper;
      let shouldRemove = false;

      function renderDefault() {
        return this.$createElement('div', [
          this.$createElement(WizardStep, [
            this.$createElement('div', 'step1'),
          ]),
          this.$createElement(
            WizardStep,
            {
              props: {
                active: true,
              },
            },
            [this.$createElement('div', 'step2')]
          ),
          shouldRemove
            ? this.$createElement()
            : this.$createElement(WizardStep, [
                this.$createElement('div', 'step3'),
              ]),
        ]);
      }

      wrapper = mount(WizardManager, {
        scopedSlots: {
          default: renderDefault,
        },
      });
      const spy = jest.spyOn(wrapper.vm, 'unregisterStep');

      expect(wrapper.vm.steps).toBeTruthy();
      expect(wrapper.vm.steps.length).toBe(3);
      expect(spy).toHaveBeenCalledTimes(0);
      shouldRemove = true;
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.steps.length).toBe(2);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('before destory of wizard manager', () => {
    it('removes reference to steps', () => {
      let wrapper;

      function renderDefault() {
        return this.$createElement('div', [
          this.$createElement(WizardStep, [
            this.$createElement('div', 'step1'),
          ]),
          this.$createElement(
            WizardStep,
            {
              props: {
                active: true,
              },
            },
            [this.$createElement('div', 'step2')]
          ),
          this.$createElement(WizardStep, [
            this.$createElement('div', 'step3'),
          ]),
        ]);
      }

      let stepsDataInDestroy = undefined;

      wrapper = mount(
        {
          ...WizardManager,
          destroyed: function () {
            stepsDataInDestroy = this.steps;
          },
        },
        {
          scopedSlots: {
            default: renderDefault,
          },
        }
      );

      expect(wrapper.vm.steps).toBeTruthy();
      expect(wrapper.vm.steps.length).toBe(3);
      wrapper.destroy();
      expect(stepsDataInDestroy).toBeTruthy();
      expect(stepsDataInDestroy.length).toBe(0);
    });
  });

  describe('scope validating prop', () => {
    // enable fake times
    jest.useFakeTimers();
    let scopeProps = {};
    let wrapper;
    const timeAmountToAdvance = 300 * 1000; // ms

    function renderDefault(props) {
      scopeProps = props;
      return this.$createElement('div', [
        this.$createElement(WizardStep, [this.$createElement('div', 'step1')]),
        this.$createElement(
          WizardStep,
          {
            props: {
              active: true,
              validate: () => {
                return new Promise((resolve) => {
                  setTimeout(() => resolve(true), timeAmountToAdvance);
                });
              },
            },
          },
          [this.$createElement('div', 'step2')]
        ),
        this.$createElement(WizardStep, [this.$createElement('div', 'step3')]),
      ]);
    }

    wrapper = mount(WizardManager, {
      scopedSlots: {
        default: renderDefault,
      },
    });

    let resolved = false;

    it('becomes "true" during step validation', async () => {
      expect(wrapper.vm.currentStep).toBe(1);

      scopeProps.next().then(() => {
        resolved = true;
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.validating).toBe(true);
      expect(resolved).toBe(false);
      expect(wrapper.vm.currentStep).toBe(1);
    });

    it('blocks changing steps', async () => {
      await wrapper.vm.$nextTick();
      expect(resolved).toBe(false);
      expect(wrapper.vm.validating).toBe(true);
      scopeProps.prev();
      await wrapper.vm.$nextTick();
      // im not sure if two times are needed,
      // but since running a code inside nextTick in prev method, doing it anyway.
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.currentStep).toBe(1); // still on step 1
      scopeProps.next();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.currentStep).toBe(1); // still on step 1
    });

    it('becomes false after step validation finishes', async () => {
      jest.runAllTimers();
      await wrapper.vm.$nextTick();
      expect(resolved).toBe(true);
      expect(wrapper.vm.validating).toBe(false);
      expect(wrapper.vm.currentStep).toBe(2);
    });
  });

  describe('scope hasNext prop', () => {
    let scopeProps = {};
    let wrapper;
    let shouldRemove = false;

    function renderDefault(props) {
      scopeProps = props;
      return this.$createElement('div', [
        this.$createElement(
          WizardStep,
          {
            props: {
              active: true,
            },
          },
          [this.$createElement('div', 'step1')]
        ),
        this.$createElement(
          WizardStep,
          {
            props: {
              disabled: true,
            },
          },
          [this.$createElement('div', 'step2')]
        ),
        shouldRemove
          ? this.$createElement()
          : this.$createElement(WizardStep, [
              this.$createElement('div', 'step3'),
            ]),
      ]);
    }
    wrapper = mount(WizardManager, {
      scopedSlots: {
        default: renderDefault,
      },
    });

    it('returns true whether if theres a not-disabled step after this step', async () => {
      expect(shouldRemove).toBe(false);
      expect(scopeProps.stepsCount).toBe(2);
      expect(wrapper.vm.steps.length).toBe(3);
      expect(scopeProps.hasNext).toBe(true);
      shouldRemove = true;
      await wrapper.vm.$forceUpdate();
      expect(wrapper.vm.steps.length).toBe(2);
      expect(scopeProps.stepsCount).toBe(1);
      expect(scopeProps.hasNext).toBe(false);
    });

    afterAll(() => {
      wrapper.destroy();
    });
  });

  describe('scope hasPrev prop', () => {
    let scopeProps = {};
    let wrapper;
    let shouldRemove = false;

    function renderDefault(props) {
      scopeProps = props;
      return this.$createElement('div', [
        shouldRemove
          ? this.$createElement()
          : this.$createElement(WizardStep, [
              this.$createElement('div', 'step1'),
            ]),
        this.$createElement(
          WizardStep,
          {
            props: {
              disabled: true,
            },
          },
          [this.$createElement('div', 'step2')]
        ),
        this.$createElement(
          WizardStep,
          {
            props: {
              active: true,
            },
          },
          [this.$createElement('div', 'step3')]
        ),
      ]);
    }
    wrapper = mount(WizardManager, {
      scopedSlots: {
        default: renderDefault,
      },
    });

    it('returns whether if theres a not-disabled step after this step', async () => {
      expect(shouldRemove).toBe(false);
      expect(scopeProps.stepsCount).toBe(2);
      expect(wrapper.vm.steps.length).toBe(3);
      expect(scopeProps.hasPrev).toBe(true);
      shouldRemove = true;
      await wrapper.vm.$forceUpdate();
      expect(wrapper.vm.steps.length).toBe(2);
      expect(scopeProps.stepsCount).toBe(1);
      expect(wrapper.vm.currentStep).toBe(1);
      expect(scopeProps.hasPrev).toBe(false);
    });

    afterAll(() => {
      wrapper.destroy();
    });
  });

  describe('scope next() function', () => {
    it('runs step validate prop if its a function', async () => {
      let scopeProps = {};
      let wrapper;
      let ranValidate = false;

      function renderDefault(props) {
        scopeProps = props;
        return this.$createElement('div', [
          this.$createElement(
            WizardStep,
            {
              props: {
                active: true,
                validate: () => {
                  ranValidate = true;
                  return false;
                },
              },
            },
            [this.$createElement('div', 'step1')]
          ),
          this.$createElement(WizardStep, [
            this.$createElement('div', 'step2'),
          ]),
        ]);
      }

      wrapper = mount(WizardManager, {
        scopedSlots: {
          default: renderDefault,
        },
      });
      expect(wrapper.vm.currentStep).toBe(0);
      scopeProps.next();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.currentStep).toBe(0);
      expect(ranValidate).toBe(true);
    });

    it('awaits step validate if it returns a promise', async () => {
      // enable fake times
      jest.useFakeTimers();
      let scopeProps = {};
      let wrapper;
      const timeAmountToAdvance = 300 * 1000; // ms

      function renderDefault(props) {
        scopeProps = props;
        return this.$createElement('div', [
          this.$createElement(
            WizardStep,
            {
              props: {
                active: true,
                validate: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => resolve(true), timeAmountToAdvance);
                  });
                },
              },
            },
            [this.$createElement('div', 'step1')]
          ),
          this.$createElement(WizardStep, [
            this.$createElement('div', 'step2'),
          ]),
        ]);
      }

      wrapper = mount(WizardManager, {
        scopedSlots: {
          default: renderDefault,
        },
      });
      expect(wrapper.vm.currentStep).toBe(0);
      let resolved = false;
      scopeProps.next().then(() => {
        resolved = true;
      });
      await wrapper.vm.$nextTick();
      expect(resolved).toBe(false);
      jest.runAllTimers();
      await wrapper.vm.$nextTick();
      expect(resolved).toBe(true);
    });

    it('bypasses step validation if called with `true`', async () => {
      let scopeProps = {};
      let wrapper;
      let ranValidate = false;

      function renderDefault(props) {
        scopeProps = props;
        return this.$createElement('div', [
          this.$createElement(
            WizardStep,
            {
              props: {
                active: true,
                validate: () => {
                  ranValidate = true;
                  return false;
                },
              },
            },
            [this.$createElement('div', 'step1')]
          ),
          this.$createElement(WizardStep, [
            this.$createElement('div', 'step2'),
          ]),
        ]);
      }

      wrapper = mount(WizardManager, {
        scopedSlots: {
          default: renderDefault,
        },
      });
      expect(wrapper.vm.currentStep).toBe(0);
      scopeProps.next(true);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.currentStep).toBe(1);
      expect(ranValidate).toBe(false);
    });
    it('does not change step if validation of step fails', async () => {
      let scopeProps = {};
      let wrapper;

      function renderDefault(props) {
        scopeProps = props;
        return this.$createElement('div', [
          this.$createElement(
            WizardStep,
            { props: { active: true, validate: () => false } },
            [this.$createElement('div', 'step1')]
          ),
          this.$createElement(WizardStep, [
            this.$createElement('div', 'step2'),
          ]),
        ]);
      }

      wrapper = mount(WizardManager, {
        scopedSlots: {
          default: renderDefault,
        },
      });
      expect(wrapper.vm.currentStep).toBe(0);
      scopeProps.next();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.currentStep).toBe(0);
    });

    it('skips disabled steps', async () => {
      let scopeProps = {};
      let wrapper;

      function renderDefault(props) {
        scopeProps = props;
        return this.$createElement('div', [
          this.$createElement(
            WizardStep,
            {
              props: {
                active: true,
              },
            },
            [this.$createElement('div', 'step1')]
          ),
          this.$createElement(
            WizardStep,
            {
              props: {
                disabled: true,
              },
            },
            [
              this.$createElement(
                'div',

                'step2'
              ),
            ]
          ),
          this.$createElement(
            WizardStep,

            [
              this.$createElement(
                'div',

                'step3'
              ),
            ]
          ),
        ]);
      }

      wrapper = mount(WizardManager, {
        scopedSlots: {
          default: renderDefault,
        },
      });

      expect(wrapper.vm.stepsCount).toBe(3);
      expect(wrapper.vm.currentStep).toBe(0);
      scopeProps.next();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.currentStep).toBe(2);
    });
  });

  describe('scope prev() function', () => {
    let scopeProps = {};
    let wrapper;

    function renderDefault(props) {
      scopeProps = props;
      return this.$createElement('div', [
        this.$createElement(
          WizardStep,

          [this.$createElement('div', 'step1')]
        ),
        this.$createElement(
          WizardStep,
          {
            props: {
              disabled: true,
            },
          },
          [
            this.$createElement(
              'div',

              'step2'
            ),
          ]
        ),
        this.$createElement(
          WizardStep,
          {
            props: {
              active: true,
            },
          },
          [
            this.$createElement(
              'div',

              'step3'
            ),
          ]
        ),
      ]);
    }

    wrapper = mount(WizardManager, {
      scopedSlots: {
        default: renderDefault,
      },
    });

    it('changes backwarding to true and current step is changed to nearest not-disable step', () => {
      expect(wrapper.vm.currentStep).toBe(2);
      scopeProps.prev();
      expect(wrapper.vm.backwarding).toBe(true);
    });
    it('skips disabled steps', async () => {
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.currentStep).toBe(0);
    });

    afterAll(() => {
      wrapper.destroy();
    });
  });

  describe('wizard-manager events', () => {
    describe('activate-step', () => {
      it('is emitted when changing into new step and has correct structure', async () => {
        let emittedData = false;
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
            listeners: {
              'activate-step': (...args) => {
                emittedData = args;
              },
            },
          }
        );
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
        wrapper.vm.setValue(2);
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.$refs.manager.currentStep).toBe(2);
        expect(emittedData).toBeTruthy();
        expect(emittedData.length).toBe(3);
        // first event data is current step index;
        expect(emittedData[0]).toBe(2);
        // second event data is the new step index;
        expect(emittedData[1]).toBe(0);
        // third is a cancellable event object
        expect(emittedData[2].cancelable).toBeTruthy();
      });

      it('is emitted exactly before changing into new step and can be cancelled', async () => {
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
            listeners: {
              'activate-step': (ni, oi, e) => {
                e.preventDefault();
              },
            },
          }
        );
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
        wrapper.vm.setValue(2);
        await wrapper.vm.$nextTick();
        // step has not changed:
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
        // value is updated back to what it was
        expect(wrapper.vm.value).toBe(0);
      });
    });
    describe('finished', () => {
      it('is emitted when: (in last step && next call is successful)', async () => {
        let emittedData = false;
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
              <WizardManager ref="manager" :initialData="initialData" v-on="$listeners">
                <div>
                  <WizardStep ref="step1"><div>step1</div></WizardStep>
                  <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                  <WizardStep ref="step2" active><div>step2</div></WizardStep>
                </div>
              </WizardManager>
            `,
          },
          {
            data() {
              return {
                initialData: {
                  foo: 'bar',
                },
              };
            },
            stubs: {
              transition: transitionStub(),
            },
            listeners: {
              finished: (...args) => {
                emittedData = args;
              },
            },
          }
        );
        expect(wrapper.vm.$refs.manager.stepsCount).toBe(3); // has 3 steps (0 -> 2)
        expect(wrapper.vm.$refs.manager.currentStep).toBe(2); // and on last step
        expect(emittedData).toBeFalsy(); // no event yet ...
        await wrapper.vm.$refs.manager.next();
        await wrapper.vm.$nextTick();
        expect(emittedData).toBeTruthy();
      });
      it('contains the wizard data', async () => {
        let emittedData = false;
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
              <WizardManager ref="manager" :initialData="initialData" v-on="$listeners">
                <div>
                  <WizardStep ref="step1"><div>step1</div></WizardStep>
                  <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                  <WizardStep ref="step2" active><div>step2</div></WizardStep>
                </div>
              </WizardManager>
            `,
          },
          {
            data() {
              return {
                initialData: {
                  foo: 'bar',
                },
              };
            },
            stubs: {
              transition: transitionStub(),
            },
            listeners: {
              finished: (...args) => {
                emittedData = args;
              },
            },
          }
        );
        expect(wrapper.vm.$refs.manager.stepsCount).toBe(3); // has 3 steps (0 -> 2)
        expect(wrapper.vm.$refs.manager.currentStep).toBe(2); // and on last step
        expect(emittedData).toBeFalsy(); // no event yet ...
        await wrapper.vm.$refs.manager.next();
        await wrapper.vm.$nextTick();
        // wizard data check
        expect(emittedData).toBeTruthy();
        expect(emittedData.length).toBe(1);
        expect(emittedData[0]).toStrictEqual({
          foo: 'bar',
        });
      });

      it('is not emitted if step validation fails', async () => {
        let emittedData = false;
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
                <WizardManager ref="manager" v-on="$listeners" :initialData="initialData">
                  <div>
                    <WizardStep ref="step1"><div>step1</div></WizardStep>
                    <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                    <WizardStep ref="step2" active :validate="stepValidation"><div>step2</div></WizardStep>
                  </div>
                </WizardManager>
              `,
          },
          {
            data() {
              return {
                initialData: {
                  foo: 'bar',
                },
                stepValidation: () => {
                  return false;
                },
              };
            },
            stubs: {
              transition: transitionStub(),
            },
            listeners: {
              finished: (...args) => {
                emittedData = args;
              },
            },
          }
        );
        expect(wrapper.vm.$refs.manager.stepsCount).toBe(3); // has 3 steps (0 -> 2)
        expect(wrapper.vm.$refs.manager.currentStep).toBe(2); // and on last step
        expect(emittedData).toBeFalsy(); // no event yet ...
        await wrapper.vm.$refs.manager.next();
        await wrapper.vm.$nextTick();
        expect(emittedData).toBeFalsy(); // still not emitted
      });
    });
  });

  describe('wizard-step events', () => {
    describe('finished', () => {
      it('is emitted when: (next call is successfull)', async () => {
        let emittedData = false;
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
                <WizardManager ref="manager" :initialData="initialData">
                  <div>
                    <WizardStep ref="step1" active v-on="$listeners"><div>step1</div></WizardStep>
                    <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                    <WizardStep ref="step2"><div>step2</div></WizardStep>
                  </div>
                </WizardManager>
              `,
          },
          {
            data() {
              return {
                initialData: {
                  foo: 'bar',
                },
              };
            },
            stubs: {
              transition: transitionStub(),
            },
            listeners: {
              finished: (...args) => {
                emittedData = args;
              },
            },
          }
        );
        expect(wrapper.vm.$refs.manager.stepsCount).toBe(3); // has 3 steps (0 -> 2)
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0); // and on first step so not confused with manager 'finished'
        expect(emittedData).toBeFalsy(); // no event yet ...
        await wrapper.vm.$refs.manager.next();
        await wrapper.vm.$nextTick();
        expect(emittedData).toBeTruthy();
      });
      it('contains the wizard data', async () => {
        let emittedData = false;
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
                <WizardManager ref="manager" :initialData="initialData">
                  <div>
                    <WizardStep ref="step1" active v-on="$listeners"><div>step1</div></WizardStep>
                    <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                    <WizardStep ref="step2"><div>step2</div></WizardStep>
                  </div>
                </WizardManager>
              `,
          },
          {
            data() {
              return {
                initialData: {
                  foo: 'bar',
                },
              };
            },
            stubs: {
              transition: transitionStub(),
            },
            listeners: {
              finished: (...args) => {
                emittedData = args;
              },
            },
          }
        );
        expect(wrapper.vm.$refs.manager.stepsCount).toBe(3); // has 3 steps (0 -> 2)
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0); // and on first step so not confused with manager 'finished'
        expect(emittedData).toBeFalsy(); // no event yet ...
        await wrapper.vm.$refs.manager.next();
        await wrapper.vm.$nextTick();
        expect(emittedData.length).toBe(1);
        expect(emittedData[0]).toStrictEqual({
          foo: 'bar',
        });
      });

      it('is not emitted if step validation fails', async () => {
        let emittedData = false;
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
                <WizardManager ref="manager" :initialData="initialData">
                  <div>
                    <WizardStep ref="step1" active :validate="stepValidation" v-on="$listeners"><div>step1</div></WizardStep>
                    <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                    <WizardStep ref="step2"><div>step2</div></WizardStep>
                  </div>
                </WizardManager>
              `,
          },
          {
            data() {
              return {
                initialData: {
                  foo: 'bar',
                },
                stepValidation: () => {
                  return false;
                },
              };
            },
            stubs: {
              transition: transitionStub(),
            },
            listeners: {
              finished: (...args) => {
                emittedData = args;
              },
            },
          }
        );
        expect(wrapper.vm.$refs.manager.stepsCount).toBe(3); // has 3 steps (0 -> 2)
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0); // and on first step so not confused with manager 'finished'
        expect(emittedData).toBeFalsy(); // no event yet ...
        await wrapper.vm.$refs.manager.next();
        await wrapper.vm.$nextTick();
        expect(emittedData).toBeFalsy();
      });
    });
  });
});
