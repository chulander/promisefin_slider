"use strict";
import React, {Component}from 'react';
import ReactDOM from 'react-dom';

import {Column, Title, Subtitle} from 're-bulma';


class SliderCard extends React.Component {
  constructor (props){
    super(props);
    // console.log('sliderProgress props', props)
    this.state={
      minAmount:props.minAmount,
      maxAmount:props.maxAmount
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps)
  }
  shouldComponentUpdate (nextProps, nextState){
    const test = (
      this.state.minAmount !== nextState.minAmount ||
      this.state.maxAmount !== nextState.maxAmount
    )
    console.log('RatesCard.shouldComponentUpdate', test);
    return test;
  }
  componentDidMount(){
    console.log('RatesCard.componentDidMount')
  }

  componentDidUpdate (prevProps, prevState){
    console.log('RatesCard.componentDidUpdate prevProps', prevProps);
    console.log('RatesCard.componentDidUpdate this.props', this.props);
    console.log('RatesCard.componentDidUpdate prevState', prevState);
    console.log('RatesCard.componentDidUpdate this.state', this.state);
  }

  render (){
    return (
      <Column style={{textAlign:'center'}} className="promisefin_card">
          <Title size={'is4'}>{this.props.title}</Title>
          <Subtitle size={'is4'}>{this.state.minAmount} - {this.state.maxAmount}</Subtitle>

      </Column>
    )
  }
}

SliderCard.defaultProps= {
  interestRateLow: 0.0631,
  interestRateHigh: 0.2666,
  originationFeeLow: 0.01,
  // originationFeeHigh: 0.06,
  // origination_fee_high: 0.05
}
SliderCard.propTypes={
  originationFeeHeight:React.PropTypes.oneOf([0.05, 0.06]).isRequired
}

export default SliderCard;