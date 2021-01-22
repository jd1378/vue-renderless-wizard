describe('entry file', () => {
  describe('exports', () => {
    let entryExports;
    beforeEach(async () => {
      entryExports = await import('./entry');
    });

    it('exports <wizard-manager> component', () => {
      expect(entryExports).toHaveProperty('WizardManager');
    });

    it('exports <wizard-step> component', () => {
      expect(entryExports).toHaveProperty('WizardStep');
    });

    it('exports a vue plugin by default', () => {
      expect(entryExports).toHaveProperty('install');
    });
  });

  describe('install function', () => {
    let entryExports;
    beforeEach(async () => {
      entryExports = await import('./entry');
    });

    it('registers <WizardManager> and <WizardStep> components and only once', () => {
      const vueMock = {
        component: jest.fn(),
      };
      entryExports.install(vueMock);

      expect(vueMock.component).toBeCalledTimes(2);
      expect(vueMock.component).toBeCalledWith(
        'WizardManager',
        entryExports.WizardManager
      );
      expect(vueMock.component).toBeCalledWith(
        'WizardStep',
        entryExports.WizardStep
      );
      // try install again
      entryExports.install(vueMock);
      expect(vueMock.component).toBeCalledTimes(2);
    });
  });
});
