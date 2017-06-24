/* eslint-disable */

import React, {Component} from 'react';

// rfsm
import StateMachineSlider from './rfsm/StateMachineSlider';
import ViewState from './rfsm/ViewState';
import ActionState from './rfsm/ActionState';
import Transition from './rfsm/Transition';

import ViewLoading from './components/ViewLoading';
import ViewA from './components/ViewA';
import ViewB from './components/ViewB';
import ViewC from './components/ViewC';
import ViewD from './components/ViewD';

import ActionInit from './actions/ActionInit';

const viewLoadingState = new ViewState({
  name: 'View Loading State',
  view: ViewLoading,
  persist: false
});

const actionInitState = new ActionState({
  name: 'actionInitState',
  action: ActionInit
});

const viewAState = new ViewState({
  name: 'View A State',
  view: ViewA
});

const viewBState = new ViewState({
  name: 'View B State',
  view: ViewB
});

const viewCState = new ViewState({
  name: 'View C State',
  view: ViewC
});

const viewDState = new ViewState({
  name: 'View D State',
  view: ViewD
});

viewLoadingState.transitions = [
  new Transition({
    name: ViewLoading.TransitionTypes.NEXT,
    to: actionInitState
  })
];

viewAState.transitions = [
  new Transition({
    name: ViewA.TransitionTypes.GOTO_B,
    to: viewBState
  }),
  new Transition({
    name: ViewA.TransitionTypes.GOTO_C,
    to: viewCState
  }),
  new Transition({
    name: ViewA.TransitionTypes.GOTO_D,
    to: viewDState
  })
];

viewBState.transitions = [
  Transition.Back({}),
  new Transition({
    name: ViewA.TransitionTypes.GOTO_C,
    to: viewCState
  }),
  new Transition({
    name: ViewA.TransitionTypes.GOTO_D,
    to: viewDState
  })
];

viewCState.transitions = [
  Transition.Back({}),
  new Transition({
    name: ViewA.TransitionTypes.GOTO_D,
    to: viewDState
  })
];

viewDState.transitions = [
  Transition.Back({})
];

actionInitState.transitions = [
  new Transition({
    name: ViewLoading.TransitionTypes.NEXT,
    to: viewAState
  })
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  onBeforeEnterState(state) {
    console.info('enter', state);
  }

  onBeforeExitState(state) {
    console.info('exit', state);
  }

  render() {
    const stateMachineProps = {
      model: this.state,
      initialState: viewLoadingState,
      onBeforeEnterState: this.onBeforeEnterState,
      onBeforeExitState: this.onBeforeExitState
    };
    return (
      <div>
        <StateMachineSlider {...stateMachineProps} />
      </div>
    );
  }
}

export default App;
