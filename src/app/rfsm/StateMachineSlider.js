import React, {Component, PropTypes} from 'react';
import Slider from 'react-slick';
import StateMachine from './StateMachine';
import ViewState from './ViewState';
import List from 'immutable';

class StateMachineSlider extends Component {
  constructor(props) {
    super(props);

    this.stateMachine = new StateMachine();

    this.stateMachine.on(StateMachine.Events.ON_BEFORE_ENTER_STATE, (state) => {
      console.info(StateMachine.Events.ON_BEFORE_ENTER_STATE, state.name);
    });

    this.stateMachine.on(StateMachine.Events.ON_BEFORE_EXIT_SATE, (state) => {
      console.info(StateMachine.Events.ON_BEFORE_EXIT_SATE, state.name);
    });

    this.state = {
      slides: List.fromJS([])
    };

    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {
    this.sliderView = this.refs.slider;
    this.stateMachine.start({slider: this, initialState: this.props.initialState});
  }

  handleEvent(event) {
    this.setState({
      slides: this.state.slides.push({
        event
      })
    }, () => {
      this.next();
    });
  }

  next() {
    setTimeout(() => {
      this.sliderView.slickNext();
    })
  }

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
      <Slider {...settings} ref="slider">
        <div key="placeholder"/>
        {getSlides()}
      </Slider>
    );
  }
}

StateMachineSlider.propTypes = {
  initialState: PropTypes.instanceOf(ViewState).isRequired
};

export default StateMachineSlider;
