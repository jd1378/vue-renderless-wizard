<script>
import Vue from 'vue';
import VueRenderlessWizard from '@/vue-renderless-wizard.vue';
import WizardContainer from '@/wizard-container.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueRenderlessWizard,
    WizardContainer,
  },
});
</script>

<template>
  <div id="app">
    <VueRenderlessWizard>
      <template #container="wizard">
        <WizardContainer :wizard="wizard" />
      </template>
      <template #step-1>
        <div>step 1</div>
      </template>
    </VueRenderlessWizard>
  </div>
</template>

<style lang="css">
html {
  background: #232323;
  color: #cdcdcd;
  font-family: 'Avenir Next', 'Avenir', sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.square {
  width: 50px;
  height: 50px;
}
</style>
