import View from '../rfsm/View';
import React, {PropTypes} from 'react';

class EnterAccountNumber extends View {
  static TransitionTypes = {
    NEXT: 'next'
  };

  constructor(props) {
    super(props);

    this.next = this.next.bind(this);
  }

  next(choice) {
    const
      event = this.props.event,
      transitions = event.state.transitions;

    let transition = transitions[choice];

    event.next(transition);
  }

  render() {
    const getNextOptions = () => {
      return Object.keys(EnterAccountNumber.TransitionTypes).map(transitionType => (
        <button onClick={()=>this.next(EnterAccountNumber.TransitionTypes[transitionType])} key={transitionType}>{transitionType}</button>
      ))
    };

    return (
      <div>
        <h1>Enter Account Number</h1>
        {getNextOptions()}
      </div>
    );
  }
}

EnterAccountNumber.propTypes = {};

export default EnterAccountNumber;
