<template>
  <div class="wizard-container">
    <div class="step-content">
      <slot></slot>
    </div>
    <div class="step-controller">
      <button
        type="button"
        class="btn"
        :disabled="!scope.hasPrev"
        @click="scope.prev"
      >
        Back
      </button>
      <div class="center">
        Step {{ scope.currentStep }} of {{ scope.stepsCount }}
      </div>
      <button type="button" class="btn" @click="scope.next">
        {{ scope.hasNext ? 'Next' : 'Finish' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['scope'],
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
  position: relative;
  flex: 1 1 0;
  overflow: hidden;
}

.step-controller {
  border-top: 1px solid #dadada;
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
}
</style>
