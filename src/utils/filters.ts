import type { ExposedStep } from '../components/wizard-step.vue';

// Filter function to filter out disabled steps
export function notDisabled(step: ExposedStep) {
  return !step.disabled.value;
}
export function disabled(step: ExposedStep) {
  return step.disabled.value;
}
