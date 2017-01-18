import Action from '../rfsm/Action';

export default class DetectIsBillConfigured extends Action {
  static TransitionTypes = {
    YES: 'yes',
    NO: 'no'
  };

  constructor() {
    super();
  }

  handleEvent(event) {
    super.handleEvent(event);

    const transition = this.transitions[DetectIsBillConfigured.TransitionTypes.NO];
    event.next(transition)
  }
};
