"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 're-bulma';
import {debounce} from 'throttle-debounce';
import SliderButton from '../components/SliderButton';
import SliderProgress from '../components/SliderProgress';
import SliderAmountLimits from '../components/SliderAmountLimits';
class Slider extends React.Component {

  constructor (props){
    console.log('Slider constructor props', props)
    super(props);
    this.state = {
      minAmount: props.minAmount,
      maxAmount: props.maxAmount,
      amount: props.amount,
      step: props.step,
      dragging: props.dragging,
      relativePosition: props.relativePosition,
      className: props.className
    }
    this.handleResize = this.handleResize.bind(this)
    // this.onMouseMove=this.onMouseMove.bind(this)
    // this.onMouseMove=this.deBounce.bind(this, this.onMouseMove.bind(this),10)
    // this.onMouseMove = this.onMouseMove.bind(this)

    this.mouseDown = this.mouseDown.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.mouseClick = this.mouseClick.bind(this)
    this.getInputPositionX = this.getInputPositionX.bind(this)
    this.setPosition = this.setPosition.bind(this)
    this.moveHandler = debounce(10, false, this.moveHandler)
    // this.moveHandler = this.moveHandler.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
  }

  moveHandler (e){

    console.log('inside moveHandler', e.button);
    if(this.state.dragging && (e.button === 0 || (e.touches && e.touches.length))){
      console.log('Slider.onMouseMove')
      const inputPosition = this.getInputPositionX(e);
      this.setPosition(inputPosition);
      e.stopPropagation()
      e.preventDefault()
    }
  }

  mouseMove (e){
    // e.persist();
    console.log('inside mouseMove');
    // console.log('what is e', e)
    this.moveHandler(e)

  }

  mouseDown (e){
    // only left mouse button
    console.log('insidse mouseDown', this.state)
    if(e.button === 0 || (e.touches && e.touches.length)){
      this.setState({
        dragging: true,
      })
      e.stopPropagation()
      e.preventDefault()
    }
  }

  mouseUp (e){
    console.log('insidse mouseUp', this.state)
    this.setState({
      dragging: false
    })
    e.stopPropagation()
    e.preventDefault()
  }

  getInputPositionX (e){
    const val = e.pageX || e.touches[0].pageX;
    console.log('getInputPositionX', val);
    return e.pageX || e.touches[0].pageX;
  }

  setPosition (inputPosition){
    // console.log('setPosition: what is state before', this.state);
    this.setState({
      position: inputPosition
    })
  }


  mouseClick (e){
    // only left mouse button
    if(e.button === 0 || (e.touches && e.touches.length)){
      const inputPosition = this.getInputPositionX(e);
      this.setPosition(inputPosition);
      e.stopPropagation()
      e.preventDefault()
    }
  }



  componentDidMount (){
    // window.addEventListener('resize', this.handleResize);
    // console.log('Slider.componentDidMount this.props', this.props)
    // console.log('Slider.componentDidMount this.state', this.state)
    //the drag needs to be not just on the slider, but the spaces above it.
    window.addEventListener('mousemove', this.mouseMove)
    window.addEventListener('mouseup', this.mouseUp)
    this.setState({
      dragging: false
    })
  }
  componentWillUnmount(){
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  }
  handleResize (){
    // const bar = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
    // console.log('handleResize what is this progress bar ', bar)
    // this.constructor.updateSliderProgressDimensions.call(this);
  }

  // shouldComponentUpdate (nextProps, nextState){
  //   console.log('Slider.shouldComponentUpdate nextProps', nextProps)
  //   console.log('Slider.shouldComponentUpdate this.props', this.props)
  //   console.log('Slider.shouldComponentUpdate nextState', nextState)
  //   console.log('Slider.shouldComponentUpdate this.state', this.state)
  //   const test = (
  //     nextState.constraintWidth !== this.state.constraintWidth ||
  //     nextState.constraintLeft !== this.state.constraintLeft ||
  //     nextState.constraintRight !== this.state.constraintRight ||
  //     nextState.relativePosition !== this.state.relativePosition ||
  //     nextState.dragging !== this.state.dragging ||
  //     nextState.percent !== this.state.percent
  //   )
  //   console.log('Slider.shouldComponentUpdate test', test)
  //   return test;
  // }

