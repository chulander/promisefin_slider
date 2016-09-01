"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import {Progress} from 're-bulma';


class SliderProgress extends React.Component {
  constructor (props){
    super(props);
    console.log('sliderProgress props', props)
    this.state = {
      percent: props.percent
    }
  }

  componentWillReceiveProps(nextProps){
   console.log("should recieve props", nextProps)
  }
  shouldComponentUpdate (nextProps, nextState){
    console.log('sliderprogress shouldupdate')
    return true
  }

  render (){
    return (
        <Progress color="isPrimary" size="isLarge" value={this.props.percent} max="100" style={{marginBottom: '5px'}} />


    )
  }
}

export default SliderProgress;