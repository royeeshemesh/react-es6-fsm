import View from '../rfsm/View';
import React, {PropTypes} from 'react';

class Type3 extends View {
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
      return Object.keys(Type3.TransitionTypes).map(transitionType => (
        <button onClick={()=>this.next(Type3.TransitionTypes[transitionType])} key={transitionType}>{transitionType}</button>
      ))
    };

    return (
      <div>
        <h1>Type3</h1>
        {getNextOptions()}
      </div>

    );
  }
}

Type3.propTypes = {};

export default Type3;
