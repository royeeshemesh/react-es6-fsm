import EventEmitter from 'events';
import Event from './Event'
import ActionState from './ActionState';
import ViewState from './ViewState';
import Transition from './Transition';

class StateMachine extends EventEmitter {
  static Events = {
    ON_BEFORE_ENTER_STATE: 'onBeforeEnterState',
    ON_BEFORE_EXIT_SATE: 'onBeforeExitState',
    NO_INITIAL_STATE: 'noInitialState',
    UNKNOWN_STATE_TYPE: 'unknownStateType'
  };

  constructor() {
    super();

    this.start = this.start.bind(this);
    this.next = this.next.bind(this);

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

  next(transition) {
    if (!transition) {
      return;
    }

    const self = this;

    transition.from = self.currentState;

    /*console.info(
     self.constructor.name,
     'from:',(transition.from || {}).name,
     'to:',transition.to.name
     );*/

    setTimeout(() => {
      if (!!transition.from) {
        self.emit(StateMachine.Events.ON_BEFORE_EXIT_SATE, transition.from);
      }
    });

    setTimeout(() => {
      self.emit(StateMachine.Events.ON_BEFORE_ENTER_STATE, transition.to);
    });

    setTimeout(() => {
      // console.info(
      //   self.constructor.name,
      //   'from:', (transition.from || {}).name,
      //   'to:', transition.to.name
      // );

      self.currentState = transition.to;
      self.breadCrumb.push(self.currentState);

      //create event to pass to state callback
      let event = new Event({
        state: self.currentState,
        next: self.next
      });

      if (self.currentState.constructor.name === 'ViewState') {
        const view = self.currentState.view;
        if (!!view) {
          self.slider.handleEvent(event);
        }
      } else if (self.currentState.constructor.name === 'ActionState') {
        const action = new self.currentState.action();
        if (!!action) {
          action.handleEvent(event);
        }
      } else {
        self.emit(StateMachine.Events.UNKNOWN_STATE_TYPE);
      }
    });
  }

}

export default StateMachine;
