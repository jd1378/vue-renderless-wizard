# wizard-manager

## Props

| Prop name   | Description                                                                                                                                                                                                                | Type    | Values | Default       |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------------- |
| modelValue  | Starting step index (zero-based). is `0` by default. be careful to not set this below `0`;                                                                                                                                 | number  | -      | 0             |
| lazy        | Accessed by `&lt;wizard-step&gt;` component. If set, all the steps are rendered lazily. You want to set this to `true` almost always.<br/>Without this, All of the steps will be visible at once.<br/><br/>Default: `true` | boolean | -      | false         |
| initialData | The data that is used as initial data _and_ **reset**                                                                                                                                                                      | object  | -      | () =&gt; ({}) |

## Events

| Event name        | Properties                                                                                                                                                                                                                                                        | Description                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| update:modelValue | **stepIndex** `number` - Current selected step index (0-based index)                                                                                                                                                                                              | Emitted when a step is shown. Used to update the v-model.                                                                                |
| reset             |                                                                                                                                                                                                                                                                   | Triggered when reset is called and current step is changed to **value** prop successfully. Wizard data is reset to initial data as well. |
| finished          | **data** `object` - contains the wizard data                                                                                                                                                                                                                      | Emitted when **next()** function has been called, there's no next step remaining and validation for current step has passed.             |
| activate-step     | **newStepIndex** `number` - Step being activated (0-based index)<br/>**prevStepIndex** `number` - Step that is currently active (0-based index). Will be -1 if no current active step<br/>**event** `Event` - Event object. Call event.preventDefault() to cancel | Emitted just before a step is shown/activated. Cancelable                                                                                |

---
