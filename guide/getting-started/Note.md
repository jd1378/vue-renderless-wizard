**Most Important** note on usage is to never conditionally render `<WizardStep>` components, because we can't keep track of order of components. If you need to disable a step conditionally, add disabled property to WizardStep component. when `next` or `prev` methods are called, the disabled step will be skipped.