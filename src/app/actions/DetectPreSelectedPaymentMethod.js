import Action from '../rfsm/Action';

export default class DetectPreSelectedPaymentMethod extends Action {
  static TransitionTypes = {
    YES: 'yes',
    NO: 'no'
  };

  constructor() {
    super();
  }

  handleEvent(event) {
    super.handleEvent(event);

    const transition = this.transitions[DetectPreSelectedPaymentMethod.TransitionTypes.YES];
    event.next(transition)
  }
};
