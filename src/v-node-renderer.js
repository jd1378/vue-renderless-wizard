// from https://stackoverflow.com/a/51033863/3542461
const VNodeRenderer = {
  functional: true,
  render: (h, ctx) => ctx.props.vnodes,
};

export default VNodeRenderer;
export { VNodeRenderer };
