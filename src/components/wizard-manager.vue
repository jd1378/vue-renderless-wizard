<script lang="ts">
import { toInteger } from '../utils/number';
import { isFunction } from '../utils/inspect';
import { cloneDeep } from '../utils/clone-deep';
import { notDisabled } from '../utils/filters';
import { h, Comment, defineComponent } from 'vue';
import type WizardStep from './wizard-step.vue';
import { ActivateStepEvent } from '../events';

/**
 * Vue Renderless Wizard component helps you manage the steps of your wizard more easily.
 */
export default defineComponent({
  provide() {
    return {
      wizardManager: this,
    };
  },
  props: {
    /**
     * Starting step index (zero-based). is 0 by default
     */
    modelValue: {
      type: Number,
      default: 0,
      validator: (value) => typeof value === 'number' && value >= 0,
    },
    /**
     * Accessed by `<wizard-step>` component. If set, all the steps are rendered lazily.
     */
    lazy: {
      type: Boolean,
      default: false,
    },
    /**
     * The data that is used as initial data *and* **reset**
     */
    initialData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue', 'reset', 'finished', 'activate-step'],
  data() {
    return {
      currentStep: this.modelValue,
      // Array of `<wizard-step>` instances, in DOM order
      steps: [] as (typeof WizardStep)[],
      // Array of child instances registered (for triggering reactive updates)
      registeredSteps: [],
      wizardData: cloneDeep(this.initialData, {}),
      validating: false,
      backwarding: false,
    };
  },
  computed: {
    /**
     * Count of detected steps
     */
    stepsCount() {
      return this.steps.length;
    },
    /**
     * Count of available steps
     */
    availableSteps() {
      return this.steps.filter(notDisabled).length;
    },
    /**
     * Current step relative to available steps
     */
    availableStepProgress() {
      return (
        this.steps.slice(0, this.currentStep).reverse().filter(notDisabled)
          .length + 1
      );
    },
    nextStep() {
      return this.steps.slice(this.currentStep + 1).find(notDisabled);
    },
    prevStep() {
      return this.steps.slice(0, this.currentStep).reverse().find(notDisabled);
    },
    hasNext() {
      return !!this.nextStep;
    },
    hasPrev() {
      return !!this.prevStep;
    },
  },
  watch: {
    // for v-model
    modelValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        newValue = toInteger(newValue, 0);
        oldValue = toInteger(oldValue, 0);

        const $step = this.steps[newValue];
        if ($step && !$step.disabled) {
          this.activateStep($step);
        } else {
          // Try next or prev steps
          if (newValue < oldValue) {
            this.activateStep(this.prevStep);
          } else {
            this.activateStep(this.nextStep);
          }
        }
      }
    },
    currentStep(newValue) {
      let index = 0;

      // Ensure only one step is active at most
      this.steps.forEach(($step, i) => {
        if (i === newValue && !$step.disabled) {
          $step.localActive = true;
          index = i;
        } else {
          $step.localActive = false;
        }
      });

      // Update the v-model
      this.$emit('update:modelValue', index);
    },
    steps() {
      this.updateSteps();
    },
  },
  mounted() {
    this.updateSteps();
  },
  beforeDestroy() {
    // Ensure no references to child instances exist
    this.steps = [];
  },
  methods: {
    updateSteps() {
      // Find last active non-disabled step in current steps
      // We trust step state over `currentStep`, in case steps were added/removed/re-ordered
      let stepIndex = this.steps.indexOf(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.steps
          .slice()
          .reverse()
          .find(($step) => $step.localActive && !$step.disabled)
      );

      // Else try setting to `currentStep`
      if (stepIndex < 0) {
        if (
          this.steps[this.currentStep] &&
          !this.steps[this.currentStep].disabled
        ) {
          // Current step is not disabled
          stepIndex = this.currentStep;
        }
      }

      if (stepIndex < 0) {
        stepIndex = this.steps.indexOf(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.steps.find(notDisabled)
        );
      }

      // Ensure only one step is active at a time
      this.steps.forEach((step, index) => {
        step.localActive = index === stepIndex;
      });

      if (stepIndex !== -1) {
        this.currentStep = stepIndex;
      }
    },
    registerStep(step: typeof WizardStep) {
      if (!this.steps.includes(step)) {
        this.steps.push(step);
      }
    },
    unregisterStep(step: typeof WizardStep) {
      this.steps = this.steps.slice().filter((s) => s !== step);
    },
    async next(bypassValidation = false) {
      if (this.validating) return;
      const step = this.steps[this.currentStep];
      if (step) {
        this.validating = true;
        let canContinue = false;
        if (bypassValidation === true) {
          canContinue = true;
        } else if (isFunction(step.validate)) {
          canContinue = await step.validate(this.wizardData);
        } else if (step.validate === false) {
          canContinue = true;
        }

        if (canContinue) {
          this.backwarding = false;
          if (this.nextStep) {
            this.$nextTick(() => {
              const result = this.activateStep(this.nextStep);
              if (result) {
                /**
                 * Emitted when the current step has finished (on calling next).
                 * Emits after activate-step if it was not cancelled.
                 * Eemits before the <wizard-manager> `finished` event on the last step (there's no `activate-step` when on last step, because there's no next step).
                 * @event finished
                 * @property {object} data - contains the wizard data
                 */
                step.$emit('finished', this.wizardData);
              }
            });
          } else {
            step.$emit('finished', this.wizardData);
            /**
             * Emitted when **next()** function has been called, there's no next step remaining and validation for current step has passed.
             * @event finished
             * @property {object} data - contains the wizard data
             */
            this.$emit('finished', this.wizardData);
          }
        }
        this.validating = false;
      }
    },
    prev() {
      if (this.validating) return;
      this.backwarding = true;
      this.$nextTick(() => {
        this.activateStep(this.prevStep);
      });
    },
    setStep(index: number) {
      return this.activateStep(this.steps[index]);
    },
    activateStep(step?: typeof WizardStep) {
      let result = false;

      if (step) {
        const index = this.steps.indexOf(step);

        if (index !== this.currentStep && !step.disabled) {
          const stepEvent = new ActivateStepEvent(index, this.currentStep);

          /**
           * Emitted just before a step is shown/activated. Cancelable
           * @event activate-step
           * @property {number} newStepIndex - Step being activated (0-based index)
           * @property {number} prevStepIndex - Step that is currently active (0-based index). Will be -1 if no current active step
           * @property {Event} event - Event object. Call event.preventDefault() to cancel
           */
          this.$emit('activate-step', stepEvent);

          if (!stepEvent.defaultPrevented) {
            this.currentStep = index;
            result = true;
          }
        }
      }

      // Couldn't set step, so ensure v-model is up to date
      if (!result && this.modelValue !== this.currentStep) {
        /**
         * Emitted when a step is shown. Used to update the v-model.
         * @event update:modelValue
         * @property {number} stepIndex - Current selected step index (0-based index)
         */
        this.$emit('update:modelValue', this.currentStep);
      }

      return result;
    },
    reset() {
      this.setStep(this.modelValue);
      if (this.currentStep === this.modelValue) {
        this.wizardData = cloneDeep(this.initialData, {});
        /**
         * Triggered when reset is called and current step is changed to **value** prop successfully. Wizard data is reset to initial data as well.
         * @event reset
         * @type {Event}
         */
        this.$emit('reset');
      }
    },
  },
  /**
   * The default slot of wizard. You can structure your overall wizard look in here and put where the steps should be rendered.
   * There **Must** be `<wizard-step>` components inside.
   * @slot default
   * @binding {number} currentStep - Current step number. Starts from 1 and Excludes disabled steps count so you can use it as is in UI (numbers don't jump).
   * @binding {number} currentStepIndex - Current step index. starts from zero.
   * @binding {number} stepsCount - Total steps count. Excludes disabled steps count so you can use it as is in UI.
   * @binding {number} realStepsCount - Total steps count. Including disabled steps.
   * @binding {function(boolean: bypassValidation)} next - Proceed to next step
   * @binding {function} prev - Proceed to previous step
   * @binding {function(index: number)} setStep - Directly go to a step by index.
   * @binding {function} reset - Emits a `reset` event, restores `initial-data` prop and goes to first step
   * @binding {boolean} hasNext
   * @binding {boolean} hasPrev
   * @binding {boolean} validating - if a validation check is in progress
   * @binding {object} data - the wizard data that you can use as your data.
   * @binding {boolean} backwarding - you can think of it as which direction the wizard is moving.
   *  If true, It's a previous step,
   *  If false, It's a next step.
   *  You have to note though that it can be neither forwarding or backwarding (at the time of accessing this), but for simplicity it's one boolean.
   */
  render() {
    if (this.$slots.default) {
      return this.$slots.default({
        currentStep: this.availableStepProgress,
        currentStepIndex: this.currentStep,
        stepsCount: this.availableSteps,
        realStepsCount: this.stepsCount,
        next: this.next,
        prev: this.prev,
        setStep: this.setStep,
        reset: this.reset,
        hasNext: this.hasNext,
        hasPrev: this.hasPrev,
        data: this.wizardData,
        validating: this.validating,
        backwarding: this.backwarding,
      });
    } else {
      return h(Comment);
    }
  },
});
</script>
