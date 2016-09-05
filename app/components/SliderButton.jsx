"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Container} from 're-bulma';
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
      amount: props.amount

    }
    // this.update = this.update.bind(this)
    // this.onMouseMove = this.onMouseMove.call(this, this.onMouseMove, 250)


    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    // this.handleResize = this.handleResize.bind(this)
    this.getInputPositionX = this.getInputPositionX.bind(this)
    this.setPosition = this.setPosition.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    // this.onMouseMove = this.deBounce.bind(this)(this.onMouseMove.bind(this),50)
    //this.deBounce = this.deBounce.bind(this)


    // this.touchstart = this.touchstart.bind(this)
    // this.touchmove = this.touchmove.bind(this)
    // this.touchend = this.touchend.bind(this)
  }

  onMouseDown (e){
    // only left mouse button
    console.log('inside mouseDown')
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
    this.setState({
      position: inputPosition
    })
  }

  deBounce (func, wait){
    console.log('insidedeBounce')
    let timeout;
    return ()=>{
      console.log('what is func', func)
      console.log('what is wait', wait)
      clearTimeout(timeout);
      timeout = setTimeout(function(){
        timeout = null;
        func.call()
      }, wait);

    };
  }

  onMouseMove (e){

    console.log('insideMouseMove')
    // console.log('what is e', e)
    if(this.state.dragging){
      //e.persist()

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
    // document.addEventListener('mousemove', this.onMouseMove);
    // document.addEventListener('mouseup', this.onMouseUp);
    // document.addEventListener('touchmove', this.onMouseMove);
    // document.addEventListener('touchend', this.onMouseUp);

    const button = ReactDOM.findDOMNode(this.refs.button);
    // button.addEventListener('mousedown', this.onMouseDown)
    // button.addEventListener('touchstart', this.onMouseDown)
    // window.addEventListener('resize', this.handleResize);
    console.log('height button is', button.getBoundingClientRect().height)

    this.setState({
      width: button.getBoundingClientRect().width,
      height:button.getBoundingClientRect().height
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
      nextState.width !== this.state.width ||
      nextState.height !== this.state.height
    )
    // console.log('SliderButton.shouldComponentUpdate', test);
    return test;
  }

  componentWillReceiveProps (nextProps){
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

    ReactDOM.findDOMNode(this).style = `margin-left: ${this.state.relativePosition - (this.state.width / 2)}px; top:${this.state.height*(2/3)}px;`

    // }
    // console.log('what is props', props);
    // console.log('componentDidUpdate: what is state', state);

    // console.log('SliderButton: componentDidUpdate: what is state', state);
    // console.log('SliderButton: componentDidUpdate: what is props', props);
    // console.log('SliderButton: componentDidUpdate: what is this', this);

    this.props.updateSlideButtonRelativePosition(this, this.state.position, this.state.width);


  }

  componentWillUnmount (){
    // document.removeEventListener('mousemove', this.onMouseMove)
    // document.removeEventListener('mouseup', this.onMouseUp)
    // document.removeEventListener('touchmove', this.onMouseMove);
    // document.removeEventListener('touchend', this.onMouseUp);
    // window.removeEventListener('resize', this.handleResize);
  }

  render (){
    // console.log('what is this.props', this.props);
    //{/*<Button ref="button" className={this.props.className}>{this.props.amount}</Button>*/}
    console.log('SliderButton.render: this.props', this.props);
    // document.addEventListener('mousemove', this.onMouseMove);
    return (
      <Container ref="button"
                 hasTextCentered={true}
                 className={this.props.className}
                 onMouseDown={this.onMouseDown}
                 onTouchStart={this.onMouseDown}
                 onMouseMove={this.onMouseMove}
                onTouchMove={this.onMouseMove}
                 onMouseUp={this.onMouseUp}
                 onTouchEnd={this.onMouseUp}
      >
        <div>{this.props.amount}</div>
        <div>{this.props.position}</div>
      </Container>


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