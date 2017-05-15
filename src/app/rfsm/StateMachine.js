/* eslint-disable */

import EventEmitter from 'events';
import Event from './Event'
import ActionState from './ActionState';
import View from './View';
import ViewState from './ViewState';
import Transition from './Transition';

class StateMachine extends EventEmitter {
  static Events = {
    ON_BEFORE_ENTER_STATE: 'onBeforeEnterState',
    ON_BEFORE_EXIT_SATE: 'onBeforeExitState',
    NO_INITIAL_STATE: 'noInitialState',
    UNKNOWN_STATE_TYPE: 'unknownStateType',
    UNDEFINED_TRANSITION_TO: 'undefinedTransitionTo'
  };

  constructor({model, onBeforeEnterState, onBeforeExitState}) {
    super();
    this.model = model;
    this.start = this.start.bind(this);
    this.next = this.next.bind(this);
    this.error = this.error.bind(this);
    this.onBeforeEnterState = onBeforeEnterState;
    this.onBeforeExitState = onBeforeExitState;

    this.breadCrumb = [];
  }

  start({slider, initialState}) {
    this.slider = slider;
    if (!initialState) {
      this.emit(StateMachine.NO_INITIAL_STATE)
    } else {
      this.next(new Transition({
        name: 'initialState',
        to: initialState,
        from: null
      }));
    }
  }

  error(err) {
    this.slider.handleError(err);
  }

  next(transition) {
    if (!transition) {
      return;
    }

    const self = this;

    transition.from = self.currentState;

    self.currentState = transition.to;

    //check if transition has state to go to
    if (!self.currentState) {
      // if transition name is BACK make go to previous view state from breadcrumbs
      if (transition.name === View.TransitionTypes.BACK) {
        self.currentState = self.breadCrumb.pop();
      } else {
        self.emit(StateMachine.Events.UNDEFINED_TRANSITION_TO);
        return;
      }
    }

    // handle exit state
    if (!!transition.from) {
      if (!!self.onBeforeExitState) {
        self.onBeforeExitState(transition.from);
      } else {
        self.emit(StateMachine.Events.ON_BEFORE_EXIT_SATE, transition.from);
      }

      // if this is not back transition add it to breadcrumbs
      if (transition.name !== View.TransitionTypes.BACK) {
        // if transition to go to is View state push it to breadcrumbs
        if (!!transition.from.persist) {
          self.breadCrumb.push(transition.from);
        }
      }
    }

    // handle enter state
    if (!!self.onBeforeEnterState) {
      // check if back is supported
      const backTransition = self.currentState.transitions[View.TransitionTypes.BACK];
      if (!!backTransition) {
        backTransition.enabled = self.breadCrumb.length > 0
      }


      self.onBeforeEnterState(self.currentState);
    } else {
      self.emit(StateMachine.Events.ON_BEFORE_ENTER_STATE, transition.to);
    }

    //create event to pass to state callback
    let event = new Event({
      model: self.model,
      state: self.currentState,
      next: self.next,
      error: self.error,
      direction: transition.direction
    });

    if (self.currentState instanceof ViewState) {
      const view = self.currentState.view;
      if (!!view) {
        self.slider.handleEvent(event);
      }
    } else if (self.currentState instanceof ActionState) {
      const action = new self.currentState.action();
      if (!!action) {
        action.handleEvent(event);
      }
    } else {
      self.emit(StateMachine.Events.UNKNOWN_STATE_TYPE);
    }
  }

}

export default StateMachine;
