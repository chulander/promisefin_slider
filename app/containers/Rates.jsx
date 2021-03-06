"use strict";
import React, {Component} from 'react';
import {Columns, Section} from 're-bulma';
import RateCard from '../components/RateCard';

class Rates extends Component {
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
    this.getRateTypes = this.getRateTypes.bind(this)
  }

  getRateTypes (props){
    const {minMonthlyPayment, maxMonthlyPayment} = this.calculateMonthlyPayments(this.state.amount)
    const {minOriginationFee, maxOriginationFee} = this.calculateOriginationFees(this.state.amount)
    return props.rateTypes.map(item=>{
      if(item.id === 'payments'){
        return Object.assign(item, {
          minAmount: minMonthlyPayment,
          maxAmount: maxMonthlyPayment,
        })
      }
      else if(item.id === 'fees'){
        return Object.assign(item, {
          minAmount: minOriginationFee,
          maxAmount: maxOriginationFee,
        })
      }
      else if(item.id === 'fixedApr'){
        return item
      }
    })
  }

  calculateMonthlyPayments (amount){
    const _monthlyPaymentsNumerator = (interestRate, loanAmount)=>(interestRate / 12) * loanAmount;
    const _monthlyPaymentsDenominator = (interestRate)=> 1 - (Math.pow((1 + (interestRate / 12)), -36));
    const minMonthlyPayment = Math.round(_monthlyPaymentsNumerator(this.state.minInterestRate, amount) / _monthlyPaymentsDenominator(this.state.minInterestRate));
    const maxMonthlyPayment = Math.round(_monthlyPaymentsNumerator(this.state.maxInterestRate, amount) / _monthlyPaymentsDenominator(this.state.maxInterestRate));
    return {
      minMonthlyPayment,
      maxMonthlyPayment
    }
  }

  calculateOriginationFees (amount){
    const _getMaxOriginationFee = function (loanAmount){
      let maxOriginationFee;
      if(loanAmount <= 6000){
        maxOriginationFee = 0.06;
      }
      else if(loanAmount >= 7000){
        maxOriginationFee = 0.05;
      }
      return maxOriginationFee;
    }

    const minOriginationFee = Math.floor(this.state.minOriginationFee * amount);
    const maxOriginationFee = Math.floor(_getMaxOriginationFee(amount) * amount);

    return {
      minOriginationFee,
      maxOriginationFee
    }
  }

  shouldComponentUpdate (nextProps, nextState){
    const test = (
      nextState.amount !== this.state.amount
    )
    return test;
  }

  componentWillReceiveProps (nextProps){
    this.setState(nextProps);
  }

  render (){
    return (
      <Columns
        className={'is-hidden-mobile'}
        responsive={'isTablet'}>
        {this.getRateTypes(this.props).map((item)=>{
          return <RateCard
            key={item.id}
            className={item.class}
            formatAmount={this.props.formatAmount}
            {...item}
          />
        })}
      </Columns>
    )
  }
}

Rates.defaultProps = {
  minInterestRate: 0.0631,
  maxInterestRate: 0.2666,
  minOriginationFee: 0.01,
  maxOriginationFee: 0.06,
  rateTypes: [{
    id: 'payments',
    rateType: 'dynamic',
    title: 'Monthly Payment:',
    symbol: '<sup>&#x2020;</sup>',
    width: '31%',
    class: 'promisefin_ratecard--left'
  }, {
    id: 'fees',
    rateType: 'dynamic',
    title: 'Fee at Origination:',
    symbol: '<sup>&#x2020;</sup>',
    width: '33%',
    class: 'promisefin_ratecard--center'
  }, {
    id: 'fixedApr',
    rateType: 'static',
    title: 'Fixed APR:',
    symbol: '*',
    width: '31%',
    class: 'promisefin_ratecard--right',
    minAmount: '6.99%',
    maxAmount: '29.99%'
  }]
}

export default Rates;
