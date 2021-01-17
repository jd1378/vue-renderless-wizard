<template>
  <div class="wizard-container">
    <div class="step-content">
      <VNodeRenderer :vnodes="wizard.vnodes" />
    </div>
    <div class="step-controller"></div>
  </div>
</template>

<script>
import VNodeRenderer from '@/v-node-renderer.js';

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

<style lang="css">
.wizard-container {
  background: #f7f7f7;
  border-radius: 3px;
  box-shadow: 0px 0px 5px 0px rgba(35, 35, 35, 0.3);
  color: #424242;
  font-size: 1.2rem;
  margin: 1rem;
  min-height: 300px;

  display: flex;
  flex-direction: column;
}

.step-controller {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
}
</style>
