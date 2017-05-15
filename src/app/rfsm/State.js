/* eslint-disable */

export default class State {
    constructor({name, transitions}) {
        this.name = name;
        this.transitionsMap = {};
        if (!!transitions) {
            transitions.forEach(transition => this.transitions[transition.name] = transition);
        }
    }

    set transitions(transitions) {
        if (!!transitions) {
            transitions.forEach(transition => this.transitions[transition.name] = transition);
        }
    }

    get transitions() {
        return this.transitionsMap;
    }
}
