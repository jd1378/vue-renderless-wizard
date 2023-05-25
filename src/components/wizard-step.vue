<script lang="ts" setup>
import {
  h,
  Transition,
  defineSlots,
  Comment,
  inject,
  ref,
  computed,
  watch,
  onBeforeUnmount,
  withDefaults,
} from 'vue';
import type { TransitionProps } from 'vue';

const wizardManager = inject('wizardManager', {});

const props = withDefaults(
  defineProps<{
    /**
     * Should this step be skipped in counting and
     * when the `Next` or `Prev` method is called ?
     */
    disabled?: boolean;
    /**
     * is this the current active step or not.
     * when set, wizard manager will render this set.
     * if there's multiple active steps, only the last one with active is rendered.
     * disabled steps are ignored.
     */
    active?: boolean;
    /**
     * Should this step be rendered only when It's active ? False means render all the time. <wizard-manager> can override this.
     */
    lazy?: boolean;
    /**
     * A function which will be called with wizard data as argument whenever the `Next` button is called.
     * This function must return a promise that resolves to a boolean.
     * if resolved value is `true`, step data is valid and user can move to next step.
     */
    validate?: (wizardData: object) => boolean;
    /**
     * Data object for passing to render function of 'transition' component.
     * anything in this object will be passed to the render function directly.
     */
    transition?:
      | TransitionProps
      | ((backwarding: boolean, isActive: boolean) => TransitionProps);

    /** the title of this step. this can be used to give a title to this step, so to be used later using manager's `steps` scoped slot. */
    title?: string;
  }>(),
  {
    disabled: false,
    active: false,
    lazy: false,
    validate: undefined,
    transition: () => ({}),
    title: '',
  }
);

const emit = defineEmits<{
  /**
   * Emitted when the current step has finished (on calling next).
   * Emits after activate-step if it was not cancelled.
   * Eemits before the <wizard-manager> `finished` event on the last step (there's no `activate-step` when on last step, because there's no next step).
   * @event finished
   * @property {object} data - contains the wizard data
   */
  (event: 'finished', data: object): void;
  /**
   * Emitted when the step is activated or deactivated. active means it's the current step.
   * @event active
   * @property {boolean} newValue
   */
  (event: 'active', newValue: boolean): void;
}>();

// data
const localActive = ref(props.active);

// computed
const computedLazy = computed(() => (wizardManager as any).lazy || props.lazy);

watch(localActive, (newValue) => {
  // Make `active` prop work with `.sync` modifier
  emit('active', newValue);
});

const slots = defineSlots<{
  /**
   * The default slot of wizard-step. This slot provides scoped data and methods you can use in your steps.
   * @slot default
   */
  default(props: {
    /** is `true` if this step component should be rendered */
    active: boolean;
    /** Current step number. Starts from 1 and Excludes disabled steps count so you can use it as is in UI (numbers don't jump). */
    currentStep: number;
    /** Current step index. starts from zero. */
    currentStepIndex: number;
    /** Total steps count. Excludes disabled steps count so you can use it as is in UI. */
    stepsCount: number;
    /** Total steps count. Including disabled steps. */
    realStepsCount: number;
    /** Proceed to next step */
    next(bypassValidation: boolean): Promise<void>;
    /** Proceed to previous step */
    prev(): void;
    /** Directly go to a step by index. */
    setStep(index: number): void;
    /** Emits a `reset` event, restores `initial-data` prop and goes to first step */
    reset(): void;
    hasNext: boolean;
    hasPrev: boolean;
    /** if a validation check is in progress */
    validating: boolean;
    /** the wizard data that you can use as your data. */
    data: object;
    /**
     * you can think of it as which direction the wizard is moving.
     *
     *  If true, It's a previous step,
     *
     *  If false, It's a next step.
     *
     *  You have to note though that it can be neither forwarding or backwarding (at the time of accessing this), but for simplicity it's one boolean.
     */
    backwarding: boolean;
  }): any;
}>();

defineRender(() => {
  const children =
    // Render content lazily if requested
    (localActive.value || !computedLazy.value) && slots.default
      ? () =>
          slots.default({
            active: localActive.value,
            currentStep: (wizardManager as any).availableStepProgress,
            currentStepIndex: (wizardManager as any).currentStep,
            stepsCount: (wizardManager as any).availableSteps,
            realStepsCount: (wizardManager as any).stepsCount,
            next: (wizardManager as any).next,
            prev: (wizardManager as any).prev,
            setStep: (wizardManager as any).setStep,
            reset: (wizardManager as any).reset,
            hasNext: (wizardManager as any).hasNext,
            hasPrev: (wizardManager as any).hasPrev,
            data: (wizardManager as any).wizardData,
            validating: (wizardManager as any).validating,
            backwarding: (wizardManager as any).backwarding,
          })
      : () => h(Comment);

  let transition;
  if (typeof props.transition === 'function') {
    transition = props.transition(
      !!(wizardManager as any).backwarding?.value,
      localActive.value
    );
  } else {
    transition = props.transition;
  }

  return h(Transition, transition, children);
});

const exposed = {
  // methods
  registerStep,
  unregisterStep,
  emit,
  // props
  active: props.active,
  disabled: props.disabled,
  lazy: props.lazy,
  transition: props.transition,
  validate: props.validate,
  title: props.title,
  // data
  localActive,
  // computed
  computedLazy,
};

defineExpose(exposed);

// Private methods
function registerStep() {
  // Inform `<wizard-manager>` of our presence
  const { registerStep } = wizardManager as any;
  if (registerStep) {
    registerStep(exposed);
  }
}
function unregisterStep() {
  // Inform `<wizard-manager>` of our departure
  const { unregisterStep } = wizardManager as any;
  if (unregisterStep) {
    unregisterStep(exposed);
  }
}

// Inform `<wizard-manager>` of our presence
registerStep();

onBeforeUnmount(() => {
  // Inform `<wizard-manager>` of our departure
  unregisterStep();
});

export type ExposedStep = typeof exposed;
</script>
