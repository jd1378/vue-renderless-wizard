<script>
import { toInteger } from './utils/number';
import { isFunction } from './utils/inspect';
import { cloneDeep } from './utils/clone-deep';
import { notDisabled } from './utils/filters';

/**
 * Vue Renderless Wizard component (hopefully) helps you manage the steps of your wizard easily.
 * @requires ./wizard-step.vue
 */
export default {
  provide() {
    return {
      wizardManager: this,
    };
  },
  props: {
    /**
     * Starting step index (zero-based). is 0 by default
     */
    value: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0,
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
  data() {
    return {
      currentStep: this.value,
      // Array of `<wizard-step>` instances, in DOM order
      steps: [],
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
    value(newValue, oldValue) {
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
      this.$emit('input', index);
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
      const { steps } = this;
      // Find last active non-disabled step in current steps
      // We trust step state over `currentStep`, in case steps were added/removed/re-ordered
      let stepIndex = steps.indexOf(
        steps
          .slice()
          .reverse()
          .find(($step) => $step.localActive && !$step.disabled)
      );

      // Else try setting to `currentStep`
      if (stepIndex < 0) {
        const { currentStep } = this;

        if (steps[currentStep] && !steps[currentStep].disabled) {
          // Current step is not disabled
          stepIndex = currentStep;
        }
      }

      if (stepIndex < 0) {
        stepIndex = steps.indexOf(steps.find(notDisabled));
      }

      // Ensure only one step is active at a time
      steps.forEach((step, index) => {
        step.localActive = index === stepIndex;
      });

      if (stepIndex !== -1) {
        this.currentStep = stepIndex;
      }
    },
    registerStep(step) {
      if (!this.steps.includes(step)) {
        this.steps.push(step);
      }
    },
    unregisterStep(step) {
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
    setStep(index) {
      return this.activateStep(this.steps[index]);
    },
    activateStep(step) {
      const { currentStep, steps } = this;
      let result = false;

      if (step) {
        const index = steps.indexOf(step);

        if (index !== currentStep && !step.disabled) {
          const stepEvent = new Event('activate-step', {
            cancelable: true,
          });

          /**
           * Emitted just before a step is shown/activated. Cancelable
           * @event activate-step
           * @property {number} newStepIndex - Step being activated (0-based index)
           * @property {number} prevStepIndex - Step that is currently active (0-based index). Will be -1 if no current active step
           * @property {Event} event - Event object. Call event.preventDefault() to cancel
           */
          this.$emit('activate-step', index, this.currentStep, stepEvent);

          if (!stepEvent.defaultPrevented) {
            this.currentStep = index;
            result = true;
          }
        }
      }

      // Couldn't set step, so ensure v-model is up to date
      if (!result && this.value !== currentStep) {
        /**
         * Emitted when a step is shown. Used to update the v-model.
         * @event input
         * @property {number} stepIndex - Current selected step index (0-based index)
         */
        this.$emit('input', currentStep);
      }

      return result;
    },
    reset() {
      this.setStep(this.value);
      if (this.currentStep === this.value) {
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
    return this.$scopedSlots.default({
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
  },
};
</script>
