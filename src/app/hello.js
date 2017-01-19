import React, {Component} from 'react';
import Slider from 'react-slick';
import Loading from './components/Loading';
import DetectPreSelectedPaymentMethod from './actions/DetectPreSelectedPaymentMethod';
import DetectOweMoney from './actions/DetectOweMoney';
import DetectType3 from './actions/DetectType3';
import OweMoney from './components/OweMoney';
import DetectIsBillConfigured from './actions/DetectIsBillConfigured';
import EnterAccountNumber from './components/EnterAccountNumber';
import Type3 from './components/Type3';
import List from 'immutable';

import StateMachine from './rfsm/StateMachine';
import ViewState from './rfsm/ViewState';
import ActionState from './rfsm/ActionState';
import Transition from './rfsm/Transition';

import StateMachineSlider  from './rfsm/StateMachineSlider'

const detectPreSelectedPaymentMethodState = new ActionState({
  name: 'detectPreSelectedPaymentMethodState',
  action: DetectPreSelectedPaymentMethod,
  transitions: []
});

const viewType3State = new ViewState({
  name: 'viewType3State',
  view: Type3,
  transitions: []
});

const viewEnterAccountNumberState = new ViewState({
  name: 'viewEnterAccountNumberState',
  view: EnterAccountNumber,
  transitions: []
});

const detectType3State = new ActionState({
  name: 'detectType3State',
  action: DetectType3,
  transitions: [
    new Transition({
      name: DetectType3.TransitionTypes.YES,
      to: viewType3State
    }),
    new Transition({
      name: DetectType3.TransitionTypes.NO,
      to: detectPreSelectedPaymentMethodState
    })
  ]
});

const viewOweMoneyState = new ViewState({
  name: 'viewOweMoneyState',
  view: OweMoney,
  transitions: []
});

const detectIsBillConfiguredState = new ActionState({
  name: 'detectIsBillConfiguredState',
  action: DetectIsBillConfigured,
  transitions: [
    new Transition({
      name: DetectIsBillConfigured.TransitionTypes.YES,
      to: detectType3State
    }),
    new Transition({
      name: DetectIsBillConfigured.TransitionTypes.NO,
      to: viewEnterAccountNumberState
    }),
  ]
});

const detectOweMoneyState = new ActionState({
  name: 'detectOweMoneyState',
  action: DetectOweMoney,
  transitions: [
    new Transition({
      name: DetectOweMoney.TransitionTypes.YES,
      to: viewOweMoneyState
    }),
    new Transition({
      name: DetectOweMoney.TransitionTypes.NO,
      to: detectIsBillConfiguredState
    })
  ]
});

const viewLoadingState = new ViewState({
  name: 'viewLoadingState',
  view: Loading,
  transitions: [
    new Transition({
      name: Loading.TransitionTypes.NEXT,
      to: detectOweMoneyState
    })
  ]
});

export class Hello extends Component {
  constructor(props) {
    super(props);

    // this.stateMachine = new StateMachine();
    // this.stateMachine.on(StateMachine.Events.ON_BEFORE_ENTER_STATE, (state) => {
    //   console.info(StateMachine.Events.ON_BEFORE_ENTER_STATE, state.name);
    // });
    //
    // this.stateMachine.on(StateMachine.Events.ON_BEFORE_EXIT_SATE, (state) => {
    //   console.info(StateMachine.Events.ON_BEFORE_EXIT_SATE, state.name);
    // });

    this.state = {
      slides: List.fromJS([])
    };

    // this.handleEvent = this.handleEvent.bind(this);
  }

  // componentDidMount() {
  //   this.sliderView = this.refs.slider;
  //   this.stateMachine.start({slider: this, initialState: viewLoadingState});
  // }

  // handleEvent(event) {
  //   this.setState({
  //     slides: this.state.slides.push({
  //       event
  //     })
  //   }, () => {
  //     this.next();
  //   });
  // }
  //
  // next() {
  //   setTimeout(() => {
  //     this.sliderView.slickNext();
  //   })
  // }

  render() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
      },
      self = this;

    const getSlides = function () {

      return self.state.slides.map((descriptor, index) => {
        const View = descriptor.event.state.view;
        return (
          <div key={index}>
            <View event={descriptor.event}/>
          </div>
        )
      })
    };

    return (

      <div>

        <StateMachineSlider initialState={viewLoadingState}/>

        {/*<Slider {...settings} ref="slider">
          <div key="placeholder"/>
          {getSlides()}
        </Slider>*/}
        {/*<div style={{textAlign: 'center'}}>
          <button className='button' onClick={() => this.refs.slider.slickPrev()}>Previous</button>
          <button className='button' onClick={() => this.refs.slider.slickNext()}>Next</button>
        </div>*/}

      </div>
    );
  }
}
