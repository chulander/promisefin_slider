"use strict";
import React, {Component} from 'react';
import {Progress} from 're-bulma';

class SliderProgress extends Component {
  render (){
    return (
        <Progress
          className={'promisefin_slider-progress--color'}
          value={this.props.percent *100}
          size="isMedium"
          max="100"
          style={{marginBottom: '5px'}}
        />
    )
  }
}

export default SliderProgress;