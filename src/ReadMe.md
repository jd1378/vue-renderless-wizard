# Example 1

```vue
<template>
  <div id="app">
    <VueRenderlessWizard>
      <template #container="wizard">
        <WizardContainer :wizard="wizard" />
      </template>
      <template #step-1>
        <div class="fill center">step 1</div>
      </template>
      <template #step-2>
        <div class="fill center">step 2</div>
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

<style>
.fill {
  flex: 1 1 0;
}
.center {
  display: flex;
  justify-content:center;
  align-items: center;
}
</style>
```

check these for the content of wizard-container and the vue-renderless-wizard itself:

[wizard-container.vue](https://github.com/jd1378/vue-renderless-wizard/blob/main/src/wizard-container.vue)

[vue-renderless-wizard.vue](https://github.com/jd1378/vue-renderless-wizard/blob/main/src/vue-renderless-wizard.vue)

Note that wizard-container is for illustration purposes and is not bundled with vue-renderless-wizard