  componentWillReceiveProps (nextProps){
    console.log('Slider.componentWillReceiveProps nextProps', nextProps)
    this.setState(nextProps)
  }

  componentDidUpdate (prevProps, prevState){
    console.log('Slider.componentDidUpdate prevProps', prevProps);
    console.log('Slider.componentDidUpdate this.props', this.props);
    console.log('Slider.componentDidUpdate prevState', prevState);
    console.log('Slider.componentDidUpdate this.state', this.state);
  }


  render (){
    console.log('Slider.render: what is this.props', this.props)
    return (

      <Container

        onTouchCancel={this.mouseUp}
        onTouchEnd={this.mouseUp}
        onMouseDown={this.mouseClick}
        onMouseUp={this.mouseUp}
      >
        <SliderButton
          ref="button" {...this.state}
          updateSlideButtonRelativePosition={this.constructor.updateSlideButtonRelativePosition.bind(this)}
          convertPercentToAmount={this.constructor.convertPercentToAmount.bind(this)}
          formatAmount={this.props.formatAmount}
          updateAmount={this.props.updateAmount}
          mouseDown={this.mouseDown}
          mouseUp={this.mouseUp}
        />

        <SliderProgress
          ref="progress" percent={this.state.percent}
          updateSliderProgressDimensions={this.constructor.updateSliderProgressDimensions.bind(this)}
        />
        <SliderAmountLimits
          formatAmount={this.props.formatAmount}
          minAmount={this.state.minAmount}
          maxAmount={this.state.maxAmount}
        />
      </Container>

    )
  }
}
//
Slider.defaultProps = {
  id: 'button',
  className: 'promisefin_slider__button'
}

Slider.updateSliderProgressDimensions = function (sliderProgress){

  const sliderProgressElement = ReactDOM.findDOMNode(sliderProgress).getBoundingClientRect();
  console.log('Slider.updateSliderProgressDimensions: sliderProgressElement.width', sliderProgressElement.width)
  this.setState({
    constraintLeft: sliderProgressElement.left,
    constraintRight: sliderProgressElement.right,
    constraintWidth: sliderProgressElement.width
  });
}

Slider.updateSlideButtonRelativePosition = function (target, targetPosition, targetWidth){
  let relativePosition;
  let percent;
  if(!targetPosition){
    percent = this.constructor.convertAmountToPercent.call(this, this.state.amount)
    relativePosition = this.state.constraintWidth * percent;
  }
  else if(targetPosition <= this.state.constraintLeft){
    relativePosition = 0;
    percent = 0;
  }
  else if(targetPosition >= this.state.constraintRight){
    relativePosition = this.state.constraintWidth
    percent = 1;
  }
  else {
    relativePosition = targetPosition - (this.state.constraintRight - this.state.constraintWidth)
    percent = relativePosition / this.state.constraintWidth;
  }
  const amount = this.constructor.convertPercentToAmount.call(this, percent);
  this.props.updateAmount(amount)
  this.setState({
    relativePosition: relativePosition,
    percent: percent
  })

}
Slider.convertAmountToPercent = function (amount){
  const totalUnits = ((this.state.maxAmount - this.state.minAmount) / this.state.step) + 1;
  const amountUnitUsage = totalUnits - ((this.state.maxAmount - amount) / this.state.step);
  const percent = amountUnitUsage / totalUnits
  return percent;

}
Slider.convertPercentToAmount = function (percent){

  const availableUnits = ((this.state.maxAmount - this.state.minAmount) / this.state.step) + 1;
  const unit = 100 / availableUnits; //should be about 3.333
  const remainder = 100 - (availableUnits * unit);

  let unRoundedTotalUnits = (percent * 100) / unit;

  unRoundedTotalUnits = unRoundedTotalUnits + remainder;
  let amount = Math.ceil((unRoundedTotalUnits * this.state.step) / this.state.step) * this.state.step
  if(amount < this.state.step){
    amount = this.state.step;
  }
  amount = amount + 2000;
  if(amount >= this.state.maxAmount){
    amount = this.state.maxAmount;
  }
  return amount;
}


export default Slider;
