<script>
export default {
  props: {
    startingStep: {
      type: Number,
      default: 0,
      validator(val) {
        return val >= 0;
      },
    },
  },
  data() {
    return {
      currentStep: 0,
    };
  },
  computed: {
    stepsCount() {
      return Object.keys(this.$slots).reduce((accumulator, slotName) => {
        if (slotName.endsWith(accumulator)) {
          return accumulator + 1;
        }
        return accumulator;
      }, -1);
    },
  },
  created() {
    this.currentStep = this.startingStep;
  },
  methods: {
    next(predicate = true) {
      if (this.currentStep < this.stepsCount) {
        if (
          (typeof predicate === 'boolean' && predicate) ||
          (typeof predicate === 'function' && predicate())
        ) {
          this.currentStep++;
        }
      }
      return false;
    },
    prev(predicate = true) {
      if (this.currentStep > 0) {
        if (
          (typeof predicate === 'boolean' && predicate) ||
          (typeof predicate === 'function' && predicate())
        ) {
          this.currentStep--;
        }
      }
    },
    getSlot(vnode) {
      console.log(vnode);
    },
  },
  render(h) {
    let stepVNodes;

    if (this.$scopedSlots['step-' + this.currentStep]) {
      stepVNodes = this.$scopedSlots['step-' + this.currentStep]({
        next: this.next,
        prev: this.prev,
        currentStep: this.currentStep,
        stepsCount: this.stepsCount,
      });
    }

    if (stepVNodes) {
      if (this.$scopedSlots.container) {
        const [containerVNode] = this.$scopedSlots.container({
          stepVNodes,
          currentStep: this.currentStep,
          stepsCount: this.stepsCount,
          next: this.next,
          prev: this.prev,
        });
        return containerVNode;
      }
      return stepVNodes;
    }

    return h();
  },
};

// from https://stackoverflow.com/a/51033863/3542461
export const VNodeRenderer = {
  functional: true,
  render: (h, ctx) => ctx.props.vnodes,
};
</script>
