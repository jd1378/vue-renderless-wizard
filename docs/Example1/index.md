# Example

Full example using the component:

```vue live
<template>
  <Example1 />
</template>

<script>
export default {
  components: {
    Example1: require("./Example1.vue"),
  }
}
</script>
```

Second Step:

```vue live
<template>
  <Step2 />
</template>

<script>
import Step2 from "./step2.vue"; 
export default {
  components: {
    Step2,
  }
}
</script>
```

Wizard Container:

```vue live
<template>
  <WizardContainer /> 
</template>

<script>
import WizardContainer from "./wizard-container.vue"; 
export default {
  components: {
    WizardContainer,
  }
}
</script>
```

Note that wizard-container is for illustration purposes and is not bundled with vue-renderless-wizard

Source for Example1 is found here: <https://github.com/jd1378/vue-renderless-wizard/tree/main/guide/Example1>
