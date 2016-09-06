"use strict";
import React, {Component}from 'react';
import ReactDOM from 'react-dom';

import {Progress} from 're-bulma';


class SliderProgress extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      percent: props.percent
    }
  }

  componentDidMount(){
    // console.log('SliderProgress.componentDidMount', this)
    this.props.updateSliderProgressDimensions(this);
  }
  shouldComponentUpdate (nextProps, nextState){
    // console.log('SliderProgress.shouldComponentUpdate nextProps', nextProps);
    // console.log('SliderProgress.shouldComponentUpdate this.props', this.props);
    // console.log('SliderProgress.shouldComponentUpdate nextState', nextState);
    // console.log('SliderProgress.shouldComponentUpdate this.state', this.state);
    const test=(
      nextProps.percent !== this.state.percent
    )
    // console.log('SliderProgress.shouldComponentUpdate', test);
    return test;
  }
  componentWillReceiveProps(nextProps) {
    // console.log('SliderProgress.componentWillReceiveProps nextProps', nextProps)
    this.setState(nextProps)
    // ReactDOM.findDOMNode(this).setAttribute('value', nextProps.percent * 100);
  }
  componentDidUpdate (prevProps, prevState){
    // console.log('SliderProgress.componentDidUpdate prevProps', prevProps);
    // console.log('SliderProgress.componentDidUpdate this.props', this.props);
    // console.log('SliderProgress.componentDidUpdate prevState', prevState);
    // console.log('SliderProgress.componentDidUpdate this.state', this.state);
  }

  render (){
    return (
        <Progress color="isPrimary" value={this.props.percent *100} size="isMedium"  max="100" style={{marginBottom: '5px'}} />
    )
  }
}

export default SliderProgress;