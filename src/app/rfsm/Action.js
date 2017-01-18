class Action {
  constructor() {
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(event) {
    this.fromState = event.state;
    this.transitions = this.fromState.transitions;
  }
}

export default Action;
