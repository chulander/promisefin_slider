"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 're-bulma';
// import Immutable from 'immutable';
// import SliderButton from './SliderButton';
class SliderButton extends React.Component {
  constructor (props){
    console.log('SliderButton: what is this.props', props);
    super(props);
    this.state = {
      dragging: false,
      current: 0,
      position: {
        x: 0
      },
      percentage:0.0,
      relative: {
        x: 0
      }
    }
    // this.update = this.update.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    // this.handleResize = this.handleResize.bind(this)
    this.getInputPositionX = this.getInputPositionX.bind(this)
    this.setNewPositionX = this.setNewPositionX.bind(this)
    this.moveButton = this.moveButton.bind(this)

    // this.touchstart = this.touchstart.bind(this)
    // this.touchmove = this.touchmove.bind(this)
    // this.touchend = this.touchend.bind(this)
  }

  onMouseDown (e){
    // only left mouse button
    if(e.button === 0 || (e.touches && e.touches.length)){
      // const positionX = e.currentTarget.getBoundingClientRect();
      // const pageX = this.getInputPositionX(e);
      // console.log('onMouseDown: what is positionX', positionX);
      // console.log('onMouseDown: what is getInputPositionX', pageX);
      this.setState({
        dragging: true,
        // relative: {
        //   x: pageX - positionX.left
        // }
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

  getInputPositionX (e){
    return e.pageX || e.touches[0].pageX;
  }

  setNewPositionX (positionX){
    // console.log('setNewPositionX: what is state before', this.state);
    console.log('setNewPositionX: what is positionX', positionX);

    // positionX = (positionX <= this.props.constraints.left)
    //   ? this.props.constraints.left
    //   : (positionX >= this.props.constraints.right)
    //   ? this.props.constraints.right
    //   : positionX;
    // console.log('setNewPositionX: what is positionX after', positionX);
    // console.log('setNewPositionX: what is state after', this.state);
    // console.log('setNewPositionX: what is relative.x', this.state.relative.x);
    // const newPositionX = positionX - this.state.relative.x;
    // console.log('setNewPositionX: what is newPositionXr', newPositionX);
    this.setState({
      current: positionX
    })
  }

  moveButton (){
    console.log('moveButton: what is current', this.state.current);
    // console.log('moveButton: what is the constraint.left', this.props.constraints.left);
    // const newPositionX = this.state.current - this.props.constraints.left;
    // console.log('moveButton: what is newPositionX', newPositionX)
    // ReactDOM.findDOMNode(this.refs.button).style.left = `${newPositionX}px`
   this.props.moveButton(this.refs.button, this.state.current, this.state.width);
  }

  onMouseMove (e){

    if(this.state.dragging){
      console.log('inside mousemove');
      console.log('inside mousemove: what is state', this.state);
      const inputPosition = this.getInputPositionX(e);
      console.log('what is inputPosition', inputPosition);
      this.setNewPositionX(inputPosition);
      console.log('inside mousemove: what is post-state', this.state);
      e.stopPropagation()
      e.preventDefault()
    }
  }

  componentDidMount (){
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('touchmove', this.onMouseMove);
    document.addEventListener('touchend', this.onMouseUp);
    // window.addEventListener('resize', this.handleResize);
    const button = ReactDOM.findDOMNode(this.refs.button);
    button.addEventListener('mousedown', this.onMouseDown)
    button.addEventListener('touchstart', this.onMouseDown)
    this.setState({
      width: button.getBoundingClientRect().width
    })
    // this.setState({
    //   current: this.state.constraints.left,
    // })
    // console.log('didMount: what is this.state', this.state);
    // this.moveButton();
  }

  // handleResize (e){
  //   const progressBar = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
  //   console.log('handleResize: old Left', this.state.constraints.left);
  //   console.log('handleResize: new Left', progressBar.left);
  //
  //   console.log('handleResize: old right', this.state.constraints.right);
  //   console.log('handleResize: new right', progressBar.right);
  //   // const progressBarDelta = Math.abs(progressBar.left - this.state.max);
  //   this.setState(this.state,{
  //     position: {
  //       x: {
  //         constraints: {
  //           left: progressBar.left,
  //           right: progressBar.right
  //         }
  //       },
  //       relative: {
  //         x: progressBar.left - this.state.constraints.left
  //       }
  //     }
  //   })
  //   const button = ReactDOM.findDOMNode(this.refs.button).getBoundingClientRect();
  //   //this.setNewPositionX(button)
  //
  //   // console.log("what is resize button", progressBar);
  //
  // }

  // shouldComponentUpdate (nextProps, nextState){
  //   return (
  //     nextState.current !== this.state.current ||
  //     nextState.constraints.left !== this.state.constraints.left ||
  //     nextState.constraints.right !== this.state.constraints.right
  //   )
  // }

  componentDidUpdate (props, state){
    // console.log('what is props', props);
    // console.log('componentDidUpdate: what is state', state);

    // console.log('SliderButton: componentDidUpdate: what is state', state);
    // console.log('SliderButton: componentDidUpdate: what is props', props);
    // console.log('SliderButton: componentDidUpdate: what is this', this);
    this.moveButton();

  }

  componentWillUnmount (){
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('touchmove', this.onMouseMove);
    document.removeEventListener('touchend', this.onMouseUp);
    // window.removeEventListener('resize', this.handleResize);
  }

  render (){
    // console.log('what is this.props', this.props);
    return (
        <Button ref="button" className={this.props.className}>Test</Button>
    )
  }
}
;
//
// SliderButton.defaultProps = {
//   minAmount: '3000',
//   maxAmount: '35000',
//   defaultAmount: '15000',
//   step: '1000'
// }
export default SliderButton;