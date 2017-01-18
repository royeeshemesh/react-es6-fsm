import View from '../rfsm/View';
import React, {PropTypes} from 'react';

class Loading extends View {
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
      return Object.keys(Loading.TransitionTypes).map(transitionType => (
        <button onClick={()=>this.next(Loading.TransitionTypes[transitionType])} key={transitionType}>{transitionType}</button>
      ))
    };

    return (
      <div>
        <h1>Loading</h1>
        {getNextOptions()}
      </div>

    );
  }
}

Loading.propTypes = {};

export default Loading;
