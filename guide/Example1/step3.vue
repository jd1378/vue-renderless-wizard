<template>
  <StepBase v-slot="{ data }" :validate="validate" class="p-3 center">
    <input
      v-model="data.age"
      class="form-control text-center w-sm"
      type="number"
      placeholder="Age"
    />
  </StepBase>
</template>

<script>
import StepBase from './step-base';

export default {
  components: {
    StepBase,
  },
  methods: {
    validate(data) {
      if (!data.age) {
        alert('You must specify your age');
        return false;
      }
      if (data.age < 18) {
        alert('You must be 18 and over');
        return false;
      }
      return true;
    },
  },
};
</script>
