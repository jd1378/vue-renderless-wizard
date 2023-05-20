# Getting Started

## Install

```bash
npm install vue-renderless-wizard
# or 
yarn add vue-renderless-wizard
```

## Load Component

```js static noeditor
// add it to your vue application:
import VueRenderlessWizard from 'vue-renderless-wizard';
import Vue from 'vue';

Vue.use(VueRenderlessWizard);

// or

import { WizardManager, WizardStep } from 'vue-renderless-wizard';

export default {
  components: {
    WizardManager,
    WizardStep,
  },
};
```

## Important Note

**Most Important** note on usage is to never conditionally render `<WizardStep>` components, because we can't keep track of order of components. If you need to disable a step conditionally, add disabled property to WizardStep component. when `next` or `prev` methods are called, the disabled step will be skipped.

Also because I use async await syntax inside my component, and use babel to transpile the library, you have to use @babel/runtime to provide async await polyfills as this package depends on it.

If this is not acceptable for many, I consider writing without async await to reduce the dependecy in future.

## Usage

This component is renderless, this means you have to manage the css needed for displaying steps and animations yourself.

There's a lot of ways you can use the component, but I have prepared one example you can find in this doc.

Other than `<wizard-manager>`, each `<wizard-step>` also emits `finished` event with the `data` object given to both component after the validation for the step is passed.
