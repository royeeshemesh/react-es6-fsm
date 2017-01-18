import React, {PropTypes, Component} from 'react';
import Event from './Event';

class View extends Component {
  constructor(props) {
    super(props);
  }
}

View.propTypes = {
  event: PropTypes.instanceOf(Event)
};

export default View;
