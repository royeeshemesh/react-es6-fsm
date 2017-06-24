/* eslint-disable */

import Action from '../rfsm/Action';

export default class ActionInit extends Action {
  static TransitionTypes = {
    NEXT: 'next'
  };

  handleEvent(event) {
    super.handleEvent(event);

    event.next(this.transitions[ActionInit.TransitionTypes.NEXT]);
  }

}
