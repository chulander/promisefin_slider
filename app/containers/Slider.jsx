"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
// import LoanAmount from './LoanAmount.jsx';
import {Columns, Section} from 're-bulma';
import SliderButton from '../components/SliderButton';
import SliderProgress from '../components/SliderProgress';

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
    this.onMouseMove = this.onMouseMove.bind(this)
    this.mouseDown = this.mouseDown.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.mouseClick = this.mouseClick.bind(this)
    this.getInputPositionX = this.getInputPositionX.bind(this)
    this.setPosition = this.setPosition.bind(this)


  }

  mouseDown (e){
    // only left mouse button
    if(e.button === 0 || (e.touches && e.touches.length)){
      this.setState({
        dragging: true,
      })
      e.stopPropagation()
      e.preventDefault()
    }
  }

  mouseUp (e){
    this.setState({
      dragging: false
    })
    e.stopPropagation()
    e.preventDefault()
  }

  getInputPositionX (e){
    return e.pageX || e.touches[0].pageX;
  }

  setPosition (inputPosition){
    // console.log('setPosition: what is state before', this.state);
    this.setState({
      position: inputPosition
    })
  }

  onMouseMove (e){

    // console.log('what is e', e)

    if(this.state.dragging){
      const inputPosition = this.getInputPositionX(e);
      this.setPosition(inputPosition);
      e.stopPropagation()
      e.preventDefault()
    }
  }

  mouseClick (e){
    const inputPosition = this.getInputPositionX(e);
    this.setPosition(inputPosition);
    e.stopPropagation()
    e.preventDefault()
  }

  deBounce (func, wait){
    console.log('insidedeBounce')
    let timeout;
    return ()=>{
      clearTimeout(timeout);
      timeout = setTimeout(function (){
        timeout = null;
        func.call()
      }, wait);

    };
  }


  componentDidMount (){
    // window.addEventListener('resize', this.handleResize);
    // console.log('Slider.componentDidMount this.props', this.props)
    // console.log('Slider.componentDidMount this.state', this.state)
  }

  handleResize (){
    // const bar = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
    // console.log('handleResize what is this progress bar ', bar)
    // this.constructor.updateSliderProgressDimensions.call(this);
  }

  shouldComponentUpdate (nextProps, nextState){
    console.log('Slider.shouldComponentUpdate nextProps', nextProps)
    console.log('Slider.shouldComponentUpdate this.props', this.props)
    console.log('Slider.shouldComponentUpdate nextState', nextState)
    console.log('Slider.shouldComponentUpdate this.state', this.state)
    const test = (
      nextState.constraintWidth !== this.state.constraintWidth ||
      nextState.constraintLeft !== this.state.constraintLeft ||
      nextState.constraintRight !== this.state.constraintRight ||
      nextState.constraintLeft !== this.state.constraintLeft ||
      nextState.constraintRight !== this.state.constrainRight ||
      nextState.constraintWidth !== this.state.constraintWidth ||
      nextState.relativePosition !== this.state.relativePosition
    )
    console.log('Slider.shouldComponentUpdate test', test)
    return test;
  }

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

      <Section onMouseMove={this.onMouseMove}
               onMouseLeave={this.mouseUp}
               onTouchMove={this.onMouseMove}
               onTouchCancel={this.mouseUp}
               onTouchEnd={this.mouseUp}
               onMouseDown={this.mouseClick}
      >
        <SliderButton ref="button" {...this.state}
                      updateSlideButtonRelativePosition={this.constructor.updateSlideButtonRelativePosition.bind(this)}
                      convertPercentToAmount={this.constructor.convertPercentToAmount.bind(this)}
                      updateAmount={this.props.updateAmount}
                      mouseDown={this.mouseDown}
                      mouseUp={this.mouseUp}
        />
        <SliderProgress ref="progress" percent={this.state.percent}
                        updateSliderProgressDimensions={this.constructor.updateSliderProgressDimensions.bind(this)}></SliderProgress>
      </Section>

    )
  }
}
//
Slider.defaultProps = {
  id: 'button',
  className: 'promisefin_slider__button',
  minAmount: 3000,
  maxAmount: 35000,
  step: 1000,
  dragging: false,
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
  const amount = this.constructor.convertPercentToAmount.call(this,percent);
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
