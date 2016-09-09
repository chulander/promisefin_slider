"use strict";
import React, {Component} from 'react';
import {Progress} from 're-bulma';

class SliderProgress extends Component {
  constructor(props){
    super();
    this.state={
      percent:props.percent
    };
  }
  componentDidMount(){
    console.log('SliderProgress.componentMounted')
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      percent:nextProps.percent
    })
  }
  shouldComponentUpdate (nextProps, nextState){
      return nextState.percent !== this.state.percent;
  }
  render (){
    const customClass = (this.props.animationClassRequired === true) ? `promisefin_slider__progress--animation` : '';
    return (
        <Progress
          className={customClass}
          value={this.state.percent *100}
          size="isMedium"
          max="100"
          style={{marginBottom: '5px'}}
        />
    )
  }
}

export default SliderProgress