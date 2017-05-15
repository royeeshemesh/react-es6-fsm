import React from 'react';
import View from '../rfsm/View';

export default class ViewA extends View {
  static TransitionTypes = {
    GOTO_VIEW_B: 'gotoViewB',
    GOTO_VIEW_C: 'gotoViewC',
    GOTO_VIEW_D: 'gotoViewD'
  };

  static propTypes = {};

  constructor(props) {
    super(props);

    this.goto = this.goto.bind(this);
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
        <h1>View A</h1>
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
