export class ActivateStepEvent extends Event {
  newStepIndex: number;
  prevStepIndex: number;

  constructor(newStepIndex: number, prevStepIndex: number) {
    super('activate-step', {
      cancelable: true,
    });
    this.newStepIndex = newStepIndex;
    this.prevStepIndex = prevStepIndex;
  }
}
