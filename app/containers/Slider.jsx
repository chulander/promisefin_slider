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
      // const inputPosition = e.currentTarget.getBoundingClientRect();
      // const pageX = this.getInputPositionX(e);
      // console.log('mouseDown: what is inputPosition', inputPosition);
      // console.log('mouseDown: what is getInputPositionX', pageX);
      this.setState({
        dragging: true,
        // relative: {
        //   x: pageX - inputPosition.left
        // }
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
      //e.persist()

      // console.log('inside mousemove');
      // console.log('inside mousemove: what is state', this.state);
      const inputPosition = this.getInputPositionX(e);
      // console.log('what is inputPosition', inputPosition);
      this.setPosition(inputPosition);
      // console.log('inside mousemove: what is post-state', this.state);
      e.stopPropagation()
      e.preventDefault()
    }
  }

  mouseClick (e){
    const inputPosition = this.getInputPositionX(e);
    // console.log('what is inputPosition', inputPosition);
    this.setPosition(inputPosition);
    // console.log('inside mousemove: what is post-state', this.state);
    e.stopPropagation()
    e.preventDefault()
  }

  deBounce (func, wait){
    console.log('insidedeBounce')
    let timeout;
    return ()=>{
      console.log('what is func', func)
      console.log('what is wait', wait)
      clearTimeout(timeout);
      timeout = setTimeout(function (){
        timeout = null;
        func.call()
      }, wait);

    };
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
    console.log('Slider.updateSliderButtonRelativePosition 1')
    percent = this.constructor.convertAmountToPercent.call(this, this.state.amount)
    relativePosition = this.state.constraintWidth * percent;
  }
  else if(targetPosition <= this.state.constraintLeft){
    console.log('Slider.updateSliderButtonRelativePosition 2')
    relativePosition = 0;
    percent = 0;
  }
  else if(targetPosition >= this.state.constraintRight){
    console.log('Slider.updateSliderButtonRelativePosition 3')
    relativePosition = this.state.constraintWidth
    percent = 1;
  }
  else {
    console.log("targetWidth is ", targetWidth)
    console.log('Slider.updateSliderButtonRelativePosition 4')
    relativePosition = targetPosition - (this.state.constraintRight - this.state.constraintWidth)
    percent = relativePosition / this.state.constraintWidth;
  }
  const amount = this.constructor.convertPercentToAmount.call(this,percent);
  console.log('what is amount', amount)
  this.props.updateAmount(amount)
  this.setState({
    relativePosition: relativePosition,
    // amount: this.constructor.convertPercentToAmount.call(this,percent)),
    percent: percent
  })

}
Slider.convertAmountToPercent = function (amount){
  const totalUnits = ((this.state.maxAmount - this.state.minAmount) / this.state.step) + 1;
  console.log('what is totalUnits', totalUnits)
  // const availableUnits = ((this.state.maxAmount - this.state.minAmount) / this.state.step) + 1;
  const amountUnitUsage = totalUnits - ((this.state.maxAmount - amount) / this.state.step);

  console.log('what is availableunits', amountUnitUsage)
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

// var setup_loan_size_slider = function () {
//   window.$('#slider').slider({
//     value: 3000,
//     range: 'min',
//     orientation: 'horizontal',
//     min: 3000,
//     max: 35000,
//     step: 100,
//     create: function ( /*event, ui*/ ) {
//       window.$('.ui-slider-handle').append('<div id="sliderValue">$3,000</div>');
//       var val = 3000;
//       var timer = setInterval(function () {
//         if (val <= 15000) {
//           window.$('#slider').slider('value', val);
//           window.$('#sliderValue').html('$' + val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
//           val += 100;
//         }
//         else {
//           clearInterval(timer);
//           window.$('#slider').slider('option', 'step', 1000);
//         }
//       }, 6);
//
//       ratesCalculation(15000);
//     },
//     slide: function (event, ui) {
//       window.$('#sliderValue').html('$' + ui.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
//
//       ratesCalculation(ui.value);
//     }
//   });
// };
var rateCalculationNominator = function (interestRate, loanAmount){
  return ((interestRate / 12) * loanAmount);
};
var rateCalculationDenominator = function (interestRate){
  var exp = Math.pow((1 + (interestRate / 12)), -36);
  return (1 - exp);
};
const ratesCalculation = function ratesCalculation (loanAmount){
  const getKeyLoanApplication = function (loanAmount){
    const keyLoanApplication = {
      interest_rate_low: 0.0631,
      interest_rate_high: 0.2666,
      origination_fee_low: 0.01,
    }
    if(loanAmount <= 6000){
      return Object.assign(keyLoanApplication, {
        origination_fee_high: 0.06
      })
    }
    if(loanAmount >= 7000){
      return Object.assign(keyLoanApplication, {
        origination_fee_high: 0.05
      })
    }
  };
  let keyLoanApplication = getKeyLoanApplication(loanAmount);

  interestRateLow.innerHTML = numeral(Math.round(rateCalculationNominator(keyLoanApplication.interest_rate_low, loanAmount) / rateCalculationDenominator(keyLoanApplication.interest_rate_low))).format('0,0[.]00');
  interestRateHigh.innerHTML = `${numeral(Math.round(rateCalculationNominator(keyLoanApplication.interest_rate_high, loanAmount) / rateCalculationDenominator(keyLoanApplication.interest_rate_high))).format('0,0[.]00')}<sup>&#x2020;</sup>`;
  originationFeeLow.innerHTML = numeral(Math.floor(loanAmount * keyLoanApplication.origination_fee_low)).format('0,0[.]00');
  originationFeeHigh.innerHTML = `${numeral(Math.floor(loanAmount * keyLoanApplication.origination_fee_high)).format('0,0[.]00')}<sup>&#x2020;</sup>`;

  requested_loan_amount.value = loanAmount;
};


export default Slider;
