// Import vue component
import WizardManager from '@/wizard-manager.vue';
import WizardStep from '@/wizard-step.vue';
// install function executed by Vue.use()
const install = function installVueRenderlessWizard(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('WizardManager', WizardManager);
  Vue.component('WizardStep', WizardStep);
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
let GlobalVue = null;
/* istanbul ignore next */
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
/* istanbul ignore next */
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// export install function in default export
// to be able to be registered via Vue.use()
export default { WizardManager, WizardStep, install };
export { WizardManager, WizardStep, install };

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
