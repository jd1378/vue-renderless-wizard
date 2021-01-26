import { mount } from '@vue/test-utils';
import WizardManager from './wizard-manager.vue';

describe('wizard-manager', () => {
  let scopeProps = {};
  let wrapper;
  function renderDefault(props) {
    scopeProps = props;
    return this.$createElement('div', 'manager');
  }

  function cleanup() {
    scopeProps = {};
    wrapper = {};
  }
  function destroy() {
    if (wrapper && wrapper.destroy) {
      wrapper.destroy();
    }
    wrapper = undefined;
    scopeProps = undefined;
  }

  beforeEach(cleanup);
  afterEach(destroy);

  it('provides itself', () => {
    let injected;
    const childComponent = {
      inject: {
        wizardManager: {
          default: () => false,
        },
      },
      template: '<div>test</div>',
      mounted() {
        injected = this.wizardManager;
      },
    };

    const parentComponent = {
      components: {
        childComponent,
        WizardManager,
      },
      template: '<WizardManager><child-component/></WizardManager>',
    };

    wrapper = mount(parentComponent);
    expect(wrapper.html()).toBe('<div>test</div>');
    expect(injected).toBeTruthy();
    expect(injected).toHaveProperty('currentStep');
  });

  describe('render', () => {
    it('renders content', () => {
      wrapper = mount(WizardManager, {
        slots: {
          default: '<div>manager</div>',
        },
      });
      expect(wrapper.html()).toBe('<div>manager</div>');
    });
  });

  describe('scoped slot', () => {
    beforeEach(() => {
      wrapper = mount(WizardManager, {
        scopedSlots: {
          default: renderDefault,
        },
      });
    });

    it('has currentStep prop', () => {
      expect(scopeProps).toHaveProperty('currentStep');
    });
    it('has currentStepIndex prop', () => {
      expect(scopeProps).toHaveProperty('currentStepIndex');
    });
    it('has stepsCount prop', () => {
      expect(scopeProps).toHaveProperty('stepsCount');
    });
    it('has realStepsCount prop', () => {
      expect(scopeProps).toHaveProperty('realStepsCount');
    });
    it('has next function', () => {
      expect(scopeProps).toHaveProperty('next');
      expect(scopeProps.next).toBeInstanceOf(Function);
    });
    it('has prev function', () => {
      expect(scopeProps).toHaveProperty('prev');
      expect(scopeProps.prev).toBeInstanceOf(Function);
    });
    it('has setStep function', () => {
      expect(scopeProps).toHaveProperty('setStep');
      expect(scopeProps.setStep).toBeInstanceOf(Function);
    });
    it('has reset function', () => {
      expect(scopeProps).toHaveProperty('reset');
      expect(scopeProps.reset).toBeInstanceOf(Function);
    });
    it('has hasNext prop', () => {
      expect(scopeProps).toHaveProperty('hasNext');
    });
    it('has hasPrev prop', () => {
      expect(scopeProps).toHaveProperty('hasPrev');
    });
    it('has data prop', () => {
      expect(scopeProps).toHaveProperty('data');
    });
    it('has validating prop', () => {
      expect(scopeProps).toHaveProperty('validating');
    });
    it('has backwarding prop', () => {
      expect(scopeProps).toHaveProperty('backwarding');
    });

    describe('reset function', () => {
      it('emits reset event when successful', async () => {
        wrapper = mount(WizardManager, {
          scopedSlots: {
            default: renderDefault,
          },
        });
        scopeProps.reset();
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().reset).toBeTruthy();
        expect(wrapper.emitted().reset.length).toBe(1);
      });

      it('resets to initial data when successful', async () => {
        wrapper = mount(WizardManager, {
          propsData: {
            initialData: {
              foo: 'bar',
            },
          },
          scopedSlots: {
            default: renderDefault,
          },
        });
        scopeProps.data.foo = 'rab'; // change data throup scope props
        scopeProps.reset();
        await wrapper.vm.$nextTick();
        expect(scopeProps.data).toStrictEqual({
          foo: 'bar',
        });
      });
    });
  });

  describe('events', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(WizardManager, {
        slots: {
          default: '<div>manager</div>',
        },
      });
    });

    it('emits "reset" when reset is called', async () => {
      wrapper.vm.reset();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().reset).toBeTruthy();
      expect(wrapper.emitted().reset.length).toBe(1);
    });
  });

  describe('props', () => {});
});
