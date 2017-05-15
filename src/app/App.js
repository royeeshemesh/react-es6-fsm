import React, {Component} from 'react';

// rfsm
import StateMachineSlider from './rfsm/StateMachineSlider';
import ViewState from './rfsm/ViewState';
import ActionState from './rfsm/ActionState';
import Transition from './rfsm/Transition';

// views
import ViewLoading from './views/ViewLoading';
import ViewA from './views/ViewA';
import ViewB from './views/ViewB';
import ViewC from './views/ViewC';
import ViewD from './views/ViewD';

const viewLoadingState = new ViewState({
  name: 'viewLoadingState',
  view: ViewLoading,
  persist: false
});

const viewAState = new ViewState({
  name: 'viewAState',
  view: ViewA
});

const viewBState = new ViewState({
  name: 'viewBState',
  view: ViewB
});

const viewCState = new ViewState({
  name: 'viewCState',
  view: ViewC
});

const viewDState = new ViewState({
  name: 'viewDState',
  view: ViewD
});

viewLoadingState.transitions = [new Transition({
  name: ViewLoading.TransitionTypes.NEXT,
  to: viewAState
})];

viewAState.transitions = [
  new Transition({
    name: ViewA.TransitionTypes.GOTO_VIEW_B,
    to: viewBState
  }),
  new Transition({
    name: ViewA.TransitionTypes.GOTO_VIEW_C,
    to: viewCState
  }),
  new Transition({
    name: ViewA.TransitionTypes.GOTO_VIEW_D,
    to: viewDState
  }),
];

viewBState.transitions = [
  Transition.Back({}),
  new Transition({
    name: ViewB.TransitionTypes.GOTO_VIEW_C,
    to: viewCState
  }),
  new Transition({
    name: ViewB.TransitionTypes.GOTO_VIEW_D,
    to: viewDState
  }),
];

viewCState.transitions = [
  Transition.Back({}),
  new Transition({
    name: ViewC.TransitionTypes.GOTO_VIEW_D,
    to: viewDState
  }),
];

viewDState.transitions = [
  Transition.Back({}),
];

export class App extends Component {
  constructor(props) {
    super(props);
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
