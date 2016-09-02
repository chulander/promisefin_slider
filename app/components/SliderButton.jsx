"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 're-bulma';
// import Immutable from 'immutable';
// import SliderButton from './SliderButton';
import SliderProgress from './SliderProgress';
class SliderButton extends React.Component {
  constructor (props){
    console.log('!!!!!!!!!!!!!!!!!!!!!!!! SliderButton: constructor props', props);
    super(props);
    this.state = {
      dragging: false,
      currentPosition: props.currentPosition,
      percent:props.percent,
      relativePosition: (props.constraintWidth) ? props.percent * props.constraintWidth: props.relativePosition,
      constraintLeft:props.constraintLeft,
      constraintRight:props.constraintRight,
      constraintWidth:props.constraintWidth
    }
    // this.update = this.update.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)

    this.getInputPosition = this.getInputPosition.bind(this)
    this.setNewInputPosition = this.setNewInputPosition.bind(this)

    //this.updateButtonRelativePosition = this.props.updateButtonRelativePosition.bind(this)
    this.updateButtonRelativePosition = props.updateButtonRelativePosition
    // this.updateButtonRelativePosition = props.updateButtonRelativePosition
    this.moveButton = props.moveButton
    this.updateSliderProgressValue=props.updateSliderProgressValue
    // this.moveButton = props.moveButton
    // this.touchstart = this.touchstart.bind(this)
    // this.touchmove = this.touchmove.bind(this)
    // this.touchend = this.touchend.bind(this)
  }

  onMouseDown (e){
    // only left mouse button
    if(e.button === 0 || (e.touches && e.touches.length)){
      // const positionX = e.currentPositionTarget.getBoundingClientRect();
      // const pageX = this.getInputPosition(e);
      // console.log('onMouseDown: what is positionX', positionX);
      // console.log('onMouseDown: what is getInputPosition', pageX);
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

  getInputPosition (e){
    return e.pageX || e.touches[0].pageX;
  }

  setNewInputPosition (newInputPosition){
    // console.log('setNewInputPosition: what is state before', this.state);
    console.log('setNewInputPosition: what is newInputPosition', newInputPosition);
    this.setState({
      currentPosition: newInputPosition
    })
  }

  // moveButton (){
  //   console.log('moveButton: what is currentPosition', this.state.currentPosition);
  //   console.log('moveButton: what this', this);
  //   this.props.moveButton(this, this.state.currentPosition, this.state.width);
  // }
  // updateButtonRelativePosition(){
  //   this.props.updateButtonRelativePosition(this.state.percent, this.state.constraintWidth)
  // }
  onMouseMove (e){

    if(this.state.dragging){
      const inputPosition = this.getInputPosition(e);
      this.setNewInputPosition(inputPosition);
      console.log('SliderButton: onMouseMove - this',this.state)
      this.moveButton(this,this.state.currentPosition, this.state.width, this.props.constraintLeft, this.props.constraintRight,this.props.constraintWidth);
      // this.moveButton(this, this.props.constraintLeft, this.props.constraintRight,this.props.constraintWidth);
      e.stopPropagation()
      e.preventDefault()
    }
  }

  componentDidMount (){
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('touchmove', this.onMouseMove);
    document.addEventListener('touchend', this.onMouseUp);

    const button = ReactDOM.findDOMNode(this.refs.button);
    button.addEventListener('mousedown', this.onMouseDown)
    button.addEventListener('touchstart', this.onMouseDown)

    this.setState({
      width: button.getBoundingClientRect().width
    })
  }


  // shouldComponentUpdate (nextProps, nextState){
  //   console.log('SliderButton: shouldComponentUpdate  - nextProps', nextProps)
  //   console.log('SliderButton: shouldComponentUpdate  - nextState', nextState)
  //   // return (
  //   //   nextState.currentPosition !== this.state.currentPosition ||
  //   //   nextState.constraints.left !== this.state.constraints.left ||
  //   //   nextState.constraints.right !== this.state.constraints.right
  //   // )
  //   return true;
  // }

  componentWillReceiveProps(nextProps){
    // console.log('SliderButton: componentWillReceiveProps  - nextProps', nextProps)
  }
  shouldComponentUpdate(nextProps, nextState){
    return (
        this.state.percent !== nextProps.percent ||
        this.state.constraintWidth !==nextProps.constraintWidth
    )
  }
  componentWillUpdate(nextProps,nextState){
    // console.log('SliderButton componentWillUpdate: nextProps', nextProps);
    // console.log('SliderButton componentWillUpdate: nextState', nextState);
  }
  componentDidUpdate (prevProps, prevState){
    // console.log('SliderButton: componentDidUpdate - prevProps', prevProps);
    // console.log('SliderButton: componentDidUpdate - prevState', prevState);
    console.log('SliderButton: componentDidUpdate - new state', this.state);
    console.log('SliderButton: componentDidUpdate - new props', this.props);


    // console.log('what is this.props', this.state);
    // this.updateSliderProgressValue(this.state.percent);
    // this.updateButtonRelativePosition(this.state.percent, this)
    ReactDOM.findDOMNode(this).style=`left: ${this.state.relativePosition}px;`

    // this.updateButtonRelativePosition(this.state.percent, this.state.constraintWidth)
  //   // console.log('what is props', props);
  //   // console.log('componentDidUpdate: what is state', state);
  //
  //   // console.log('SliderButton: componentDidUpdate: what is state', state);
  //   // console.log('SliderButton: componentDidUpdate: what is props', props);
  //   // console.log('SliderButton: componentDidUpdate: what is this', this);

  //
  }

  componentWillUnmount (){
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('touchmove', this.onMouseMove);
    document.removeEventListener('touchend', this.onMouseUp);
    // window.removeEventListener('resize', this.handleResize);
  }

  render (){
    // console.log('SliderButton render Props', this.props);
    // // let relativePosition = (this.props.constraintWidth && this.props.percent)
    // //   ? this.props.percent * this.props.constraintWidth
    // //   : this.props.relativePosition
    let relativePixelPosition = (this.props.percent && this.props.constraintWidth) ?  this.props.percent * this.props.constraintWidth : this.props.relativePosition;
    relativePixelPosition = `${relativePixelPosition}px`
    relativePixelPosition = {
      left: relativePixelPosition
    };
    console.log('sliderbutton relativepixelposition render', relativePixelPosition)

    // const newProps = Object.assign({},  this.props, {relativePosition:relativePosition})
    // console.log('SliderButton relativePixelPositon', relativePixelPosition);
    // console.log('SliderButton props:',this.props);
    // const {moveButton, updateButtonRelativePosition, ...rest} = props
    return (
        <Button ref="button" className={this.props.className}>Test</Button>
    )
  }
}
//
// SliderButton.defaultProps = {
//   minAmount: '3000',
//   maxAmount: '35000',
//   defaultAmount: '15000',
//   step: '1000'
// }
export default SliderButton;