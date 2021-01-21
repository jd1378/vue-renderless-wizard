<template>
  <WizardStep
    v-slot="scope"
    :transition="getTransition"
    v-bind="$attrs"
    :disabled="disabled"
    v-on="$listeners"
  >
    <div v-bind="$attrs.class" class="center fill">
      <slot v-bind="scope"></slot>
    </div>
  </WizardStep>
</template>

<script>
import { WizardStep } from '../../src/entry';
import { translateFade, translateFadeBackwarding } from './transitions';

export default {
  components: {
    WizardStep,
  },
  inheritAttrs: false,
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
