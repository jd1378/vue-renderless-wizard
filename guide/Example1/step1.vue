<template>
  <StepBase @active="activeHandler" @finished="finished">
    Welcome to the first step
  </StepBase>
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
    activeHandler(active) {
      if (active) {
        console.log('step one has activated');
      }
    },
  },
};
</script>
