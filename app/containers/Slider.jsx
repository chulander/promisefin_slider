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

    // Event Handlers
    this.mouseDown = this.mouseDown.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.mouseClick = this.mouseClick.bind(this)
    this.mouseMove = debounce(11, false, this.mouseMove.bind(this))
    this.handleResize = this.handleResize.bind(this)

    //Dom Helpers
    this.getInputPositionX = this.getInputPositionX.bind(this)
    this.getSliderProgressDimensions = this.getSliderProgressDimensions.bind(this)
    this.getSliderButtonDimensions = this.getSliderButtonDimensions.bind(this)
    this.getSliderButtonRelativePosition = this.getSliderButtonRelativePosition.bind(this)

    // Calculations
    this.convertAmountToPercent = this.convertAmountToPercent.bind(this)
    this.convertPercentToAmount = this.convertPercentToAmount.bind(this)
    this.getSliderButtonPercent = this.getSliderButtonPercent.bind(this)

    // Updater
    this.sliderButtonHandler=this.sliderButtonHandler.bind(this)

  }

  handleResize (){
    // get the dimensions
    console.log('RESIZING!!')
    const buttonDimensions = this.getSliderButtonDimensions();
    const progressDimensions = this.getSliderProgressDimensions();
    const percent = this.convertAmountToPercent(this.state.amount)
    const relativePosition = this.getSliderButtonRelativePosition(undefined, progressDimensions.constraintLeft, progressDimensions.constraintRight, progressDimensions.constraintWidth, this.state.amount)
    const newProps = Object.assign({dragging: false}, buttonDimensions, progressDimensions, {percent, relativePosition})
    this.setState(newProps);

  }

  getSliderButtonDimensions (){
    const button = ReactDOM.findDOMNode(this.refs.button).getBoundingClientRect();
    return {
      buttonWidth: button.width,
      buttonHeight: button.height
    }
  }

  getSliderProgressDimensions (){
    const progress = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
    return {
      constraintLeft: progress.left,
      constraintRight: progress.right,
      constraintWidth: progress.width
    }
  }

  getSliderButtonPercent (targetPosition, relativePosition, constraintLeft, constraintRight, constraintWidth, amount){
    if(!targetPosition && amount){
      return this.convertAmountToPercent(amount)
    }
    else if(targetPosition <= constraintLeft){
      return 0;
    }
    else if(targetPosition >= constraintRight){
      return 1;
    }
    else {
      return relativePosition / constraintWidth;
    }
  }

  getSliderButtonRelativePosition (targetPosition, constraintLeft, constraintRight, constraintWidth, amount){
    if(!targetPosition && amount){
      return constraintWidth * this.convertAmountToPercent(amount);
    }
    if(targetPosition <= constraintLeft){
      return 0;
    }
    else if(targetPosition >= constraintRight){
      return constraintWidth;
    }
    else {
      return targetPosition - (constraintRight - constraintWidth)
    }
  }

  convertAmountToPercent (amount){
    const totalUnits = ((this.props.maxAmount - this.props.minAmount) / this.props.step) + 1;
    const amountUnitUsage = totalUnits - ((this.props.maxAmount - amount) / this.props.step);
    const percent = amountUnitUsage / totalUnits
    return percent;

  }

  convertPercentToAmount (percent){

    const availableUnits = ((this.props.maxAmount - this.props.minAmount) / this.props.step) + 1;
    const unit = 100 / availableUnits; //should be about 3.333
    const remainder = 100 - (availableUnits * unit);

    let unRoundedTotalUnits = (percent * 100) / unit;

    unRoundedTotalUnits = unRoundedTotalUnits + remainder;
    let amount = Math.ceil((unRoundedTotalUnits * this.props.step) / this.props.step) * this.props.step
    if(amount < this.props.step){
      amount = this.props.step;
    }
    amount = amount + 2000;
    if(amount >= this.props.maxAmount){
      amount = this.props.maxAmount;
    }
    return amount;
  }

  mouseMove (e){
    if(this.state.dragging && (e.button === 0 || (e.touches && e.touches.length))){
      const inputPosition = this.getInputPositionX(e);
      this.sliderButtonHandler(inputPosition)
      e.stopPropagation()
      e.preventDefault()
    }

  }
  sliderButtonHandler(position){
    const relativePosition = this.getSliderButtonRelativePosition(position, this.state.constraintLeft, this.state.constraintRight, this.state.constraintWidth, this.state.amount)
    const percent = this.getSliderButtonPercent(position, relativePosition, this.state.constraintLeft, this.state.constraintRight, this.state.constraintWidth, this.state.amount)
    const amount = this.convertPercentToAmount(percent)
    this.props.updateAmount(amount);
    this.setState({position,percent,relativePosition})
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

  mouseClick (e){
    // only left mouse button
    if(e.button === 0 || (e.touches && e.touches.length)){
      const inputPosition = this.getInputPositionX(e);
      this.sliderButtonHandler(inputPosition)
      e.stopPropagation()
      e.preventDefault()
    }
  }

  componentDidMount (){
    window.addEventListener('resize', this.handleResize);
    //the drag needs to be not just on the slider, but the spaces above it.
    window.addEventListener('mousemove', this.mouseMove)
    window.addEventListener('mouseup', this.mouseUp)
    // window.addEventListener('resize', function (){
    // })
    const buttonDimensions = this.getSliderButtonDimensions();
    const progressDimensions = this.getSliderProgressDimensions();
    const percent = this.convertAmountToPercent(this.state.amount)
    const relativePosition = this.getSliderButtonRelativePosition(undefined, progressDimensions.constraintLeft, progressDimensions.constraintRight, progressDimensions.constraintWidth, this.state.amount)
    const newProps = Object.assign({dragging: false}, buttonDimensions, progressDimensions, {percent, relativePosition})
    this.setState(newProps);
  }

  componentWillUnmount (){
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  }

  componentWillReceiveProps (nextProps){
    this.setState(nextProps)
    // const relativePosition = this.getSliderButtonRelativePosition(nextProps.position, nextProps.constraintLeft, nextProps.constraintRight, nextProps.constraintWidth, nextProps.state.amount)
    // const percent = this.getSliderButtonPercent(nextProps.position, relativePosition, nextProps.constraintLeft, nextProps.constraintRight, nextProps.constraintWidth, nextProps.state.amount)
    // const newerNextProps = Object.assign({}, nextProps, {relativePosition, percent})
    // this.setState(newerNextProps)
    // this.convertAmountToPercent(percent);
  }

  shouldComponentUpdate (nextProps, nextState){
    const test = (
      nextState.position !== this.state.position ||
      nextState.relativePosition !== this.state.relativePosition ||
      nextState.percent !== this.state.percent ||
      nextState.buttonWidth !== this.state.buttonWidth ||
      nextState.buttonHeight !== this.state.buttonHeight ||
      nextState.constraintLeft !== this.state.constraintLeft ||
      nextState.constraintRight !== this.state.constraintRight ||
      nextState.constraintWidth !== this.state.constraintWidth ||
        nextState.amount !==this.state.amount
    )
    return test;
  }

  componentDidUpdate (prevProps, prevState){
    // this.getSliderButtonRelativePositionAndPercent(this.refs.button,this.state.position)
  }


  render (){
    return (

      <Container

        onTouchCancel={this.mouseUp}
        onTouchEnd={this.mouseUp}
        onMouseDown={this.mouseClick}
        onMouseUp={this.mouseUp}
      >
        <SliderButton
          ref="button" {...this.state}
          onMouseMove={this.mouseMove}
          mouseDown={this.mouseDown}
          mouseUp={this.mouseUp}
          formatAmount={this.props.formatAmount}
        />

        <SliderProgress
          ref="progress" percent={this.state.percent}
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


export default Slider;
