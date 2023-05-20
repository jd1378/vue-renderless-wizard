<template>
  <WizardStep v-slot="scope" :transition="getTransition" :disabled="disabled">
    <div v-bind="$attrs" class="center fill">
      <slot v-bind="scope"></slot>
    </div>
  </WizardStep>
</template>

<script>
import { WizardStep } from '../../src/entry';
import { translateFade, translateFadeBackwarding } from './transitions';

export default {
  inheritAttrs: false,
  components: {
    WizardStep,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      forwarding: true,
    };
  },
  methods: {
    getTransition(backwarding) {
      if (backwarding) {
        return translateFadeBackwarding;
      } else {
        return translateFade;
      }
    },
  },
};
</script>
