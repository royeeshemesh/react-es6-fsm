/* eslint-disable */

import React from 'react';
import View from '../rfsm/View';

export default class ViewA extends View {
  static TransitionTypes = {
  };

  constructor(props) {
    super(props);

    this.goto = this.goto.bind(this);

    this.state = {};
  }

  goto(state) {
    this.next(this.transitions[state]);
  }

  render() {
    const getToolbar = () => {
      const self = this;

      return Object.keys(this.transitions).map(transitionName => {
        const transition = self.transitions[transitionName];
        let caption = transition.to ? `Next to ${transition.to.name}` : transition.name;
        return (
          <button key={transitionName} onClick={()=>self.goto(transitionName)}>{caption}</button>
        )
      });
    };

    return (
      <div className="slide">
        <h1>{this.event.state.name}</h1>
        <hr/>
        {getToolbar()}
      </div>
    );
  }
}
