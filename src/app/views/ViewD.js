import React from 'react';
import View from '../rfsm/View';

export default class ViewD extends View {
  static TransitionTypes = {
    NEXT: 'next'
  };

  static propTypes = {};

  constructor(props) {
    super(props);
  }

  goto(transition) {
    this.next(transition);
  }

  render() {
    const getToolbar = () => {
      const self = this;

      return Object.keys(this.transitions).map((transitionName, index) => {
        const transition = self.transitions[transitionName];
        return (
          <li key={index}>
            <button onClick={() => self.goto(transition)}>{transition.name}</button>
          </li>
        )
      })
    };

    return (
      <div >
        <h1>View D</h1>
        <hr/>
        <div>
          <ul className="toolbar">
            {getToolbar()}
          </ul>
        </div>
      </div>
    );
  }
}
