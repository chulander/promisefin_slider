"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import {Progress} from 're-bulma';

class SliderProgress extends React.Component {
  constructor (props){
    super(props);
    // console.log('sliderProgress props', props)
    this.state = {
      percent: props.percent,
      constraintLeft:props.constraintLeft,
      constraintRight:props.constraintRight,
      constraintWidth:props.constraintWidth
    }
  }
  componentDidMount(){
    console.log('SliderProgress: componentDidMount', this)
    this.props.updateButtonConstraints(this)
    // this.props.updateSliderProgressValue(this.state.percent)
  }
  // componentWillReceiveProps(nextProps){
  // // console.log("SliderProgress: should recieve props", nextProps)
  // }
  // shouldComponentUpdate (nextProps, nextState){
  //   console.log('sliderprogress shouldupdate')
  //   return true
  // }
  // componentWillUpdate(nextProps,nextState){
  //   console.log('SliderProgress componentWillUpdate: nextProps', nextProps);
  //   console.log('SliderProgress componentWillUpdate: nextState', nextState);
  // }
  componentDidUpdate(prevProps,prevState){
    console.log('SliderProgress.componentDidUpdate: this.state', this.state);
    // this.props.updateSliderProgressDimensions(this)
    // this.props.updateButtonRelativePosition(this.state.percent);
    ReactDOM.findDOMNode(this).setAttribute('value', this.state.percent*100);
  }
  render (){
    console.log('SliderProgress: what is render props', this.props)
    return (
        <Progress color="isPrimary" size="isLarge"  max="100" style={{marginBottom: '5px'}} />
    )
  }
}

export default SliderProgress;