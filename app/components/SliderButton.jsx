"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Container, Columns, Column, Level, LevelLeft, LevelRight, LevelItem} from 're-bulma';


class SliderButton extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      dragging: false,
      position: props.position,
      percent: props.percent,
      relativePosition: props.relativePosition,
      amount: props.amount

    }
    this.formatAmount = props.formatAmount.bind(this)
  }

  componentDidMount (){
    console.log('SliderButton.componentDidMount', this)
    // document.addEventListener('mousemove', this.onMouseMove);
    // document.addEventListener('mouseup', this.onMouseUp);
    // document.addEventListener('touchmove', this.onMouseMove);
    // document.addEventListener('touchend', this.onMouseUp);

    const button = ReactDOM.findDOMNode(this.refs.button);

    console.log('height button is', button.getBoundingClientRect().height)

    this.setState({
      width: button.getBoundingClientRect().width,
      height: button.getBoundingClientRect().height
    })

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
    console.log('SliderButton.shouldComponentUpdate nextProps', nextProps);
    console.log('SliderButton.shouldComponentUpdate this.props', this.props);
    console.log('SliderButton.shouldComponentUpdate nextState', nextState);
    console.log('SliderButton.shouldComponentUpdate this.state', this.state);
    const test = (
      nextState.percent !== this.state.percent ||
      nextState.relativePosition !== this.state.relativePosition ||
      nextState.position !== this.state.position ||
      nextState.width !== this.state.width ||
      nextState.height !== this.state.height
    )
    console.log('SliderButton.shouldComponentUpdate', test);
    return test;
  }

  componentWillReceiveProps (nextProps){
    console.log('SliderButton.componentWillReceiveProps nextProps', nextProps)
    this.setState(nextProps)

  }

  componentDidUpdate (prevProps, prevState){
    console.log('SliderButton.componentDidUpdate prevProps', prevProps);
    console.log('SliderButton.componentDidUpdate this.props', this.props);
    console.log('SliderButton.componentDidUpdate prevState', prevState);
    console.log('SliderButton.componentDidUpdate this.state', this.state);
    // if(nextProps.relativePosition){
    //   console.log('what is nextProps.relativePosition', nextProps.relativePosition);

    ReactDOM.findDOMNode(this).style = `margin-left: ${this.state.relativePosition - (this.state.width / 2)}px; top:${this.state.height * (2 / 3)}px;`

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
    console.log('SliderButton.render: props', this.props);
    return (
      <Level ref="button"
             hasTextCentered={true}
             className={this.props.className}
             onMouseDown={this.props.mouseDown}
             onTouchStart={this.props.mouseDown}
             onMouseUp={this.props.mouseUp}
             onTouchEnd={this.props.mouseUp}
      >
        <LevelLeft><LevelItem className={"arrow-left"}/></LevelLeft>
        <LevelItem hasTextCentered={true} className={'promisefin_slider__button__amount'}>${this.formatAmount(this.state.amount)}</LevelItem>
        <LevelRight><LevelItem className={"arrow-right"}/></LevelRight>

      </Level>

    )
  }
}

export default SliderButton;
/*
<LevelLeft><LevelItem><div className={"arrow-left"}/></LevelItem></LevelLeft>
<LevelItem hasTextCentered={true} className={'promisefin_slider__button__amount'}><div>${this.formatAmount(this.state.amount)}</div></LevelItem>
  <LevelRight><LevelItem><div className={"arrow-right"}></div></LevelItem></LevelRight>
*/
