"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
// import LoanAmount from './LoanAmount.jsx';
import {Progress, Button, Container} from 're-bulma';
import SliderButton from './SliderButton';
import SliderProgress from './SliderProgress';

class Slider extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      minAmount: props.minAmount,
      maxAmount: props.maxAmount,
      amount: props.amount,
      step: props.step,
      percent: props.percent,
      relativePosition: props.relativePosition,
      className: props.className
    }
    this.handleResize = this.handleResize.bind(this)


  }

  // update (e){
  //   const v = ReactDOM.findDOMNode(this.refs.loan).value;
  //
  //   console.log('what is the loan value', v);
  //   this.setState({
  //     amount: ReactDOM.findDOMNode(this.refs.loan).value
  //   })
  // }


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
    // console.log('Slider.shouldComponentUpdate nextProps', nextProps)
    // console.log('Slider.shouldComponentUpdate this.props', this.props)
    // console.log('Slider.shouldComponentUpdate nextState', nextState)
    // console.log('Slider.shouldComponentUpdate this.state', this.state)
    const test = (
      nextState.constraintWidth !== this.state.constraintWidth ||
      nextState.constraintLeft !== this.state.constraintLeft ||
      nextState.constraintRight !== this.state.constraintRight ||
      nextState.constraintLeft !== this.state.constraintLeft ||
      nextState.constraintRight !== this.state.constrainRightt ||
      nextState.constraintWidth !== this.state.constraintWidth
    )
    // console.log('Slider.shouldComponentUpdate test', test)
    return test;
  }

  componentWillReceiveProps (nextProps){
    // console.log('Slider.componentWillReceiveProps nextProps', nextProps)
    this.setState(nextProps)
  }

  componentDidUpdate (prevProps, prevState){
    // console.log('Slider.componentDidUpdate prevProps', prevProps);
    // console.log('Slider.componentDidUpdate this.props', this.props);
    // console.log('Slider.componentDidUpdate prevState', prevState);
    // console.log('Slider.componentDidUpdate this.state', this.state);
  }


  render (){
    return (
      <div>
        <SliderButton ref="button" {...this.state}
                      updateSlideButtonRelativePosition={this.constructor.updateSlideButtonRelativePosition.bind(this)}
        />
        <SliderProgress ref="progress" percent={this.state.percent}
                        updateSliderProgressDimensions={this.constructor.updateSliderProgressDimensions.bind(this)}></SliderProgress>
      </div>
      //   <div className="slider">
      //     <span>{this.state.amount}</span>
      //     <hr />
      //
      //     <br />
      //     <span>{this.state.minAmount}</span>
      //     {/*<LoanAmount minAmount={this.minAmount} maxAmount={this.maxAmount} value={this.amount} step={this.step} update={this.update}/>*/}
      //     <input
      //       type="range"
      //       ref="loan"
      //       min={this.state.minAmount}
      //       max={this.state.maxAmount}
      //       value={this.state.amount}
      //       step={this.state.step}
      //       onChange={this.update}
      //     />
      //     <span>{this.state.maxAmount}</span>
      //   </div>
    )
  }
}
//
Slider.defaultProps = {
  id: 'button',
  className: 'promisefin_slider__button',
  minAmount: 3000,
  maxAmount: 35000,
  amount: 15000,
  step: '1000',
  percent: 0.50
}

Slider.updateSliderProgressDimensions = function (sliderProgress){
  const sliderProgressElement = ReactDOM.findDOMNode(sliderProgress).getBoundingClientRect();
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
    relativePosition = this.state.constraintWidth * this.state.percent;
  }
  else if(targetPosition <= this.state.constraintLeft){
    relativePosition = 0;
    percent = 0;
  }
  else if(targetPosition >= this.state.constraintRight){
    relativePosition = this.state.constraintWidth - (targetWidth / 2)
    percent = 1;
  }
  else {
    relativePosition = targetPosition - (this.state.constraintRight - this.state.constraintWidth)
    percent = relativePosition / this.state.constraintWidth;
  }

  const updateObj = {
    relativePosition: relativePosition
  };
  if(percent){
    //console.log('this is what?', this);
    updateObj.amount = this.constructor.convertPercentToAmount.call(this, percent);
    updateObj.percent = percent
    // console.log('what is updateObj.amount', updateObj.amount);
  }
  this.setState(updateObj)

}
Slider.convertPercentToAmount = function (percent){
  console.log('convertPercentToAmount: percent', percent)
  const count = (this.state.maxAmount - this.state.minAmount + 1) / 1000;
  const unit = 100 / count; //should be about 3.333

  const unRoundedTotalUnits = (percent * 100) / unit;
  console.log('unroundedTotalUnits', unRoundedTotalUnits)
  const totalUnits = Math.round(unRoundedTotalUnits);
  console.log('totalUnits ', totalUnits)
  const amount = (unRoundedTotalUnits * 1000) + 2000

  console.log('what is amount', amount)
  return amount;
}
export default Slider;