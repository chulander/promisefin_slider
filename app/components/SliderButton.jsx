"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 're-bulma';
// import Immutable from 'immutable';
// import SliderButton from './SliderButton';
class SliderButton extends React.Component {
  constructor (props){
    console.log('SliderButton.constructor: props', props);
    super(props);
    this.state = {
      dragging: false,
      position: props.position,
      percent: props.percent,
      relativePosition: props.relativePosition,

    }
    // this.update = this.update.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    // this.handleResize = this.handleResize.bind(this)
    this.getInputPositionX = this.getInputPositionX.bind(this)
    this.setPosition = this.setPosition.bind(this)


    // this.touchstart = this.touchstart.bind(this)
    // this.touchmove = this.touchmove.bind(this)
    // this.touchend = this.touchend.bind(this)
  }

  onMouseDown (e){
    // only left mouse button
    if(e.button === 0 || (e.touches && e.touches.length)){
      // const inputPosition = e.currentTarget.getBoundingClientRect();
      // const pageX = this.getInputPositionX(e);
      // console.log('onMouseDown: what is inputPosition', inputPosition);
      // console.log('onMouseDown: what is getInputPositionX', pageX);
      this.setState({
        dragging: true,
        // relative: {
        //   x: pageX - inputPosition.left
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

  setPosition (inputPosition){
    // console.log('setPosition: what is state before', this.state);
    console.log('setPosition: what is inputPosition', inputPosition);

    // inputPosition = (inputPosition <= this.props.constraints.left)
    //   ? this.props.constraints.left
    //   : (inputPosition >= this.props.constraints.right)
    //   ? this.props.constraints.right
    //   : inputPosition;
    // console.log('setPosition: what is inputPosition after', inputPosition);
    // console.log('setPosition: what is state after', this.state);
    // console.log('setPosition: what is relative.x', this.state.relative.x);
    // const newPositionX = inputPosition - this.state.relative.x;
    // console.log('setPosition: what is newPositionXr', newPositionX);
    this.setState({
      position: inputPosition
    })
  }


  onMouseMove (e){

    if(this.state.dragging){
      // console.log('inside mousemove');
      // console.log('inside mousemove: what is state', this.state);
      const inputPosition = this.getInputPositionX(e);
      // console.log('what is inputPosition', inputPosition);
      this.setPosition(inputPosition);
      // console.log('inside mousemove: what is post-state', this.state);
      e.stopPropagation()
      e.preventDefault()
    }
  }

  componentDidMount (){
    console.log('SliderButton.componentDidMount', this)
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
    // this.updateSlideButtonRelativePosition();
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
  //   //this.setPosition(button)
  //
  //   // console.log("what is resize button", progressBar);
  //
  // }

  shouldComponentUpdate (nextProps, nextState){
    // console.log('SliderButton.shouldComponentUpdate nextProps', nextProps);
    // console.log('SliderButton.shouldComponentUpdate this.props', this.props);
    // console.log('SliderButton.shouldComponentUpdate nextState', nextState);
    // console.log('SliderButton.shouldComponentUpdate this.state', this.state);
    const test = (
      nextState.percent !== this.state.percent ||
      nextState.relativePosition !== this.state.relativePosition ||
      nextState.position !== this.state.position ||
      nextState.width !== this.state.width
    )
    // console.log('SliderButton.shouldComponentUpdate', test);
    return test;
  }
  componentWillReceiveProps(nextProps) {
    // console.log('SliderButton.componentWillReceiveProps nextProps', nextProps)
      this.setState(nextProps)

  }
  componentDidUpdate (prevProps, prevState){
    // console.log('SliderButton.componentDidUpdate prevProps', prevProps);
    // console.log('SliderButton.componentDidUpdate this.props', this.props);
    // console.log('SliderButton.componentDidUpdate prevState', prevState);
    // console.log('SliderButton.componentDidUpdate this.state', this.state);
    // if(nextProps.relativePosition){
    //   console.log('what is nextProps.relativePosition', nextProps.relativePosition);

      ReactDOM.findDOMNode(this).style=`left: ${this.state.relativePosition - (this.state.width/2)}px`;
    // }
    // console.log('what is props', props);
    // console.log('componentDidUpdate: what is state', state);

    // console.log('SliderButton: componentDidUpdate: what is state', state);
    // console.log('SliderButton: componentDidUpdate: what is props', props);
    // console.log('SliderButton: componentDidUpdate: what is this', this);

    this.props.updateSlideButtonRelativePosition(this, this.state.position, this.state.width);


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
    console.log('SliderButton.render: this.props', this.props);
    return (
      <Button ref="button" className={this.props.className}>{this.props.amount}</Button>
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