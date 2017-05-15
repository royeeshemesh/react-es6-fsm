import React from 'react';
import View from '../rfsm/View';

class ViewLoading extends View {
  static TransitionTypes = {
    NEXT: 'next'
  };

  static propTypes = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.next(this.transitions[ViewLoading.TransitionTypes.NEXT]);
    }, 500);
  }

  render() {
    return (
      <div >
        <h1>View Loading</h1>
        <hr/>
        <section >
          <div className="loading-symbol"/>
        </section>
      </div>
    );
  }
}

export default ViewLoading;
