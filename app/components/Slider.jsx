"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
// import LoanAmount from './LoanAmount.jsx';
import {Progress, Container, Button} from 're-bulma';

class Slider extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      minAmount: props.minAmount,
      maxAmount: props.maxAmount,
      amount: props.defaultAmount,
      step: props.step,
      dragging: false,
      pos: {
        x: 0,
        y: 0
      },
      maxPositionX: {
        left: 0,
        right: 0,
      },
      rel:{
        x:0,
        y:0
      }
    }
    this.update = this.update.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.handleResize = this.handleResize.bind(this)
    // this.touchstart = this.touchstart.bind(this)
    // this.touchmove = this.touchmove.bind(this)
    // this.touchend = this.touchend.bind(this)
  }

  update (e){
    const v = ReactDOM.findDOMNode(this.refs.loan).value;

    console.log('what is the loan value', v);
    this.setState({
      amount: ReactDOM.findDOMNode(this.refs.loan).value
    })
  }

  onMouseDown (e){
    // only left mouse button
    console.log('what is e', e.touches[0].pageX)
    if(e.button === 0 || (e.touches && e.touches.length)){
      const pos = e.currentTarget.getBoundingClientRect();
      console.log('mouseDown :What is pos', pos.left);

      const pageX = e.pageX || e.touches[0].pageX
      console.log('mouseDown: what is pageX', pageX)
      this.setState({
        dragging: true,
        rel: {
          x: pageX - pos.left,
          y: e.pageY - pos.top
        }
      })

      console.log('mouseDown: what is relX', (this.state.rel) ? this.state.rel.x : null);
      e.stopPropagation()
      e.preventDefault()
    }
  }

  onMouseUp (e){
    this.setState({
      dragging: false
    })
    e.stopPropagation()
    e.preventDefault()
  }

  onMouseMove (e){
    if(this.state.dragging){
      const pageX = e.pageX || e.touches[0].pageX
      const isOutOfLeftBound = (pageX <= this.state.maxPositionX.left) ? true : false;
      const isOutOfRightBound = (pageX >= this.state.maxPositionX.right) ? true : false;
      let modifiedX;
      if(isOutOfLeftBound) {
        modifiedX= this.state.maxPositionX.left;
      } else if(isOutOfRightBound){
        modifiedX=this.state.maxPositionX.right;
      } else {
        modifiedX=pageX;
      }
      this.setState({
        pos: {
          x: (modifiedX - this.state.rel.x),
          y: e.pageY - this.state.rel.y
        }
      })


      const newPosition = this.state.pos.x;
      const modifiedPosition = newPosition - this.state.maxPositionX.left;
      ReactDOM.findDOMNode(this.refs.button).style.left =`${modifiedPosition}px`;
      e.stopPropagation()
      e.preventDefault()
    }
  }

  componentDidMount (){
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('touchmove', this.onMouseMove);
    document.addEventListener('touchend', this.onMouseUp);
    window.addEventListener('resize', this.handleResize);
    const button = this.refs.button;
    ReactDOM.findDOMNode(button).addEventListener('mousedown', this.onMouseDown)
    ReactDOM.findDOMNode(button).addEventListener('touchstart', this.onMouseDown)
    // ReactDOM.findDOMNode(button).addEventListener('mousedown', this.onMouseDown);
    const progressBar = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
    this.setState({
      maxPositionX: {
        left: progressBar.left,
        right: progressBar.right
      }
    })
  }

  handleResize (e){
    const progressBar = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
    this.setState({
      maxPositionX: {
        left: progressBar.left,
        right: progressBar.right
      }
    })
    console.log("what is resize button", ReactDOM.findDOMNode(this.refs.button).getBoundingClientRect());

  }

  // componentDidUpdate (props, state){
  //   if(this.state.dragging && !state.dragging){
  //     document.addEventListener('mousemove', this.onMouseMove)
  //     document.addEventListener('mouseup', this.onMouseUp)
  //     document.addEventListener('touchmove', this.onMouseMove);
  //     document.addEventListener('touchend', this.onMouseUp);
  //   }
  //   else if(!this.state.dragging && state.dragging){
  //     document.removeEventListener('mousemove', this.onMouseMove)
  //     document.removeEventListener('mouseup', this.onMouseUp)
  //     document.removeEventListener('touchmove', this.onMouseMove);
  //     document.removeEventListener('touchend', this.onMouseUp);
  //   }
  // }
  componentWillUnmount(){
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('touchmove', this.onMouseMove);
    document.removeEventListener('touchend', this.onMouseUp);
    window.removeEventListener('resize', this.handleResize);
  }

  render (){
    return (
      <div>
        <Container ref="container">
          <Button ref="button" className="promisefin_slider__button">Test</Button>
          {/*<Progress value="45" max="100" style={{marginBottom: '5px'}} />*/}
          <Progress ref="progress" color="isPrimary" size="isLarge" value="15" max="100" style={{marginBottom: '5px'}} />
        </Container>

      </div>
      //   <div className="slider">
      //     <span>{this.state.amount}</span>
      //     <hr />
      //
      //     <br />
      //     <span>{this.state.minAmount}</span>
      //     {/*<LoanAmount minAmount={this.minAmount} maxAmount={this.maxAmount} value={this.amount} step={this.step} update={this.update}/>*/}
      //     <input
      //       type="range"
      //       ref="loan"
      //       min={this.state.minAmount}
      //       max={this.state.maxAmount}
      //       value={this.state.amount}
      //       step={this.state.step}
      //       onChange={this.update}
      //     />
      //     <span>{this.state.maxAmount}</span>
      //   </div>
    )
  }
}
;

Slider.defaultProps = {
  minAmount: '3000',
  maxAmount: '35000',
  defaultAmount: '15000',
  step: '1000'
}
export default Slider;