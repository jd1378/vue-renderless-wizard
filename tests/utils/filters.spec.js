import { notDisabled, disabled } from '@/utils/filters';
import { it, expect } from 'vitest';
import { ref } from 'vue';

it('notDisabled()', async () => {
  const disabledObject = { disabled: ref(true) };
  const sampleArray = [
    { disabled: ref(false) },
    { disabled: ref(false) },
    disabledObject,
    { disabled: ref(false) },
  ];
  expect(sampleArray.filter(notDisabled).length).toEqual(3);
  expect(sampleArray.includes(disabledObject)).toEqual(true);
  expect(sampleArray.filter(notDisabled).includes(disabledObject)).toBeFalsy();
});

it('disabled()', async () => {
  const enabledObject = { disabled: ref(false) };
  const sampleArray = [
    { disabled: ref(true) },
    { disabled: ref(true) },
    enabledObject,
    { disabled: ref(true) },
  ];
  expect(sampleArray.filter(disabled).length).toEqual(3);
  expect(sampleArray.includes(enabledObject)).toEqual(true);
  expect(sampleArray.filter(disabled).includes(enabledObject)).toBeFalsy();
});
