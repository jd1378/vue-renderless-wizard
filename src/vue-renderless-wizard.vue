<script>
/**
 * Vue Renderless Wizard component (hopefully) helps you manage the steps of your wizard easily.
 * @example ./wizard-container.vue
 */
export default {
  props: {
    /**
     * Sets the step to show when rendering the wizard for the first time
     */
    startingStep: {
      type: Number,
      default: 1,
      validator(val) {
        return val > 0;
      },
    },
  },
  data() {
    return {
      currentStep: 1,
    };
  },
  computed: {
    /**
     * the count of detected steps by enumerating $slots
     * each defined template with 'step-{n}' as slot name counts as 1 step
     */
    stepsCount() {
      return Object.keys(this.$slots).reduce((accumulator, slotName) => {
        if (slotName.startsWith('step-')) {
          return accumulator + 1;
        }
        return accumulator;
      }, 0);
    },
    hasNext() {
      return this.currentStep < this.stepsCount;
    },
    hasPrev() {
      return this.currentStep > 1;
    },
  },
  created() {
    this.currentStep = this.startingStep;
  },
  methods: {
    next() {
      if (this.hasNext) {
        this.currentStep++;
        return true;
      }
      return false;
    },
    prev() {
      if (this.hasPrev) {
        this.currentStep--;
        return true;
      }
      return false;
    },
    setStep(step) {
      this.currentStep = step;
      /** Triggered when goTo is called with the new step
       * @event setStep
       * @type {Event}
       */
      this.$emit('setStep', step);
    },
    reset() {
      this.currentStep = this.startingStep;
      /** Triggered when reset is called and current step is changed to startingStep prop
       * @event reset
       * @type {Event}
       */
      this.$emit('reset');
    },
  },
  /**
   * You define your steps like step-1, step-2, ... and it will be rendered when you are on that step.
   * @slot step-{n}
   * @binding {function} next Proceed to next step
   * @binding {function} prev Proceed to previous step
   * @binding {number} currentStep
   * @binding {number} stepsCount
   * @binding {function} setStep Emits `setStep` event and goes to given step
   * @binding {reset} reset Emits a `reset` event and goes to first step
   * @binding {boolean} hasNext
   * @binding {boolean} hasPrev
   */
  /**
   * The container of steps. you can use this slot to wrap the steps you define with the content of this slot.
   * but for rendering the steps you have to use the VNodesRenderer helper component provided.
   * @slot container
   * @binding {Array<VNode>} stepVNodes VNodes of current step of wizard.
   * @binding {function} next Proceed to next step
   * @binding {function} prev Proceed to previous step
   * @binding {number} currentStep
   * @binding {number} stepsCount
   * @binding {function} setStep Emits `setStep` event and goes to given step
   * @binding {reset} reset Emits a `reset` event and goes to first step
   * @binding {boolean} hasNext
   * @binding {boolean} hasPrev
   */
  render(h) {
    let vnodes;

    if (this.$scopedSlots['step-' + this.currentStep]) {
      vnodes = this.$scopedSlots['step-' + this.currentStep]({
        next: this.next,
        prev: this.prev,
        currentStep: this.currentStep,
        stepsCount: this.stepsCount,
        setStep: this.setStep,
        reset: this.reset,
        hasNext: this.hasNext,
        hasPrev: this.hasPrev,
      });
    }

    if (vnodes) {
      if (this.$scopedSlots.container) {
        const [containerVNode] = this.$scopedSlots.container({
          vnodes,
          currentStep: this.currentStep,
          stepsCount: this.stepsCount,
          next: this.next,
          prev: this.prev,
          setStep: this.setStep,
          reset: this.reset,
          hasNext: this.hasNext,
          hasPrev: this.hasPrev,
        });
        return containerVNode;
      }
      return vnodes;
    }

    return h();
  },
};
</script>
