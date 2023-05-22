# F:\Projects\Private\npm packages\vue\vue-renderless-wizard\src\components\wizard-step

## Props

| Prop name  | Description                                                                                                                                                                                                 | Type                                               | Values | Default |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------ | ------- |
| lazy       | Should this step be rendered only when It's active ? False means render all the time. &lt;wizard-manager&gt; can override this.                                                                             | boolean \| undefined                               | -      |         |
| disabled   | Should this step be skipped in counting and<br/>when the `Next` or `Prev` method is called ?                                                                                                                | boolean \| undefined                               | -      |         |
| active     | is this the current active step or not.<br/>when set, wizard manager will render this set.<br/>if there's multiple active steps, only the last one with active is rendered.<br/>disabled steps are ignored. | boolean \| undefined                               | -      |         |
| validate   | A function which will be called with wizard data as argument whenever the `Next` button is called. This function can return a Promise.                                                                      | boolean \| Function \| undefined                   | -      |         |
| transition | Data object for passing to render function of 'transition' component.<br/>anything in this object will be passed to the render function directly.                                                           | Function \| Record&lt;string, any&gt; \| undefined | -      |         |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| finished   |            |
| active     |            |

---

```vue live
<FProjectsPrivatenpmpackagesvuevue-renderless-wizardsrccomponentswizard-step />
```
