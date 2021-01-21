<template>
  <StepBase @finished="finished"> Welcome to the first step </StepBase>
</template>

<script>
import StepBase from './step-base';

export default {
  components: {
    StepBase,
  },
  methods: {
    finished() {
      console.log('step one has finished');
    },
  },
};
</script>
