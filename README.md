# vue-renderless-wizard

This component hopefully abstracts away some of the wizard creating boilerplate.

## usage

```bash
npm install vue-renderless-wizard
# or 
yarn add vue-renderless-wizard
```

then add it to your vue application:

```js
// add it to your vue application:
import VueRenderlessWizard from 'vue-renderless-wizard';
import Vue from 'vue';

Vue.use(VueRenderlessWizard);

// or

import VueRenderlessWizard from 'vue-renderless-wizard';

export default {
  components: {
    VueRenderlessWizard
  }
}
```

Example:

```vue
<template>

</template>
```

If you want to render steps inside a wrapper, you can render the vnodes given by the "wrapper" slot scope like this:
```vue
<template>

</template>
```

Also the VNodeRenderer is just a simple component I used from [this stackoverflow answer](https://stackoverflow.com/a/51033863/3542461), you can use that instead of importing from my component, but I have included it for convenience
