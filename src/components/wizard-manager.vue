<script lang="ts" setup generic="T extends object">
import { toInteger } from '../utils/number';
import { isFunction } from '../utils/inspect';
import { cloneDeep } from '../utils/clone-deep';
import { notDisabled } from '../utils/filters';
import {
  h,
  Comment,
  provide,
  defineSlots,
  withDefaults,
  ref,
  shallowRef,
  computed,
  onBeforeUnmount,
  onBeforeMount,
  watch,
  toRefs,
} from 'vue';
import type { ExposedStep } from './wizard-step.vue';
import { ActivateStepEvent } from '../events';

const props = withDefaults(
  defineProps<{
    /**
     * Starting step index (zero-based). is `0` by default. be careful to not set this below `0`;
     */
    modelValue?: number;
    /**
     * Accessed by `<wizard-step>` component. If set, all the steps are rendered lazily.
     * Without this, All of the steps will be visible at once.
     *
     * Default: `false`
     */
    lazy?: boolean;
    /**
     * The data that is used as initial data *and* **reset**
     */
    initialData?: T;
  }>(),
  {
    modelValue: 0,
    lazy: false,
    initialData: () => ({} as T),
  }
);

const emit = defineEmits<{
  /**
   * Emitted when a step is shown. Used to update the v-model.
   * @event update:modelValue
   * @property {number} stepIndex - Current selected step index (0-based index)
   */
  (event: 'update:modelValue', index: number): void;
  /**
   * Triggered when reset is called and current step is changed to **value** prop successfully. Wizard data is reset to initial data as well.
   * @event reset
   * @type {Event}
   */
  (event: 'reset'): void;
  /**
   * Emitted when **next()** function has been called, there's no next step remaining and validation for current step has passed.
   * @event finished
   * @property {object} data - contains the wizard data
   */
  (event: 'finished', data: object): void;
  /**
   * Emitted just before a step is shown/activated. Cancelable
   * @event activate-step
   * @property {number} newStepIndex - Step being activated (0-based index)
   * @property {number} prevStepIndex - Step that is currently active (0-based index). Will be -1 if no current active step
   * @property {Event} event - Event object. Call event.preventDefault() to cancel
   */
  (event: 'activate-step', e: ActivateStepEvent): void;
}>();

// data
const currentStep = ref(props.modelValue);
/** Array of `<wizard-step>` instances, in DOM order */
const steps = shallowRef([] as ExposedStep[]);
const wizardData = ref(cloneDeep(props.initialData, {}));
const validating = ref(false);
const backwarding = ref(false);

//computed
/**
 * Count of detected steps
 */
const stepsCount = computed(() => {
  return steps.value.length;
});
/**
 * Count of available steps
 */
const availableSteps = computed(() => {
  return steps.value.filter(notDisabled).length;
});
/**
 * Current step relative to available steps
 */
const availableStepProgress = computed(() => {
  return (
    steps.value.slice(0, currentStep.value).reverse().filter(notDisabled)
      .length + 1
  );
});
const nextStep = computed(() => {
  return steps.value.slice(currentStep.value + 1).find(notDisabled);
});
const prevStep = computed(() => {
  return steps.value.slice(0, currentStep.value).reverse().find(notDisabled);
});
const hasNext = computed(() => {
  return !!nextStep.value;
});
const hasPrev = computed(() => {
  return !!prevStep.value;
});

// methods

