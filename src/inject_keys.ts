import type { InjectionKey } from 'vue';
import type WizardManager from './components/wizard-manager.vue';

export type ComponentContext<T> = T extends new () => infer E
  ? E
  : T extends (props: any, __ctx: any, expose: infer U) => any
  ? NonNullable<U>
  : unknown;

export type WizardExpose = Parameters<
  ComponentContext<typeof WizardManager>['expose']
>['0'];

export const WizardInjectKey = Symbol(
  'wizard-inject-key'
) as InjectionKey<WizardExpose>;
