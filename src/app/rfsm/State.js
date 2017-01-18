export default class State {
  constructor({name, transitions}) {
    this.name = name;

    if (!!transitions) {
      this.transitions = {};
      transitions.forEach(transition => this.transitions[transition.name] = transition);
    }
  }
}
