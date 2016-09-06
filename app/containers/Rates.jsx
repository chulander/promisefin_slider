"use strict";
import React from 'react';
import {Columns} from 're-bulma';
import RateCard from '../components/RateCard';
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
    const {minMonthlyPayment, maxMonthlyPayment} = this.calculateMonthlyPayments(this.state.amount)
    const {minOriginationFee, maxOriginationFee} = this.calculateOriginationFees(this.state.amount)

    return (

      <Columns>
        <RateCard
          id={'payments'}
          title={'Monthly Payment:'}
          minAmount={minMonthlyPayment}
          maxAmount={maxMonthlyPayment}
          symbol={'<sup>&#x2020;</sup>'}
        />
        <RateCard
          id={'fees'}
          title={'Fee at Origination:'}
          minAmount={minOriginationFee}
          maxAmount={maxOriginationFee}
          symbol={'<sup>&#x2020;</sup>'}
        />
        <RateCard
          id={'fixedApr'}
          title={'Fixed APR:'}
          minAmount={'6.99%'}
          maxAmount={'29.99%'}
          symbol={'*'}
        />
      </Columns>
    )
  }
}

Rates.defaultProps = {
  minInterestRate: 0.0631,
  maxInterestRate: 0.2666,
  minOriginationFee: 0.01,
  maxOriginationFee:0.06
}


export default Rates;
