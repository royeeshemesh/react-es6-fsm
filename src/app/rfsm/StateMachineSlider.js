/* eslint-disable */

import React from 'react';
import StateMachine from './StateMachine';
import State from './State';
import Transition from './Transition';

const ReactCSSTransitionGroup = React.addons ? React.addons.CSSTransitionGroup : require('react-addons-css-transition-group');

class StateMachineSlider extends React.Component {
  static propTypes = {
    initialState: React.PropTypes.instanceOf(State).isRequired,
    onBeforeEnterState: React.PropTypes.func,
    onBeforeExitState: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.stateMachine = new StateMachine({
      model: props.model,
      onBeforeEnterState: props.onBeforeEnterState,
      onBeforeExitState: props.onBeforeExitState
    });

    this.stateMachine.on(StateMachine.Events.ON_BEFORE_ENTER_STATE, (state) => {
      console.info(StateMachine.Events.ON_BEFORE_ENTER_STATE, state.name);
    });

    this.stateMachine.on(StateMachine.Events.ON_BEFORE_EXIT_SATE, (state) => {
      console.info(StateMachine.Events.ON_BEFORE_EXIT_SATE, state.name);
    });

    this.state = {
      slide: null,
      error: null,
      event: null
    };

    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {
    this.setState({
      slide: this.props.Loading
    }, () => {
      this.stateMachine.start({slider: this, initialState: this.props.initialState});
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.refresh.bind(this), true);
  }

  handleEvent(event) {
    this.setState({
      slide: event.state.view,
      event: event
    });
  }

  handleError(error) {
    this.setState({
      error: error
    });
  }

  render() {
    const Slide = this.state.slide;
    if (!Slide) return null;

    const {event, error} = this.state;

    const name = event ? event.state.name : 'loading';

    const direction = event && event.direction ? event.direction : Transition.Directions.LEFT;

    return (
      <div className="rfsm-slider">
        <ReactCSSTransitionGroup
          component="div"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionName={`slide-${direction}`}>

          <div className="rfsm-slide" key={name}>
            <Slide event={event} error={error}/>
          </div>

        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
export default StateMachineSlider;
