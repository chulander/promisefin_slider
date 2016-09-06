import React, {Component, PropTypes} from 'react';
import {Level, LevelLeft, LevelRight, LevelItem} from 're-bulma';

class SliderProgressAmounts extends Component {
  constructor (props){
    super(props);
    this.state = {
      minAmount: props.minAmount,
      maxAmount: props.maxAmount
    }
    this.formatAmount = props.formatAmount.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState){
    console.log('SliderAmountLimits.shouldComponentUpdate: this.props', this.props)
    console.log('SliderAmountLimits.shouldComponentUpdate: nextProps', nextProps)
    const test = (
      nextProps.minAmount !== this.props.minAmount ||
      nextProps.maxAmount !== this.props.maxAmount
    )
    console.log('SliderAmountLimits.shouldComponentUpdate', test);
    return test;
  }

  render (){
    return (
      <Level>
        <LevelLeft>
          <LevelItem>
            <p>{this.formatAmount(this.props.minAmount)}</p>
          </LevelItem>
        </LevelLeft>
        <LevelRight>
          <LevelItem>
            <p>{this.formatAmount(this.props.maxAmount)}</p>
          </LevelItem>
        </LevelRight>
      </Level>
    )
  }
}
SliderProgressAmounts.propTypes={
  minAmount:PropTypes.number.isRequired,
  maxAmount:PropTypes.number.isRequired,
  formatAmount:PropTypes.func.isRequired
}

export default SliderProgressAmounts