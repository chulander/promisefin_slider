"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
// import LoanAmount from './LoanAmount.jsx';
import {Progress, Button, Container} from 're-bulma';
import SliderButton from './SliderButton';
import SliderProgress from './SliderProgress';

class Slider extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      minAmount: props.minAmount,
      maxAmount: props.maxAmount,
      amount: props.defaultAmount,
      step: props.step,
      percent:props.percent
    }
    this.handleResize = this.handleResize.bind(this)
    this.moveButton = this.moveButton.bind(this)

  }

  // update (e){
  //   const v = ReactDOM.findDOMNode(this.refs.loan).value;
  //
  //   console.log('what is the loan value', v);
  //   this.setState({
  //     amount: ReactDOM.findDOMNode(this.refs.loan).value
  //   })
  // }

  // onMouseDown (e){
  //   // only left mouse button
  //   if(e.button === 0 || (e.touches && e.touches.length)){
  //     const positionX = e.currentTarget.getBoundingClientRect();
  //     const pageX = this.getInputPositionX(e);
  //     console.log('onMouseDown: what is positionX', positionX);
  //     console.log('onMouseDown: what is pageX', pageX);
  //     this.setState(Object.assign(this.state,{
  //       dragging: true,
  //       relative: {
  //         x: pageX - positionX.left
  //       }
  //     }))
  //     e.stopPropagation()
  //     e.preventDefault()
  //   }
  // }
  //
  // onMouseUp (e){
  //   this.setState(Object.assign(this.state,{
  //     dragging: false
  //   }))
  //   e.stopPropagation()
  //   e.preventDefault()
  // }
  //
  // getInputPositionX (e){
  //   return e.pageX || e.touches[0].pageX;
  // }
  //
  // setNewPositionX (positionX){
  //   console.log('setNewPositionX: what is state before', this.state);
  //   console.log('setNewPositionX: what is positionX', positionX);
  //
  //
  //   positionX = (positionX <= this.state.position.x.constraints.left)
  //     ? this.state.position.x.constraints.left
  //     : (positionX >= this.state.position.x.constraints.right)
  //     ? this.state.position.x.constraints.right
  //     : positionX;
  //   console.log('setNewPositionX: what is positionX after', positionX);
  //   console.log('setNewPositionX: what is state after', this.state);
  //   //console.log('setNewPositionX: what is relative', this.state.relative.x);
  //   const newPositionX = positionX - this.state.relative.x;
  //   const newStateObj = {
  //     position: {
  //       x:{
  //         current: newPositionX
  //       }
  //     }
  //   }
  //   this.setState(Object.assign(this.state, newStateObj))
  // }
  //
  moveButton (target, targetPosition, targetWidth){
    let relativePosition;
    let percent;
    if (targetPosition <= this.state.constraints.left) {
      relativePosition = 0;
      percent=0;
    } else if(targetPosition >= this.state.constraints.right - targetWidth){
      relativePosition = this.state.constraints.width - targetWidth
      percent=100;
    } else {
      relativePosition = targetPosition - (this.state.constraints.right - this.state.constraints.width)
      percent = relativePosition / this.state.constraints.width;
    }
    ReactDOM.findDOMNode(target).style.left = `${relativePosition}px`
    console.log('what is status bar', this.refs.progress);
    this.setState({
      percent
    })

  }

  //
  // onMouseMove (e){
  //
  //   if(this.state.dragging){
  //     console.log('inside mousemove');
  //     console.log('inside mousemove: what is state', this.state);
  //     const inputPosition = this.getInputPositionX(e);
  //     console.log('what is inputPosition', inputPosition);
  //     this.setNewPositionX(inputPosition);
  //     e.stopPropagation()
  //     e.preventDefault()
  //   }
  // }

  componentDidMount (){
    window.addEventListener('resize', this.handleResize);
    this.constructor.updateConstraint.call(this);
  }

  handleResize (){
    const bar = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
    console.log('handleResize what is this progress bar ', bar)
    this.constructor.updateConstraint.call(this);
  }

  shouldComponentUpdate (nextProps, nextState){
    console.log('parent shouldupdate')
    return (
      !nextState.constraints ||
      !this.state.constraints ||
      nextState.constraints.width !== this.state.constraints.width ||
      nextState.constraints.left !== this.state.constraints.left ||
      nextState.constraints.right !== this.state.constraints.right
    )
  }

  componentDidUpdate (props, state){
    console.log('slider: inside componentDidUpdate')
    // console.log('what is props', props);
    // console.log('Slider: componentDidUpdate: what is state', state);
    // console.log('Slider: componentDidUpdate: what is props', props);
    // console.log('Slider: componentDidUpdate: what is this', this);

    // this.moveButton();
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

  //
  // componentWillUnmount (){
  //   document.removeEventListener('mousemove', this.onMouseMove)
  //   document.removeEventListener('mouseup', this.onMouseUp)
  //   document.removeEventListener('touchmove', this.onMouseMove);
  //   document.removeEventListener('touchend', this.onMouseUp);
  //   window.removeEventListener('resize', this.handleResize);
  // }

  render (){
    const props = Object.assign({}, this.props, {moveButton: this.moveButton});
    return (
      <div>

        <SliderButton ref="button" {...props}>Test</SliderButton>
        <SliderProgress ref="progress" {...props}></SliderProgress>

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
//
Slider.defaultProps = {
  id: 'button',
  className: 'promisefin_slider__button',
  minAmount: '3000',
  maxAmount: '35000',
  defaultAmount: '15000',
  step: '1000',
  percent:50
}

Slider.updateConstraint = function(){
  const progressBar = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
  this.setState({
    constraints: {
      left: progressBar.left,
      right: progressBar.right,
      width: progressBar.width
    }
  });
}
export default Slider;