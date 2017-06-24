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

    // this.print(this.props.initialState, 0)
  }

  componentDidMount() {
    this.setState({
      slide: this.props.Loading
    }, () => {
      this.stateMachine.start({slider: this, initialState: this.props.initialState});
    });
  }

  componentWillUnmount() {
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

  print() {
    let visited = {};

    console.info(this.props.initialState.name);
    const doPrint = (state, depth) => {

      if (visited[state.name] === undefined) {
        visited[state.name] = 0;
      } else {
        visited[state.name] += 1;
      }

      for (let transitionName in state.transitionsMap) {
        let padding = '';
        for (let i=0; i<depth; i++) {
          padding += '|-----';
        }
        if (!state.transitionsMap[transitionName].to || !state.transitionsMap[transitionName].to.name)
          return;

        console.info(padding + transitionName, '=>', state.transitionsMap[transitionName].to.name, depth,visited[state.transitionsMap[transitionName].to.name]);
        if (!visited[state.transitionsMap[transitionName].to.name] || visited[state.transitionsMap[transitionName].to.name] < 1) {
          if (state.name === 'viewPaymentHubState' && visited[state.name] === 1) {
          } else {

          doPrint(state.transitionsMap[transitionName].to, depth + 1)
          }
        }
      }
    };
    doPrint(this.props.initialState, 1)
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
