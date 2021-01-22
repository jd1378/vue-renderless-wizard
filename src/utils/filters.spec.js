import { notDisabled, disabled } from './filters';

it('notDisabled()', async () => {
  const disabledObject = { disabled: true };
  const sampleArray = [
    { disabled: false },
    { disabled: false },
    disabledObject,
    { disabled: false },
  ];
  expect(sampleArray.filter(notDisabled).length).toEqual(3);
  expect(sampleArray.includes(disabledObject)).toEqual(true);
  expect(sampleArray.filter(notDisabled).includes(disabledObject)).toBeFalsy();
});

it('disabled()', async () => {
  const enabledObject = { disabled: false };
  const sampleArray = [
    { disabled: true },
    { disabled: true },
    enabledObject,
    { disabled: true },
  ];
  expect(sampleArray.filter(disabled).length).toEqual(3);
  expect(sampleArray.includes(enabledObject)).toEqual(true);
  expect(sampleArray.filter(disabled).includes(enabledObject)).toBeFalsy();
});
