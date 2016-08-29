"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       amount: 15000,
//     }
//     this.update = this.update.bind(this)
//   }
//   update(e) {
//     this.setState({amount: e.target.value})
//   }
//
//   render() {
//     return (
//       <div>
//         {this.state.amount}
//         <hr />
//         <Slider update={this.update} />
//         {/*<Slider update={this.update} />*/}
//         {/*<Slider update={this.update} />*/}
//
//       </div>
//     )
//   }
// }

class App extends React.Component {
  constructor (){
    super();
    this.state = {
      red: 0,
      green: 0,
      blue: 0,
    }
    this.update = this.update.bind(this)
  }

  update (e){
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
      green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
      blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value,
    })
  }

  render (){
    return (
      <div>
        <Slider ref="red" update={this.update}/>
        {this.state.red}
        <br />
        <Slider ref="green" update={this.update}/>
        {this.state.green}
        <br />
        <Slider ref="blue" update={this.update}/>
        {this.state.blue}
        <br />
      </div>
    )
  }
}
class Slider extends React.Component {
  render (){
    return (
      <div>
        <input ref="inp" type="range"
               min="0"
               max="255"
               onChange={this.props.update}/>
      </div>
    )
  }
}
// Slider.defaultProps = {
//   lowAmount: 3000,
//   highAmount: 35000
// }
// class Slider extends React.Component{
//   render(){
//     return (
//       <div>
//         <input type="range"
//                min={this.lowAmount}
//                max={this.highAmount}
//                onChange={this.props.update} />
//         <h1>{props.txt}</h1>
//       </div>
//     )
//   }
// }
// Slider.defaultProps = {
//   lowAmount: 3000,
//   highAmount: 35000
// }
App.propTypes = {
  txt: React.PropTypes.string
}


const Widget = (props) =>{
  return (
    <div>
      <input type="text"
             onChange={props.update}/>
      <h1>{props.txt}</h1>
    </div>
  );
}

ReactDOM.render(
  <App txt="testing"/>,
  document.getElementById('app')
)
