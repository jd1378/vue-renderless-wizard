<script lang="ts">
import { h, Transition, Comment, defineComponent } from 'vue';

export default defineComponent({
  inject: {
    wizardManager: {
      default: () => ({}),
    },
  },
  props: {
    /**
     * Should this step be skipped in counting and
     * when the `Next` or `Prev` method is called ?
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * is this the current active step or not.
     * when set, wizard manager will render this set.
     * if there's multiple active steps, only the last one with active is rendered.
     * disabled steps are ignored.
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * Should this step be rendered only when It's active ? False means render all the time. <wizard-manager> can override this.
     */
    lazy: {
      type: Boolean,
      default: false,
    },
    /**
     * A function which will be called with wizard data as argument whenever the `Next` button is called. This function can return a Promise.
     */
    validate: {
      type: [Boolean, Function],
      default: false,
    },
    /**
     * Data object for passing to render function of 'transition' component.
     * anything in this object will be passed to the render function directly.
     */
    transition: {
      type: [Object, Function],
      default: () => ({}),
    },
  },
  emits: {
    /**
     * Emitted when the current step has finished (on calling next).
     * Emits after activate-step if it was not cancelled.
     * Eemits before the <wizard-manager> `finished` event on the last step (there's no `activate-step` when on last step, because there's no next step).
     * @event finished
     * @property {object} data - contains the wizard data
     */
    finished(data: object) {
      return typeof data === 'object';
    },
    /**
     * Emitted when the step is activated or deactivated. active means it's the current step.
     * @event active
     * @property {boolean} newValue
     */
    active(newValue: boolean) {
      return typeof newValue === 'boolean';
    },
  },
  data() {
    return {
      localActive: this.active,
    };
  },
  computed: {
    computedLazy() {
      return (this.wizardManager as any).lazy || this.lazy;
    },
  },
  watch: {
    localActive(newValue) {
      // Make `active` prop work with `.sync` modifier
      this.$emit('active', newValue);
    },
  },
  created() {
    // Inform `<wizard-manager>` of our presence
    this.registerStep();
  },
  beforeUnmount() {
    // Inform `<wizard-manager>` of our departure
    this.unregisterStep();
  },
  methods: {
    // Private methods
    registerStep() {
      // Inform `<wizard-manager>` of our presence
      const { registerStep } = this.wizardManager as any;
      if (registerStep) {
        registerStep(this);
      }
    },
    unregisterStep() {
      // Inform `<wizard-manager>` of our departure
      const { unregisterStep } = this.wizardManager as any;
      if (unregisterStep) {
        unregisterStep(this);
      }
    },
  },
  /**
   * The default slot of wizard-step. This slot provides scoped data and methods you can use in your steps.
   * @slot default
   * @binding {boolean} active - true if this step component content should rendered
   * @binding {number} currentStep - Current step number. Starts from 1 and Excludes disabled steps count so you can use it as is in UI (numbers don't jump).
   * @binding {number} currentStepIndex - Current step index. starts from zero.
   * @binding {number} stepsCount - Total steps count. Excludes disabled steps count so you can use it as is in UI.
   * @binding {number} realStepsCount - Total steps count. Including disabled steps.
   * @binding {function(boolean: bypassValidation)} next - Proceed to next step
   * @binding {function} prev - Proceed to previous step
   * @binding {function(index: number)} setStep - Directly go to a step by index.
   * @binding {reset} reset - Emits a `reset` event, restores `initial-data` prop and goes to first step
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
    const children =
      // Render content lazily if requested
      (this.localActive || !this.computedLazy) && this.$slots.default
        ? this.$slots.default({
            active: this.localActive,
            currentStep: (this.wizardManager as any).availableStepProgress,
            currentStepIndex: (this.wizardManager as any).currentStep,
            stepsCount: (this.wizardManager as any).availableSteps,
            realStepsCount: (this.wizardManager as any).stepsCount,
            next: (this.wizardManager as any).next,
            prev: (this.wizardManager as any).prev,
            setStep: (this.wizardManager as any).setStep,
            reset: (this.wizardManager as any).reset,
            hasNext: (this.wizardManager as any).hasNext,
            hasPrev: (this.wizardManager as any).hasPrev,
            data: (this.wizardManager as any).wizardData,
            validating: (this.wizardManager as any).validating,
            backwarding: (this.wizardManager as any).backwarding,
          })
        : h(Comment);

    let transition;
    if (typeof this.transition === 'function') {
      transition = this.transition(
        (this.wizardManager as any).backwarding,
        this.localActive
      );
    } else {
      transition = this.transition;
    }

    return h(Transition, transition, children);
  },
});
</script>
