/* eslint-disable */

import React from 'react';
import View from '../rfsm/View';

class ViewLoading extends View {
  static TransitionTypes = {
    NEXT: 'next'
  };

  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    setTimeout(()=>{
      this.next(this.transitions[ViewLoading.TransitionTypes.NEXT]);
    },1000);
  }

  render() {
    return (
      <div className="slide">
        <h1>{this.event.state.name}</h1>
      </div>
    );
  }
}

export default ViewLoading;
