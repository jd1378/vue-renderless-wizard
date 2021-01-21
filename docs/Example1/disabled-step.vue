<template>
  <StepBase disabled>
    This is not gonna be shown or activated until disabled is gone, but will be
    rendered. if lazy prop is true, it will be rendered when activated. Lazy
    prop is set either on &lt;wizard-manager&gt; component or
    &lt;wizard-step&gt; component itself.
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
