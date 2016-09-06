import React from 'react';
import ReactDOM from 'react-dom';
//import World from './components/World.jsx';
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
    return `$${numeral(amount).format('0,0[.]00')}`
  }
  updateAmount (amount){
    this.setState({
      amount: amount
    })
  }

  render (){
    return (
      <Container className={this.props.className}>
        <Slider
          amount={this.state.amount}
          updateAmount={this.updateAmount}
          formatAmount={this.formatAmount}
        />
        <Restrictions
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
  restrictions:[
    {
      state:'GA',
      amount:3000
    },
    {
      state:'OH',
      amount:4000
    },
    {
      state:'MA',
      amount:7000
    }
  ],
  className:'promisefin_checkrate_container'
}

ReactDOM.render(
  <CheckRates />,
  document.getElementById('app')
);
