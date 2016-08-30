"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
// import LoanAmount from './LoanAmount.jsx';

class Slider extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      minAmount: props.minAmount,
      maxAmount: props.maxAmount,
      amount: props.defaultAmount,
      step: props.step
    }
    this.update = this.update.bind(this)
  }
  update (e){
    const v = ReactDOM.findDOMNode(this.refs.loan).value;

    console.log('what is the loan value', v);
    this.setState({
      amount: ReactDOM.findDOMNode(this.refs.loan).value
    })
  }

  render (){
    return (
      <div className="slider">
        <span>{this.state.amount}</span>
        <hr />

        <br />
        <span>{this.state.minAmount}</span>
        {/*<LoanAmount minAmount={this.minAmount} maxAmount={this.maxAmount} value={this.amount} step={this.step} update={this.update}/>*/}
        <input
          type="range"
          ref="loan"
          min={this.state.minAmount}
          max={this.state.maxAmount}
          value={this.state.amount}
          step={this.state.step}
          onChange={this.update}
        />
        <span>{this.state.maxAmount}</span>
      </div>
    )
  }
};

Slider.defaultProps = {
  minAmount: '3000',
  maxAmount: '35000',
  defaultAmount: '15000',
  step:'1000'
}
export default Slider;