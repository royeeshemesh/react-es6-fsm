/* eslint-disable */

import React, {PropTypes, Component} from 'react';
import Event from './Event';

class View extends Component {
  static TransitionTypes = {
    BACK: 'back'
  };

  constructor(props) {
    super(props);

    this.event = props.event;
    this.model = props.event.model;
    this.next = props.event.next;
    this.error = props.event.error;
    this.transitions = props.event.state.transitions;
  }
}

View.propTypes = {
  event: PropTypes.instanceOf(Event).isRequired
};

export default View;
