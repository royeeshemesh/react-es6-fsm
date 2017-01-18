import Action from '../rfsm/Action';

export default class DetectType3 extends Action {
  static TransitionTypes = {
    YES: 'yes',
    NO: 'no'
  };

  constructor() {
    super();
  }

  handleEvent(event) {
    super.handleEvent(event);

    const transition = this.transitions[DetectType3.TransitionTypes.NO];
    event.next(transition);
  }
}
