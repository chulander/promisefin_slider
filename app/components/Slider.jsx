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
        x: 0
      },
      maxPositionX: {
        left: 0,
        right: 0,
      },
      rel:{
        x:0
      }
    }
    this.update = this.update.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.getInputPositionX=this.getInputPositionX.bind(this)
    this.setNewPositionX = this.setNewPositionX.bind(this)
    this.moveButton=this.moveButton.bind(this)
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
    if(e.button === 0 || (e.touches && e.touches.length)){
      const position = e.currentTarget.getBoundingClientRect();
      const pageX = this.getInputPositionX(e);

      this.setState({
        dragging: true,
        rel: {
          x: pageX - position.left
        }
      })
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
  getInputPositionX(e){
    return e.pageX || e.touches[0].pageX;
  }
  setNewPositionX(position){
    position = (position <= this.state.maxPositionX.left)
      ? this.state.maxPositionX.left
      : (position >= this.state.maxPositionX.right)
      ? this.state.maxPositionX.right
      : position;
    const newPosition = position - this.state.rel.x;
    this.setState({
      pos: {
        x: newPosition
      }
    })
    return newPosition;
  }
  moveButton(){
    const newPosition = this.state.pos.x - this.state.maxPositionX.left;
    console.log('moveButton: what is newPosition', newPosition)
    ReactDOM.findDOMNode(this.refs.button).style.left = `${newPosition}px`
  }
  onMouseMove (e){
    if(this.state.dragging){
      this.setNewPositionX(this.getInputPositionX(e));
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
    ReactDOM.findDOMNode(this.refs.button).addEventListener('mousedown', this.onMouseDown)
    ReactDOM.findDOMNode(this.refs.button).addEventListener('touchstart', this.onMouseDown)
    const progressBar = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
    this.setState({
      maxPositionX: {
        left: progressBar.left,
        right: progressBar.right
      }
    })
    this.setState({
      pos: {
        x: progressBar.left
      }
    })
    this.moveButton();
  }
  handleResize (e){
    const progressBar = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
    console.log('handleResize: old Left', this.state.maxPositionX.left);
    console.log('handleResize: new Left', progressBar.left);

    console.log('handleResize: old right', this.state.maxPositionX.right);
    console.log('handleResize: new right', progressBar.right);
    // const progressBarDelta = Math.abs(progressBar.left - this.state.max);
    this.setState({
      maxPositionX: {
        left: progressBar.left,
        right: progressBar.right
      }
    })
    // console.log('handleResize: new Left', this.state.maxPositionX.left);
    // console.log('handleResize: new right', this.state.maxPositionX.right);
    // console.log('handleResize: distance', progressBar.left - this.state.pos.left);
    this.setState({
      rel: {
        x: progressBar.left - this.state.pos.left
      }
    })
    const button = ReactDOM.findDOMNode(this.refs.button).getBoundingClientRect();
    this.setNewPositionX(button)

    // console.log("what is resize button", progressBar);

  }
  shouldComponentUpdate(nextProps, nextState){
    return (nextState.pos.x !== this.state.pos.x || nextState.maxPositionX.left !== this.state.maxPositionX.left || nextState.maxPositionX.right !== this.state.maxPositionX.right)
  }
  componentDidUpdate (props, state){
    console.log('updated!!!')
    console.log('what is props', props);
    console.log('what is state', state);

    this.moveButton();
    // if(this.state.dragging && !state.dragging){
    //   document.addEventListener('mousemove', this.onMouseMove)
    //   document.addEventListener('mouseup', this.onMouseUp)
    //   document.addEventListener('touchmove', this.onMouseMove);
    //   document.addEventListener('touchend', this.onMouseUp);
    // }
    // else if(!this.state.dragging && state.dragging){
    //   document.removeEventListener('mousemove', this.onMouseMove)
    //   document.removeEventListener('mouseup', this.onMouseUp)
    //   document.removeEventListener('touchmove', this.onMouseMove);
    //   document.removeEventListener('touchend', this.onMouseUp);
    // }
  }
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
          <Progress ref="progress" color="isPrimary" size="isSmall" value="15" max="100" style={{marginBottom: '5px'}} />
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