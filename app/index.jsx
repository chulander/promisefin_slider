import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './containers/Slider';
import Rates from './containers/Rates';
import Restrictions from './containers/Restrictions';
import {Container} from 're-bulma';
import numeral from 'numeral';

class CheckRates extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      amount: props.amount
    }
    this.updateAmount = this.updateAmount.bind(this)
  }
  formatAmount(amount){
    return `${numeral(amount).format('0,0[.]00')}`
  }
  updateAmount (amount){
    this.setState({
      amount: amount
    })
  }
  componentDidMount(){
    console.log('checkyour rate mounted!')


  }
  render (){
    return (
      <Container className={this.props.className}>
        <Slider
          amount={this.state.amount}
          minAmount={this.props.minAmount}
          maxAmount={this.props.maxAmount}
          step={this.props.step}
          updateAmount={this.updateAmount}
          formatAmount={this.formatAmount}
        />
        <Restrictions
          minAmount={this.props.minAmount}
          restrictions={this.props.restrictions}
          formatAmount={this.formatAmount}
        />
        <br/>
        <Rates
          amount={this.state.amount}
          formatAmount={this.formatAmount}
        />
      </Container>
    )
  }
}
CheckRates.defaultProps = {
  amount: 15000,
  minAmount: 3000,
  maxAmount: 35000,
  step: 1000,
  restrictions:[
    {
      region:'GA',
      amount:3000
    },
    {
      region:'OH',
      amount:4000
    },
    {
      region:'MA',
      amount:7000
    }
  ],
  className:'promisefin_checkrate_container'
}

ReactDOM.render(
  <CheckRates />,
  document.getElementById('app')
);
