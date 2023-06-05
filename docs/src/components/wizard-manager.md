# wizard-manager

## Props

| Prop name    | Description                                                                                                                                                                   | Type    | Values | Default |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| modelValue   | Starting step index (zero-based). is `0` by default. be careful to not set this below `0`;                                                                                    | number  | -      |         |
| lazy         | Accessed by `&lt;wizard-step&gt;` component. If set, all the steps are rendered lazily.<br/>Without this, All of the steps will be visible at once.<br/><br/>Default: `false` | boolean | -      |         |
| reactiveData | The data that is used as initial data _and_ **reset**. it should be a reactive object.                                                                                        | object  | -      |         |

---
