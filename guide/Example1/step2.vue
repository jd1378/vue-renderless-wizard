<template>
  <StepBase v-slot="{ data }" class="p-3 column center text-center">
    <input
      v-model="data.firstName"
      class="form-control mb-3 w-sm"
      type="text"
      placeholder="First Name"
    />
    <input
      v-model="data.lastName"
      class="form-control w-sm"
      type="text"
      placeholder="Last Name"
    />
  </StepBase>
</template>

<script>
import StepBase from './step-base';

export default {
  components: {
    StepBase,
  },
};
</script>
