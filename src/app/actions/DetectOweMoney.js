import Action from '../rfsm/Action';

export default class DetectOweMoney extends Action {
  static TransitionTypes = {
    YES: 'yes',
    NO: 'no'
  };

  constructor() {
    super();
  }

  handleEvent(event) {
    super.handleEvent(event);

    const transition = this.transitions[DetectOweMoney.TransitionTypes.NO];
    event.next(transition);
  }
}
