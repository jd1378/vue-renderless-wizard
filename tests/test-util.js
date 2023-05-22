import get from 'lodash/get';

export function setExposedValue(wrapper, key, value) {
  const exposed = get(
    wrapper,
    'wrapper.__app._container._vnode.component.subTree.component.exposed'
  );

  if (exposed) {
    if (key in exposed) {
      if ('value' in exposed[key]) {
        exposed[key].value = value;
      } else {
        exposed[key] = value;
      }
    }
  }
}
