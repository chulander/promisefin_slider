"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor (){
    super();
    this.state = {
      minLoanAmount: 3000,
      maxLoanAmount: 35000,
      loanAmount: 15000
    }
    this.update = this.update.bind(this)
  }

  update (e){
    console.log('what is loanAmount',ReactDOM.findDOMNode(this.refs.loan.refs.inp).value);
    this.setState({
      loanAmount: ReactDOM.findDOMNode(this.refs.loan.refs.inp).value
    })
  }

  render (){
    return (
      <div>
        <hr/>
        {this.state.loanAmount}
        <br />
        <span>{this.state.minLoanAmount}</span>
        <Slider ref="loan" update={this.update}/>
        <span>{this.state.maxLoanAmount}</span>
      </div>
    )
  }
}
class Slider extends React.Component {
  render (){
    return (
      <div>
        <input ref="inp" type="range"
               min={this.props.minLoanAmount}
               max={this.props.maxLoanAmount}
               onChange={this.props.update}/>
      </div>
    )
  }
}


App.propTypes = {
  loanAmount: React.PropTypes.number,
  minLoanAmount: React.PropTypes.number,
  maxLoanAmount: React.PropTypes.number
}

ReactDOM.render(
  <App txt="testing"/>,
  document.getElementById('app')
)
