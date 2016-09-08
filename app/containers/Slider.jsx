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


    this.getAvailableUnits=this.getAvailableUnits.bind(this)
    this.getUnitWeight=this.getUnitWeight.bind(this)
    this.getAdjustedConstraintWidth=this.getAdjustedConstraintWidth.bind(this)
    this.getPositionRangeFromPercent=this.getPositionRangeFromPercent.bind(this)

    // Updater
    this.sliderButtonHandler=this.sliderButtonHandler.bind(this)

  }

  handleResize (){
    // get the dimensions
    console.log('RESIZING!!')
    const buttonDimensions = this.getSliderButtonDimensions();
    const progressDimensions = this.getSliderProgressDimensions();
    const percent = this.convertAmountToPercent(this.state.amount, this.getAvailableUnits())
    const relativePosition = this.getSliderButtonRelativePosition(undefined, progressDimensions.constraintLeft, progressDimensions.constraintRight, progressDimensions.constraintWidth, this.state.amount, buttonDimensions.buttonWidth)
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

  getSliderButtonPercent (targetPosition, relativePosition, constraintLeft, constraintRight, constraintWidth, amount, buttonWidth){
    if(!targetPosition && amount){
      console.log('getSliderButtonPercent 1')
      return this.convertAmountToPercent(amount, this.getAvailableUnits())
    }
    else if(targetPosition <= constraintLeft){
      console.log('getSliderButtonPercent 2')
      return 0;
    }
    else if(targetPosition > constraintRight - (buttonWidth-1)){
      console.log('getSliderButtonPercent 3')
      return 1;
    }
    else {
      console.log('getSliderButtonPercent 4')
      return relativePosition / (constraintWidth-buttonWidth);
    }
  }

  getSliderButtonRelativePosition (targetPosition, constraintLeft, constraintRight, constraintWidth, amount, buttonWidth){

    if(!targetPosition && amount){
      console.log('getSliderButtonRelativePosition: 1')
      const relativePosition = (constraintWidth -buttonWidth) * this.convertAmountToPercent(amount, this.getAvailableUnits());
      console.log('getSliderButtonRelativePosition: relativePosition', relativePosition)
      return relativePosition;
    }
    if(targetPosition <= constraintLeft){
      console.log('getSliderButtonRelativePosition: 2')
      console.log('getSliderButtonRelativePosition: relativePosition', 0)
      return 0;
    }
    else if(targetPosition  > constraintRight-(buttonWidth-1)){
      console.log('what is targetposition', targetPosition)
      console.log('what is constraingtRight', constraintRight)
      console.log('what is buttonWidth', buttonWidth)
      console.log('getSliderButtonRelativePosition: 3')
      const relativePosition = constraintWidth - buttonWidth ;
      console.log('getSliderButtonRelativePosition: relativePosition', relativePosition)
      return relativePosition;
    }
    else {
      console.log('getSliderButtonRelativePosition: 4')
      const relativePosition = targetPosition - (constraintRight - constraintWidth)
      console.log('getSliderButtonRelativePosition: relativePosition', relativePosition)
      return relativePosition
    }
  }

  getAvailableUnits (){
    const availableUnits = ((this.props.maxAmount - this.props.minAmount) / this.props.step) + 1;
    return availableUnits;
  }
  getUnitWeight(availableUnits){
    const unit = 100/availableUnits;
    const remainder = 100-(availableUnits * unit);
    const unitWeight = unit + (remainder/availableUnits);
    return unitWeight;
  }
  getAdjustedConstraintWidth(constraintWidth, buttonWidth) {
    return constraintWidth - buttonWidth;
  }
  getPositionRangeFromPercent(percent, unitWeight, adjustedConstraintWidth){
    const unitPositionRange = adjustedConstraintWidth/unitWeight;
    return percent * unitPositionRange;
  }


  convertAmountToPercent (amount, availableUnits){
    const unitsUsed = availableUnits - ((this.props.maxAmount - amount) / this.props.step);
    const percent = unitsUsed / availableUnits
    console.log('convertAmountToPercent: what is percent', percent)
    return percent;
  }

  convertPercentToAmount (percent, unitWeight){

    const unRoundedTotalUnits = (percent * 100) / unitWeight;

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
    const relativePosition = this.getSliderButtonRelativePosition(position, this.state.constraintLeft, this.state.constraintRight, this.state.constraintWidth, this.state.amount, this.state.buttonWidth)
    const percent = this.getSliderButtonPercent(position, relativePosition, this.state.constraintLeft, this.state.constraintRight, this.state.constraintWidth, this.state.amount, this.state.buttonWidth)
    // const amount = this.convertPercentToAmount(percent, this.state.buttonWidth/this.state.constraintWidth)
    const unitWeight = this.getUnitWeight(this.getAvailableUnits());
    const unitPositionRange = this.getPositionRangeFromPercent(percent,unitWeight,this.getAdjustedConstraintWidth(this.state.constraintWidth,  this.state.buttonWidth))
    console.log('what is unitPositionRange', unitPositionRange);
    const amount = this.convertPercentToAmount(percent,unitWeight);
    console.log('what is amount', amount);
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
    window.addEventListener('touchmove', this.mouseMove)
    window.addEventListener('touchend', this.mouseUp)
    // window.addEventListener('resize', function (){
    // })
    const buttonDimensions = this.getSliderButtonDimensions();
    const progressDimensions = this.getSliderProgressDimensions();
    const percent = this.convertAmountToPercent(this.state.amount, this.getAvailableUnits())
    const relativePosition = this.getSliderButtonRelativePosition(undefined, progressDimensions.constraintLeft, progressDimensions.constraintRight, progressDimensions.constraintWidth, this.state.amount, buttonDimensions.buttonWidth)
    const newProps = Object.assign({dragging: false}, buttonDimensions, progressDimensions, {percent, relativePosition})
    this.setState(newProps);
  }

  componentWillUnmount (){
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
    window.removeEventListener('touchmove', this.mouseMove)
    window.removeEventListener('touchend', this.mouseUp)
  }

  componentWillReceiveProps (nextProps){
    this.setState(nextProps)
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

  }


  render (){
    return (

      <Container

        onTouchCancel={this.mouseUp}
        onTouchEnd={this.mouseUp}
        onMouseDown={this.mouseClick}
        onTouchStart={this.mouseClick}
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
