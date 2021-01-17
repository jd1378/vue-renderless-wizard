<template>
  <div class="wizard-container">
    <VNodeRenderer :vnodes="wizard.vnodes" />
  </div>
</template>

<script>
import { VNodeRenderer } from '@/vue-renderless-wizard.vue';
export default {
  components: {
    VNodeRenderer,
  },
  props: {
    wizard: {
      type: Object,
      required: true,
    },
  },
};
</script>
