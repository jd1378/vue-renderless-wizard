<template>
  <div class="wizard-container">
    <div class="step-content">
      <VNodeRenderer :vnodes="wizard.vnodes" />
    </div>
    <div class="step-controller">
      <button class="btn" :disabled="!wizard.hasPrev" @click="wizard.prev">
        Back
      </button>
      <button class="btn" :disabled="!wizard.hasNext" @click="wizard.next">
        Next
      </button>
    </div>
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
  box-shadow: 0px 0px 3px 0px rgba(35, 35, 35, 0.3);
  color: #424242;
  font-size: 1.2rem;
  margin: 1rem;
  min-height: 300px;

  display: flex;
  flex-direction: column;
}

.step-content {
  display: flex;
  flex: 1 1 0;
}

.step-controller {
  border-top: 1px solid #dadada;
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
}

.btn {
  border-radius: 5px;
  border: #7a7a7a;
  box-shadow: 0px 0px 1px 0px rgba(35, 35, 35, 0.3);
  font-size: 1.2rem;
  padding: 0.5rem 2rem;
}
</style>