function updateSteps() {
  // Find last active non-disabled step in current steps
  // We trust step state over `currentStep`, in case steps were added/removed/re-ordered
  let stepIndex = steps.value.indexOf(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    steps.value
      .slice()
      .reverse()
      .find(($step) => $step.localActive.value && !$step.disabled.value)
  );

  // Else try setting to `currentStep`
  if (stepIndex < 0) {
    if (
      steps.value[currentStep.value] &&
      !steps.value[currentStep.value].disabled.value
    ) {
      // Current step is not disabled
      stepIndex = currentStep.value;
    }
  }

  if (stepIndex < 0) {
    stepIndex = steps.value.indexOf(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      steps.value.find(notDisabled)
    );
  }

  // Ensure only one step is active at a time
  steps.value.forEach((step, index) => {
    step.localActive.value = index === stepIndex;
  });

  if (stepIndex !== -1) {
    currentStep.value = stepIndex;
  }
}
function registerStep(step: ExposedStep) {
  if (!steps.value.includes(step)) {
    const edited = steps.value.slice();
    edited.push(step);
    steps.value = edited;
  }
}
function unregisterStep(step: ExposedStep) {
  steps.value = steps.value.slice().filter((s) => s !== step);
}
async function next(bypassValidation = false) {
  if (validating.value) return;
  const step = steps.value[currentStep.value];
  if (step) {
    validating.value = true;
    let canContinue = true;
    if (!bypassValidation && isFunction(step.validate.value)) {
      canContinue = await step.validate.value(wizardData.value);
    }

    if (canContinue) {
      if (nextStep.value) {
        const result = activateStep(nextStep.value);
        if (result) {
          step.emit('finished', wizardData.value);
        }
      } else {
        step.emit('finished', wizardData.value);
        emit('finished', wizardData.value);
      }
    }
    validating.value = false;
  }
}
function prev() {
  if (validating.value) return;
  activateStep(prevStep.value);
}
function setStep(index: number) {
  return activateStep(steps.value[index]);
}
function activateStep(step?: ExposedStep) {
  let result = false;

  if (step) {
    const index = steps.value.indexOf(step);

    if (index !== currentStep.value && !step.disabled.value) {
      const stepEvent = new ActivateStepEvent(index, currentStep.value);

      emit('activate-step', stepEvent);

      if (!stepEvent.defaultPrevented) {
        backwarding.value = index < currentStep.value;
        currentStep.value = index;
        result = true;
      }
    }
  }

  // Couldn't set step, so ensure v-model is up to date
  if (!result && props.modelValue !== currentStep.value) {
    emit('update:modelValue', currentStep.value);
  }

  return result;
}
function reset() {
  setStep(props.modelValue);
  if (currentStep.value === props.modelValue) {
    wizardData.value = cloneDeep(props.initialData, {});
    emit('reset');
  }
}

// other
watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      newValue = toInteger(newValue, 0);
      oldValue = toInteger(oldValue, 0);

      const $step = steps.value[newValue];
      if ($step && !$step.disabled.value) {
        activateStep($step);
      } else {
        // Try next or prev steps
        if (newValue < oldValue) {
          activateStep(prevStep.value);
        } else {
          activateStep(nextStep.value);
        }
      }
    }
  }
);

watch(currentStep, (newValue) => {
  let index = 0;

  // Ensure only one step is active at most
  steps.value.forEach(($step, i) => {
    if (i === newValue && !$step.disabled.value) {
      $step.localActive.value = true;
      index = i;
    } else {
      $step.localActive.value = false;
    }
  });

  // Update the v-model
  emit('update:modelValue', index);
});

watch(steps, updateSteps);

onBeforeMount(() => {
  updateSteps();
});

onBeforeUnmount(() => {
  // Ensure no references to child instances exist
  steps.value = [];
});

const slots = defineSlots<{
  /**
   * The default slot of wizard. You can structure your overall wizard look in here and put where the steps should be rendered.
   * There **Must** be `<wizard-step>` components inside.
   * @slot default
   */
  default(props: {
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
    data: T;
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
    /** registered steps on wizard manager */
    steps: ExposedStep[];
  }): any;
}>();

defineRender(() => {
  if (slots.default) {
    return slots.default({
      currentStep: availableStepProgress.value,
      currentStepIndex: currentStep.value,
      stepsCount: availableSteps.value,
      realStepsCount: stepsCount.value,
      next: next,
      prev: prev,
      setStep: setStep,
      reset: reset,
      hasNext: hasNext.value,
      hasPrev: hasPrev.value,
      data: wizardData.value,
      validating: validating.value,
      backwarding: backwarding.value,
      steps: steps.value,
    });
  } else {
    return h(Comment);
  }
});

// for access inside steps and on refs
const exposed = {
  // props
  ...toRefs(props),
  // data
  currentStep,
  steps,
  wizardData,
  validating,
  backwarding,
  // computed
  stepsCount,
  availableSteps,
  availableStepProgress,
  nextStep,
  prevStep,
  hasNext,
  hasPrev,
  // methods:
  updateSteps,
  registerStep,
  unregisterStep,
  next,
  prev,
  setStep,
  activateStep,
  reset,
};
provide('wizardManager', exposed);
defineExpose(exposed);
</script>
