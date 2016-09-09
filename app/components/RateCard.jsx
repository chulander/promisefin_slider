"use strict";
import React, {Component, PropTypes}from 'react';
import {Column, Title, Subtitle} from 're-bulma';

class SliderCard extends Component {
  constructor (props){
    super(props);
    this.state = {
      minAmount: props.minAmount,
      maxAmount: props.maxAmount,
      rateType: props.rateType
    }
    this.formatAmount = props.formatAmount.bind(this)
    this.getRangeAmount = this.getRangeAmount.bind(this)
  }

  getRangeAmount (){
    if(this.state.rateType === 'dynamic'){
      return `$${this.formatAmount(this.state.minAmount)} - $${this.formatAmount(this.state.maxAmount)}`;
    }
    else {
      return `$${this.state.minAmount} - $${this.state.maxAmount}`;
    }
  }

  componentWillReceiveProps (nextProps){
    this.setState(nextProps)
  }

  shouldComponentUpdate (nextProps, nextState){
    const test = (
      nextState.minAmount !== this.state.minAmount ||
      nextState.maxAmount !== this.state.maxAmount
    )
    return test;
  }

  render (){
    const className = (this.props.className) ? `promisefin_ratecard ${this.props.className}` : 'promisefin_ratecard';
    const style=Object.assign({textAlign: 'center'}, {width: this.props.width});
    return (
      <Column size={'is4'} style={style} className={className}>
        <Title size={'is5'} className='promisefin_ratecard__title'>{this.props.title}</Title>
        <Subtitle className='promsefin_ratecard__amount'>{this.getRangeAmount()}</Subtitle>
      </Column>
    )
  }
}

SliderCard.PropTypes = {
  minAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  formatAmount: PropTypes.func.isRequired
}

export default SliderCard