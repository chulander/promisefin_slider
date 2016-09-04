"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
// import LoanAmount from './LoanAmount.jsx';
import {Columns, Section} from 're-bulma';
import SliderButton from './SliderButton';
import SliderProgress from './SliderProgress';
import SliderCard from './SliderCard';


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
        <Section>
          <SliderButton ref="button" {...this.state}
                        updateSlideButtonRelativePosition={this.constructor.updateSlideButtonRelativePosition.bind(this)}
          />
          <SliderProgress ref="progress" percent={this.state.percent}
                          updateSliderProgressDimensions={this.constructor.updateSliderProgressDimensions.bind(this)}></SliderProgress>
        </Section>
        <Section>
          <Columns>
            <SliderCard title={'Monthly Payment:'} />
            <SliderCard title={'Fee at Origination:'} />
            <SliderCard title={'Fixed APR:'} />
          </Columns>
        </Section>

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
  step: 1000,
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
    relativePosition = this.state.constraintWidth
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

  const availableUnits = ((this.state.maxAmount - this.state.minAmount) / this.state.step) + 1;
  const unit = 100 / availableUnits; //should be about 3.333
  const remainder = 100 - (availableUnits * unit);

  let unRoundedTotalUnits = (percent * 100) / unit;

  unRoundedTotalUnits = unRoundedTotalUnits + remainder;
  let amount = Math.round((unRoundedTotalUnits * this.state.step) / this.state.step) * this.state.step
  amount = amount + 2000;
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
var rateCalculationNominator = function (interestRate, loanAmount) {
  return ((interestRate / 12) * loanAmount);
};
var rateCalculationDenominator = function (interestRate) {
  var exp = Math.pow((1 + (interestRate / 12)), -36);
  return (1 - exp);
};
const ratesCalculation = function ratesCalculation(loanAmount) {
  const getKeyLoanApplication = function (loanAmount) {
    const keyLoanApplication = {
      interest_rate_low: 0.0631,
      interest_rate_high: 0.2666,
      origination_fee_low: 0.01,
    }
    if (loanAmount <= 6000) {
      return Object.assign(keyLoanApplication, {
        origination_fee_high: 0.06
      })
    }
    if (loanAmount >= 7000) {
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
