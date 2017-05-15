/* eslint-disable */

class Action {
  constructor() {
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(event) {
    this.model = event.model;
    this.props = event.props;
    this.fromState = event.state;
    this.next = event.next;
    this.error = event.error;
    this.transitions = this.fromState.transitions;
  }
}

export default Action;
