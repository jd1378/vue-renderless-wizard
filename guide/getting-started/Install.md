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