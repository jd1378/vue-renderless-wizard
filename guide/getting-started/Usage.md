
This component is renderless, this means you have to manage the css needed for displaying steps and animations yourself.

There's a lot of ways you can use the component, but I have prepared one example you can find in this doc.

Other than `<wizard-manager>`, each `<wizard-step>` also emits `finished` event with the `data` object given to both component after the validation for the step is passed.
