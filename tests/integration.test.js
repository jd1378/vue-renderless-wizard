/* eslint-disable prefer-const */
import { mount } from '@vue/test-utils';
import WizardManager from '@/components/wizard-manager.vue';
import WizardStep from '@/components/wizard-step.vue';
import { describe, it, expect, vi, afterAll, beforeAll } from 'vitest';
import { h, nextTick } from 'vue';

const cleanupRegex =
  /(\s|\n|\r|<!---->)+|<transition-stub appear="false" persisted="false" css="true">|<\/transition-stub>/gi;

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
  data() {
    return {
      currentValue: 0,
    };
  },
  methods: {
    setValue(val) {
      this.currentValue = val;
    },
  },
  template: `
    <WizardManager ref="manager" :lazy="lazy" v-model="currentValue">
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
        {}
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
        });
        expect(wrapper.html().replace(cleanupRegex, '')).toBe(
          '<div><div>step1</div><div>step2</div></div>'
        );
        await nextTick();
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
        });
        expect(wrapper.html().replace(cleanupRegex, '')).toBe('<div></div>');
        await nextTick();
        expect(wrapper.html().replace(cleanupRegex, '')).toBe(
          '<div><div>step1</div></div>'
        );
        await nextTick(); // it's persistant
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
        {}
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
        {}
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
            <WizardManager v-model="currentValue" ref="manager" v-on="$attrs" >
              <div>
                <WizardStep ref="step1"><div>step1</div></WizardStep>
                <WizardStep ref="stepdis" :disabled="true"><div>disabledstep</div></WizardStep>
                <WizardStep ref="step2"><div>step2</div></WizardStep>
              </div>
            </WizardManager>
          `,
        }
      );
      expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
      wrapper.vm.setValue(2);
      await nextTick();
      expect(wrapper.vm.$refs.manager.currentStep).toBe(2);
    });
    it('sets initial step of wizard (and after mount for render) correctly', async () => {
      const wrapper = mount(
        {
          ...exampleTwoStepWizard,
          template: `
            <WizardManager v-model="currentValue" ref="manager" v-on="$attrs" lazy>
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
              currentValue: 2,
            };
          },
        }
      );
      expect(wrapper.vm.$refs.manager.currentStep).toBe(2);
      await nextTick();
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
              <WizardManager v-model="currentValue" ref="manager" v-on="$attrs">
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
                currentValue: 0,
              };
            },
          }
        );
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
        wrapper.vm.setValue(1);
        await nextTick();
        expect(wrapper.vm.$refs.manager.currentStep).not.toBe(1);
      });

      it('activates previous step instead if new value is less than current value', async () => {
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
              <WizardManager v-model="currentValue" ref="manager" v-on="$attrs" >
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
                currentValue: 2,
              };
            },
          }
        );
        expect(wrapper.vm.$refs.manager.currentStep).toBe(2);
        wrapper.vm.setValue(1);
        await nextTick();
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
      });

      it('activates next step instead if new value is more than current value', async () => {
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
              <WizardManager v-model="currentValue" ref="manager" v-on="$attrs">
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
                currentValue: 0,
              };
            },
          }
        );
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
        wrapper.vm.setValue(1);
        await nextTick();
        expect(wrapper.vm.$refs.manager.currentStep).toBe(2);
      });
    });
  });

  describe('<wizard-step> beforeDestory', () => {
    it('calls unregisterStep of <wizard-manager>', async () => {
      let wrapper;
      let shouldRemove = false;

      function renderDefault() {
        return h('div', [
          h(WizardStep, [h('div', 'step1')]),
          h(
            WizardStep,
            {
              active: true,
            },
            [h('div', 'step2')]
          ),
          shouldRemove ? h() : h(WizardStep, [h('div', 'step3')]),
        ]);
      }

      wrapper = mount(WizardManager, {
        slots: {
          default: renderDefault,
        },
      });
      const spy = vi.spyOn(wrapper.vm, 'unregisterStep');

      expect(wrapper.vm.steps).toBeTruthy();
      expect(wrapper.vm.steps.length).toBe(3);
      expect(spy).toHaveBeenCalledTimes(0);
      shouldRemove = true;
      await nextTick();
      expect(wrapper.vm.steps.length).toBe(2);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('before destory of wizard manager', () => {
    it('removes reference to steps', () => {
      let wrapper;

      function renderDefault() {
        return h('div', [
          h(WizardStep, [h('div', 'step1')]),
          h(
            WizardStep,
            {
              active: true,
            },
            [h('div', 'step2')]
          ),
          h(WizardStep, [h('div', 'step3')]),
        ]);
      }

      let stepsDataInDestroy = undefined;

      wrapper = mount(
        {
          ...WizardManager,
          unmounted: function () {
            stepsDataInDestroy = this.steps;
          },
        },
        {
          slots: {
            default: renderDefault,
          },
        }
      );

      expect(wrapper.vm.steps).toBeTruthy();
      expect(wrapper.vm.steps.length).toBe(3);
      wrapper.unmount();
      expect(stepsDataInDestroy).toBeTruthy();
      expect(stepsDataInDestroy.length).toBe(0);
    });
  });

  describe('scope validating prop', () => {
    // enable fake times
    beforeAll(() => {
      vi.useFakeTimers();
    });
    afterAll(() => {
      vi.useRealTimers();
    });
    let scopeProps = {};
    let wrapper;
    const timeAmountToAdvance = 300 * 1000; // ms

    function renderDefault(props) {
      scopeProps = props || {};
      return h('div', [
        h(WizardStep, [h('div', 'step1')]),
        h(
          WizardStep,
          {
            active: true,
            validate: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(true);
                }, timeAmountToAdvance);
              });
            },
          },
          [h('div', 'step2')]
        ),
        h(WizardStep, [h('div', 'step3')]),
      ]);
    }

    wrapper = mount(WizardManager, {
      slots: {
        default: renderDefault,
      },
    });

    let resolved = false;

    it('becomes "true" during step validation', async () => {
      expect(wrapper.vm.currentStep).toBe(1);

      scopeProps.next().then(() => {
        resolved = true;
      });
      await nextTick();
      expect(scopeProps.validating).toBe(true);
      expect(resolved).toBe(false);
      expect(wrapper.vm.currentStep).toBe(1);
    });

    it('blocks changing steps', async () => {
      await nextTick();
      expect(resolved).toBe(false);
      expect(wrapper.vm.validating).toBe(true);
      scopeProps.prev();
      await nextTick();
      // im not sure if two times are needed,
      // but since running a code inside nextTick in prev method, doing it anyway.
      await nextTick();
      expect(wrapper.vm.currentStep).toBe(1); // still on step 1
      scopeProps.next();
      await nextTick();
      expect(wrapper.vm.currentStep).toBe(1); // still on step 1
    });

    it('becomes false after step validation finishes', async () => {
      vi.runAllTimers();
      await nextTick();
      await nextTick();
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
      scopeProps = props || {};
      return h('div', [
        h(
          WizardStep,
          {
            active: true,
          },
          [h('div', 'step1')]
        ),
        h(
          WizardStep,
          {
            disabled: true,
          },
          [h('div', 'step2')]
        ),
        shouldRemove ? h() : h(WizardStep, [h('div', 'step3')]),
      ]);
    }
    wrapper = mount(WizardManager, {
      slots: {
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
      wrapper.unmount();
    });
  });

  describe('scope hasPrev prop', () => {
    let scopeProps = {};
    let wrapper;
    let shouldRemove = false;

    function renderDefault(props) {
      scopeProps = props || {};
      return h('div', [
        shouldRemove ? h() : h(WizardStep, [h('div', 'step1')]),
        h(
          WizardStep,
          {
            disabled: true,
          },
          [h('div', 'step2')]
        ),
        h(
          WizardStep,
          {
            active: true,
          },
          [h('div', 'step3')]
        ),
      ]);
    }
    wrapper = mount(WizardManager, {
      slots: {
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
      wrapper.unmount();
    });
  });

  describe('scope next() function', () => {
    it('runs step validate prop if its a function', async () => {
      let scopeProps = {};
      let wrapper;
      let ranValidate = false;

      function renderDefault(props) {
        scopeProps = props || {};
        return h('div', [
          h(
            WizardStep,
            {
              active: true,
              validate: () => {
                ranValidate = true;
                return false;
              },
            },
            [h('div', 'step1')]
          ),
          h(WizardStep, [h('div', 'step2')]),
        ]);
      }

      wrapper = mount(WizardManager, {
        slots: {
          default: renderDefault,
        },
      });
      expect(wrapper.vm.currentStep).toBe(0);
      scopeProps.next();
      await nextTick();
      expect(wrapper.vm.currentStep).toBe(0);
      expect(ranValidate).toBe(true);
    });

    it('awaits step validate if it returns a promise', async () => {
      // enable fake times
      vi.useFakeTimers();
      let scopeProps = {};
      let wrapper;
      const timeAmountToAdvance = 300 * 1000; // ms

      function renderDefault(props) {
        scopeProps = props || {};
        return h('div', [
          h(
            WizardStep,
            {
              active: true,
              validate: () => {
                return new Promise((resolve) => {
                  setTimeout(() => resolve(true), timeAmountToAdvance);
                });
              },
            },
            [h('div', 'step1')]
          ),
          h(WizardStep, [h('div', 'step2')]),
        ]);
      }

      wrapper = mount(WizardManager, {
        slots: {
          default: renderDefault,
        },
      });
      expect(wrapper.vm.currentStep).toBe(0);
      let resolved = false;
      scopeProps.next().then(() => {
        resolved = true;
      });
      await nextTick();
      await nextTick();
      expect(resolved).toBe(false);
      vi.runAllTimers();
      await nextTick();
      await nextTick();
      expect(resolved).toBe(true);
    });

    it('bypasses step validation if called with `true`', async () => {
      let scopeProps = {};
      let wrapper;
      let ranValidate = false;

      function renderDefault(props) {
        scopeProps = props || {};
        return h('div', [
          h(
            WizardStep,
            {
              active: true,
              validate: () => {
                ranValidate = true;
                return false;
              },
            },
            [h('div', 'step1')]
          ),
          h(WizardStep, [h('div', 'step2')]),
        ]);
      }

      wrapper = mount(WizardManager, {
        slots: {
          default: renderDefault,
        },
      });
      expect(wrapper.vm.currentStep).toBe(0);
      scopeProps.next(true);
      await nextTick();
      expect(wrapper.vm.currentStep).toBe(1);
      expect(ranValidate).toBe(false);
    });
    it('does not change step if validation of step fails', async () => {
      let scopeProps = {};
      let wrapper;

      function renderDefault(props) {
        scopeProps = props || {};
        return h('div', [
          h(WizardStep, { active: true, validate: () => false }, [
            h('div', 'step1'),
          ]),
          h(WizardStep, [h('div', 'step2')]),
        ]);
      }

      wrapper = mount(WizardManager, {
        slots: {
          default: renderDefault,
        },
      });
      expect(wrapper.vm.currentStep).toBe(0);
      scopeProps.next();
      await nextTick();
      expect(wrapper.vm.currentStep).toBe(0);
    });

    it('skips disabled steps', async () => {
      let scopeProps = {};
      let wrapper;

      function renderDefault(props) {
        scopeProps = props || {};
        return h('div', [
          h(
            WizardStep,
            {
              active: true,
            },
            [h('div', 'step1')]
          ),
          h(
            WizardStep,
            {
              disabled: true,
            },
            [
              h(
                'div',

                'step2'
              ),
            ]
          ),
          h(
            WizardStep,

            [
              h(
                'div',

                'step3'
              ),
            ]
          ),
        ]);
      }

      wrapper = mount(WizardManager, {
        slots: {
          default: renderDefault,
        },
      });

      expect(wrapper.vm.stepsCount).toBe(3);
      expect(wrapper.vm.currentStep).toBe(0);
      scopeProps.next();
      await nextTick();
      expect(wrapper.vm.currentStep).toBe(2);
    });
  });

  describe('scope prev() function', () => {
    let scopeProps = {};
    let wrapper;

    function renderDefault(props) {
      scopeProps = props || {};
      return h('div', [
        h(
          WizardStep,

          [h('div', 'step1')]
        ),
        h(
          WizardStep,
          {
            disabled: true,
          },
          [
            h(
              'div',

              'step2'
            ),
          ]
        ),
        h(
          WizardStep,
          {
            active: true,
          },
          [
            h(
              'div',

              'step3'
            ),
          ]
        ),
      ]);
    }

    wrapper = mount(WizardManager, {
      slots: {
        default: renderDefault,
      },
    });

    it('changes backwarding to true and current step is changed to nearest not-disable step', () => {
      expect(wrapper.vm.currentStep).toBe(2);
      scopeProps.prev();
      expect(wrapper.vm.backwarding).toBe(true);
    });
    it('skips disabled steps', async () => {
      await nextTick();
      expect(wrapper.vm.currentStep).toBe(0);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('wizard-manager events', () => {
    describe('activate-step', () => {
      it('is emitted when changing into new step and has correct structure', async () => {
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
              <WizardManager v-model="currentValue" ref="manager" v-on="$attrs" @activate-step="activateStepEvent = $event">
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
                currentValue: 0,
                activateStepEvent: undefined,
              };
            },
          }
        );
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
        expect(wrapper.vm.activateStepEvent).toBeFalsy();
        wrapper.vm.setValue(2);
        await nextTick();
        expect(wrapper.vm.$refs.manager.currentStep).toBe(2);
        expect(wrapper.vm.activateStepEvent).toBeTruthy();
        expect(wrapper.vm.activateStepEvent).toHaveProperty('newStepIndex');
        expect(wrapper.vm.activateStepEvent).toHaveProperty('prevStepIndex');
        // prevStepIndex is current step index;
        expect(wrapper.vm.activateStepEvent.prevStepIndex).toBe(0);
        // newStepIndex is the new step index;
        expect(wrapper.vm.activateStepEvent.newStepIndex).toBe(2);
        // this is a cancellable event object
        expect(wrapper.vm.activateStepEvent.cancelable).toBeTruthy();
      });

      it('is emitted exactly before changing into new step and can be cancelled', async () => {
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
              <WizardManager v-model="currentValue" ref="manager" v-on="$attrs" @activate-step.prevent>
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
                currentValue: 0,
              };
            },
          }
        );
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
        wrapper.vm.setValue(2);
        await nextTick();
        // step has not changed:
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0);
        // value is updated back to what it was
        expect(wrapper.vm.currentValue).toBe(0);
      });
    });
    describe('finished', () => {
      it('is emitted when: (in last step && next call is successful)', async () => {
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
              <WizardManager ref="manager" :initialData="initialData" v-on="$attrs" @finished="isFinished = true">
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
                isFinished: false,
              };
            },
          }
        );
        expect(wrapper.vm.$refs.manager.stepsCount).toBe(3); // has 3 steps (0 -> 2)
        expect(wrapper.vm.$refs.manager.currentStep).toBe(2); // and on last step
        expect(wrapper.vm.isFinished).toBeFalsy(); // no event yet ...
        await wrapper.vm.$refs.manager.next();
        await nextTick();
        expect(wrapper.vm.isFinished).toBeTruthy();
      });
      it('contains the wizard data', async () => {
        const finishMock = vi.fn();
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
              <WizardManager ref="manager" :initialData="initialData" @finished="finishMock">
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
                finishMock,
              };
            },
          }
        );
        expect(wrapper.vm.$refs.manager.stepsCount).toBe(3); // has 3 steps (0 -> 2)
        expect(wrapper.vm.$refs.manager.currentStep).toBe(2); // and on last step
        expect(finishMock).not.toBeCalled(); // no event yet ...
        await wrapper.vm.$refs.manager.next();
        await nextTick();
        // wizard data check
        expect(finishMock).toBeCalled();
        expect(finishMock).toBeCalledTimes(1);
        expect(finishMock).toBeCalledWith({
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
                <WizardManager ref="manager" v-on="$attrs" :initialData="initialData">
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
        await nextTick();
        expect(emittedData).toBeFalsy(); // still not emitted
      });
    });
  });

  describe('wizard-step events', () => {
    describe('finished', () => {
      it('is emitted when: (next call is successfull)', async () => {
        const stepFinishMock = vi.fn();
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
                <WizardManager ref="manager" :initialData="initialData">
                  <div>
                    <WizardStep ref="step1" active v-on="$attrs" @finished="stepFinishMock"><div>step1</div></WizardStep>
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
                finished: undefined,
                stepFinishMock,
              };
            },
          }
        );
        expect(wrapper.vm.$refs.manager.stepsCount).toBe(3); // has 3 steps (0 -> 2)
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0); // and on first step so not confused with manager 'finished'
        expect(stepFinishMock).not.toBeCalled();
        await wrapper.vm.$refs.manager.next();
        await nextTick();
        expect(stepFinishMock).toBeCalled();
      });
      it('contains the wizard data', async () => {
        const finishMock = vi.fn();
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
                <WizardManager ref="manager" :initialData="initialData" >
                  <div>
                    <WizardStep ref="step1" active v-on="$attrs" @finished="finishMock"><div>step1</div></WizardStep>
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
                finished: undefined,
                finishMock,
              };
            },
          }
        );
        expect(wrapper.vm.$refs.manager.stepsCount).toBe(3); // has 3 steps (0 -> 2)
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0); // and on first step so not confused with manager 'finished'
        expect(wrapper.vm.finishMock).not.toBeCalled();
        await wrapper.vm.$refs.manager.next();
        await nextTick();
        expect(wrapper.vm.finishMock).toBeCalled();
        expect(wrapper.vm.finishMock).toBeCalledTimes(1);
        expect(wrapper.vm.finishMock).toBeCalledWith({
          foo: 'bar',
        });
      });

      it('is not emitted if step validation fails', async () => {
        const wrapper = mount(
          // prevent mutation
          {
            ...exampleTwoStepWizard,
            template: `
                <WizardManager ref="manager" :initialData="initialData">
                  <div>
                    <WizardStep ref="step1" active :validate="stepValidation" v-on="$attrs"><div>step1</div></WizardStep>
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
          }
        );
        expect(wrapper.vm.$refs.manager.stepsCount).toBe(3); // has 3 steps (0 -> 2)
        expect(wrapper.vm.$refs.manager.currentStep).toBe(0); // and on first step so not confused with manager 'finished'
        expect(wrapper.emitted()).not.toHaveProperty('finished');
        await wrapper.vm.$refs.manager.next();
        await nextTick();
        expect(wrapper.emitted()).not.toHaveProperty('finished');
      });
    });
  });
});
