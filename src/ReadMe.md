
```vue
<template>
  <div id="app">
    <VueRenderlessWizard>
      <template #container="wizard">
        <WizardContainer :wizard="wizard" />
      </template>
      <template #step-0>
        <div>step 0</div>
      </template>
    </VueRenderlessWizard>
  </div>
</template>

<script>
import VueRenderlessWizard from './vue-renderless-wizard.vue';
import WizardContainer from './wizard-container.vue';

export default {
  components: {
    VueRenderlessWizard,
    WizardContainer
  }
}
</script>
```

check here for the content of wizard-container and the vue-renderless-wizard itself:

[wizard-container.vue](https://github.com/jd1378/vue-renderless-wizard/blob/main/src/wizard-container.vue)

[vue-renderless-wizard.vue](https://github.com/jd1378/vue-renderless-wizard/blob/main/src/vue-renderless-wizard.vue)

Note that wizard-container is for illustration purposes and is not bundled with vue-renderless-wizard