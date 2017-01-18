import View from '../rfsm/View';
import React, {PropTypes} from 'react';

class OweMoney extends View {
  static TransitionTypes = {};

  constructor(props) {
    super(props);
  }

  render() {
    const getNextOptions = () => {
      return Object.keys(OweMoney.TransitionTypes).map(transitionType => (
        <button onClick={()=>this.next(OweMoney.TransitionTypes[transitionType])} key={transitionType}>{transitionType}</button>
      ))
    };

    return (
      <div>
        <h1>Own Money View</h1>
        {getNextOptions()}
      </div>
    );
  }
}

OweMoney.propTypes = {};

export default OweMoney;
