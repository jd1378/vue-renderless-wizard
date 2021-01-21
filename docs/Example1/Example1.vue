<template>
  <div id="app">
    <WizardManager v-slot="scope" lazy @finished="handleFinished">
      <WizardContainer :scope="scope">
        <Step1 />
        <disabled-step />
        <Step2 />
        <Step3 />
      </WizardContainer>
    </WizardManager>
  </div>
</template>

<script>
import { WizardManager } from '../../src/entry';
import WizardContainer from './wizard-container.vue';
import Step1 from './step1.vue';
import Step2 from './step2.vue';
import Step3 from './step3.vue';
import DisabledStep from './disabled-step.vue';
import './global.css';
import './transitions.css';

export default {
  components: {
    WizardManager,
    WizardContainer,
    Step1,
    Step2,
    Step3,
    DisabledStep,
  },
  methods: {
    handleFinished(data) {
      typeof alert === 'function' && alert(JSON.stringify(data));
    },
  },
};
</script>
