# wizard-step

## Props

| Prop name  | Description                                                                                                                                                                                                 | Type                                  | Values | Default |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------ | ------- |
| lazy       | Should this step be rendered only when It's active ? False means render all the time. &lt;wizard-manager&gt; can override this.                                                                             | boolean                               | -      |         |
| disabled   | Should this step be skipped in counting and<br/>when the `Next` or `Prev` method is called ?                                                                                                                | boolean                               | -      |         |
| active     | is this the current active step or not.<br/>when set, wizard manager will render this set.<br/>if there's multiple active steps, only the last one with active is rendered.<br/>disabled steps are ignored. | boolean                               | -      |         |
| validate   | A function which will be called with wizard data as argument whenever the `Next` button is called. This function can return a Promise.                                                                      | boolean \| Function                   | -      |         |
| transition | Data object for passing to render function of 'transition' component.<br/>anything in this object will be passed to the render function directly.                                                           | Function \| Record&lt;string, any&gt; | -      |         |

## Events

| Event name | Properties                                     | Description                                                                                                                                                                                                                                                                       |
| ---------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| finished   | **object** `object` - contains the wizard data | Emitted when the current step has finished (on calling next).<br/>Emits after activate-step if it was not cancelled.<br/>Eemits before the &lt;wizard-manager&gt; `finished` event on the last step (there's no `activate-step` when on last step, because there's no next step). |
| active     | **boolean** `boolean` - undefined              | Emitted when the step is activated or deactivated. active means it's the current step.                                                                                                                                                                                            |

---
