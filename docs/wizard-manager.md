# F:\Projects\Private\npm packages\vue\vue-renderless-wizard\src\components\wizard-manager

## Props

| Prop name   | Description                                                                                                                                                                                                                | Type                 | Values | Default |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------ | ------- |
| modelValue  | Starting step index (zero-based). is `0` by default. be careful to not set this below `0`;                                                                                                                                 | number \| undefined  | -      |         |
| lazy        | Accessed by `&lt;wizard-step&gt;` component. If set, all the steps are rendered lazily. You want to set this to `true` almost always.<br/>Without this, All of the steps will be visible at once.<br/><br/>Default: `true` | boolean \| undefined | -      |         |
| initialData | The data that is used as initial data _and_ **reset**                                                                                                                                                                      | object               | -      |         |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |
| reset             |            |
| finished          |            |
| activate-step     |            |

## Slots

| Name    | Description | Bindings                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default |             | **undefined** `number` - undefined<br/>**undefined** `number` - undefined<br/>**undefined** `number` - undefined<br/>**undefined** `number` - undefined<br/>**undefined** `(bypassValidation: boolean) =&gt; Promise&lt;void&gt;` - undefined<br/>**undefined** `() =&gt; void` - undefined<br/>**undefined** `(index: number) =&gt; void` - undefined<br/>**undefined** `() =&gt; void` - undefined<br/>**undefined** `boolean` - undefined<br/>**undefined** `boolean` - undefined<br/>**undefined** `boolean` - undefined<br/>**undefined** `object` - undefined<br/>**undefined** `boolean` - undefined |

---

```vue live
<FProjectsPrivatenpmpackagesvuevue-renderless-wizardsrccomponentswizard-manager
  :initialData="{}"
>Default Example Usage</FProjectsPrivatenpmpackagesvuevue-renderless-wizardsrccomponentswizard-manager>
```
