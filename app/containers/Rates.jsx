"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
// import LoanAmount from './LoanAmount.jsx';
import {Columns, Section} from 're-bulma';
import RatesCard from '../components/RatesCard';
import numeral from 'numeral';
class Rates extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      minInterestRate: props.minInterestRate,
      maxInterestRate: props.maxInterestRate,
      minOriginationFee: props.minOriginationFee,
      amount: props.amount
    }
    this.calculateMonthlyPayments = this.calculateMonthlyPayments.bind(this)
    this.calculateOriginationFees = this.calculateOriginationFees.bind(this)
  }



  calculateMonthlyPayments (amount){
    const _monthlyPaymentsNumerator = (interestRate, loanAmount)=>(interestRate / 12) * loanAmount;
    const _monthlyPaymentsDenominator = (interestRate)=> 1 - (Math.pow((1 + (interestRate / 12)), -36));
    const minMonthlyPayment = numeral(Math.round(_monthlyPaymentsNumerator(this.state.minInterestRate, amount) / _monthlyPaymentsDenominator(this.state.minInterestRate))).format('0,0[.]00');
    const maxMonthlyPayment = numeral(Math.round(_monthlyPaymentsNumerator(this.state.maxInterestRate, amount) / _monthlyPaymentsDenominator(this.state.maxInterestRate))).format('0,0[.]00');
    return {
      minMonthlyPayment:`$${minMonthlyPayment}`,
      maxMonthlyPayment:`$${maxMonthlyPayment}`
    }
  }

  calculateOriginationFees (amount){
    const _getMaxOriginationFee = function(loanAmount){
      let maxOriginationFee;
      if(loanAmount <= 6000){
        maxOriginationFee = 0.06;
      }
      else if(loanAmount >= 7000){
        maxOriginationFee = 0.05;
      }
      return maxOriginationFee;
    }

    const minOriginationFee = numeral(Math.floor(this.state.minOriginationFee * amount)).format('0,0[.]00');
    const maxOriginationFee = numeral(Math.floor(_getMaxOriginationFee(amount) * amount)).format('0,0[.]00');
    console.log('what is maxOriginationFee', _getMaxOriginationFee(amount))

    return {
      minOriginationFee:`$${minOriginationFee}`,
      maxOriginationFee:`$${maxOriginationFee}`
    }
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
    // console.log('Rates.componentDidMount this.props', this.props)
    // console.log('Rates.componentDidMount this.state', this.state)
  }

  handleResize (){
    // const bar = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
    // console.log('handleResize what is this progress bar ', bar)
    // this.constructor.updateRatesProgressDimensions.call(this);
  }

  shouldComponentUpdate (nextProps, nextState){
    console.log('Rates.shouldComponentUpdate nextProps', nextProps)
    console.log('Rates.shouldComponentUpdate this.props', this.props)
    console.log('Rates.shouldComponentUpdate nextState', nextState)
    console.log('Rates.shouldComponentUpdate this.state', this.state)
    const test = (
      nextState.amount !== this.state.amount
    )
    console.log('Rates.shouldComponentUpdate test', test)
    return test;
  }

  componentWillReceiveProps (nextProps){
    console.log('Rates.componentWillReceiveProps nextProps', nextProps)
    console.log('Rates.componentWillReceiveProps nextProps.amount', nextProps.amount)

    this.setState(nextProps);

  }

  componentDidUpdate (prevProps, prevState){
    // this.setState({maxOriginationFee: this.getMaxOriginationFee(this.state.amount)});
    console.log('Rates.componentDidUpdate prevProps', prevProps);
    console.log('Rates.componentDidUpdate this.props', this.props);
    console.log('Rates.componentDidUpdate prevState', prevState);
    console.log('Rates.componentDidUpdate this.state', this.state);
  }


  render (){
    // console.log('what is props inside rates', this.props);
    // console.log('what is state inside rates', this.state)
    const {minMonthlyPayment, maxMonthlyPayment} = this.calculateMonthlyPayments(this.state.amount)
    const {minOriginationFee, maxOriginationFee} = this.calculateOriginationFees(this.state.amount)

    console.log('what is minMonthlyPayment', minMonthlyPayment)
    console.log('what is maxMonthlyPayment', maxMonthlyPayment)
    return (

      <Columns>
        <RatesCard
          id={'payments'}
          title={'Monthly Payment:'}
          minAmount={minMonthlyPayment}
          maxAmount={maxMonthlyPayment}
          symbol={'<sup>&#x2020;</sup>'}
        />
        <RatesCard
          id={'fees'}
          title={'Fee at Origination:'}
          minAmount={minOriginationFee}
          maxAmount={maxOriginationFee}
          symbol={'<sup>&#x2020;</sup>'}
        />
        <RatesCard
          id={'fixedApr'}
          title={'Fixed APR:'}
          minAmount={'6.99%'}
          maxAmount={'29.99%'}
          symbol={'*'}
        />

      </Columns>



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


// const ratesCalculation = function ratesCalculation (loanAmount){
//
//   let keyLoanApplication = getKeyLoanApplication(loanAmount);
//
//   interestRateLow.innerHTML = numeral(Math.round(rateCalculationNominator(keyLoanApplication.interest_rate_low, loanAmount) / rateCalculationDenominator(keyLoanApplication.interest_rate_low))).format('0,0[.]00');
//   interestRateHigh.innerHTML = `${numeral(Math.round(rateCalculationNominator(keyLoanApplication.interest_rate_high, loanAmount) / rateCalculationDenominator(keyLoanApplication.interest_rate_high))).format('0,0[.]00')}<sup>&#x2020;</sup>`;
//   originationFeeLow.innerHTML = numeral(Math.floor(loanAmount * keyLoanApplication.origination_fee_low)).format('0,0[.]00');
//   originationFeeHigh.innerHTML = `${numeral(Math.floor(loanAmount * keyLoanApplication.origination_fee_high)).format('0,0[.]00')}<sup>&#x2020;</sup>`;
//
//   requested_loan_amount.value = loanAmount;
// };

Rates.defaultProps = {
  minInterestRate: 0.0631,
  maxInterestRate: 0.2666,
  minOriginationFee: 0.01,
  maxOriginationFee:0.06
}


export default Rates;
