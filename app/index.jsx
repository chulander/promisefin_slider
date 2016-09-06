import React from 'react';
import ReactDOM from 'react-dom';
//import World from './components/World.jsx';
import Slider from './containers/Slider';
import Rates from './containers/Rates';
import {Container} from 're-bulma';
class CheckRates extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      amount: props.amount
    }
    this.updateAmount = this.updateAmount.bind(this)
  }



  updateAmount (amount){
    console.log('inside update amount', amount)
    this.setState({
      amount: amount
    })
  }

  render (){
    return (
      <Container className="promisefin_slider__container is-fluid">
        <Slider amount={this.state.amount} updateAmount={this.updateAmount} />
        <Rates amount={this.state.amount} updateAmount={this.updateAmount} />
      </Container>
    )
  }
}
CheckRates.defaultProps = {
  amount: 15000
}

ReactDOM.render(
  <CheckRates />,
  document.getElementById('app')
);
