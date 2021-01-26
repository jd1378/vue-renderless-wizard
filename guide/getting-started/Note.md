**Most Important** note on usage is to never conditionally render `<WizardStep>` components, because we can't keep track of order of components. If you need to disable a step conditionally, add disabled property to WizardStep component. when `next` or `prev` methods are called, the disabled step will be skipped.

Also because I use async await syntax inside my component, and use babel to transpile the library, you have to use @babel/runtime to provide async await polyfills as this package depends on it.

If this is not acceptable for many, I consider writing without async await to reduce the dependecy in future.
