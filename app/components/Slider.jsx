"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
// import LoanAmount from './LoanAmount.jsx';
import {Progress, Button, Container} from 're-bulma';
import SliderButton from './SliderButton';

class Slider extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      minAmount: props.minAmount,
      maxAmount: props.maxAmount,
      amount: props.defaultAmount,
      step: props.step
    }
    // this.update = this.update.bind(this)
    // this.onMouseMove = this.onMouseMove.bind(this)
    // this.onMouseDown = this.onMouseDown.bind(this)
    // this.onMouseUp = this.onMouseUp.bind(this)
    this.handleResize = this.handleResize.bind(this)
    // this.getInputPositionX = this.getInputPositionX.bind(this)
    // this.setNewPositionX = this.setNewPositionX.bind(this)
    this.moveButton = this.moveButton.bind(this)
    // this.touchstart = this.touchstart.bind(this)
    // this.touchmove = this.touchmove.bind(this)
    // this.touchend = this.touchend.bind(this)
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
    // console.log("Slider-moveButton: what is target", target);
    // console.log("Slider-moveButton: what is targetPosition", targetPosition);
    // targetPosition = (targetPosition <= this.state.constraints.left)
    //   ? this.state.constraints.left
    //   : (targetPosition >= this.state.constraints.right - targetWidth)
    //   ? this.state.constraints.right - targetWidth
    //   : targetPosition;
    // console.log('setNewPositionX: what is targetPosition after', targetPosition);
    // console.log('setNewPositionX: what is state after', this.state);
    //console.log('setNewPositionX: what is relative', this.state.relative.x);
    // const newPositionX = targetPosition - this.state.relative.x;
    console.log('what is targetPosition',targetPosition);
    const button = ReactDOM.findDOMNode(target);
    const buttonWidth = button.getBoundingClientRect().width;
    const buttonLeft = button.getBoundingClientRect().left;
    console.log('what is buttonLeft', buttonLeft)


    const constraints = this.state.constraints;
    // let modifiedTargetPosition = targetPosition + this.state.constraints.left;

    // let modifiedProgressBar = this.state.constraints.left + this.state.constraints.width;
    // console.log('Slider-moveButton: what is modifiedTargetPosition', modifiedTargetPosition);
    // console.log('Slider-moveButton: what is modifiedProgressBar', modifiedProgressBar);
    // let percent = modifiedTargetPosition / modifiedProgressBar;
    // console.log('Slider-moveButton: what is targetPosition', targetPosition);
    // console.log('Slider-moveButton: what is constraints.left', constraints.left);
    // console.log('Slider-moveButton: what is percent', percent);

    //relative to progress bar
    console.log('what is state constraints in parent', this.state.constraints);
    const buttonPercent = targetPosition/ this.state.constraints.width;

    // const newP = (this.state.constraints.width + this.state.constraints.left)* percent;
    // console.log('what is newP', newP-this.state.constraints.left);
    console.log('what is percentage', buttonPercent)
    let newP = buttonPercent * this.state.constraints.width;
    let newPositionX;
    console.log('what is newP', newP-this.state.constraints.left);
    // let newPositionX = newP *
    // console.log('what is constraints.left', constraints.left);
    // const newPositionX = (newP - constraints.left)<=constraints.left ? constraints.left : newP - constraints.left;
    // console.log('what is newPositionX', newPositionX);
    // newP = (newP <= this.state.constraints.left)
    //   ? this.state.constraints.left
    //   : (newP >= this.state.constraints.right - this.state.constraints.width)
    //   ? this.state.constraints.right - this.state.constraints.width
    //   : newP;
    // console.log('what is newP', newP)
    button.style.left = `${newP-this.state.constraints.left}px`
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
    // window.addEventListener('resize', this.handleResize);
    this.constructor.updateConstraint.call(this);
  }

  handleResize (){
    this.constructor.updateConstraint.call(this);
  }

  shouldComponentUpdate (nextProps, nextState){
    return (
      !nextState.constraints ||
      !this.state.constraints ||
      nextState.constraints.width !== this.state.constraints.width ||
      nextState.constraints.left !== this.state.constraints.left ||
      nextState.constraints.right !== this.state.constraints.right
    )
  }

  componentDidUpdate (props, state){
    // console.log('what is props', props);
    console.log('Slider: componentDidUpdate: what is state', state);
    console.log('Slider: componentDidUpdate: what is props', props);
    console.log('Slider: componentDidUpdate: what is this', this);

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
        {/*<Progress value="45" max="100" style={{marginBottom: '5px'}} />*/}

        <Progress ref="progress" color="isPrimary" size="isLarge" value="15" max="100" style={{marginBottom: '5px'}} />

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
  step: '1000'
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