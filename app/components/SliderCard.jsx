"use strict";
import React, {Component}from 'react';
import ReactDOM from 'react-dom';

import {Column, Title, Subtitle} from 're-bulma';


class SliderCard extends React.Component {
  constructor (props){
    super(props);
    // console.log('sliderProgress props', props)
    this.state={
      type:props.type,
      low:props.low,
      high:props.high
    }
  }

  // componentWillReceiveProps(nextProps){
  //  console.log("should recieve props", nextProps)
  // }
  // shouldComponentUpdate (nextProps, nextState){
  //   console.log('sliderprogress shouldupdate')
  //   return true
  // }
  componentDidMount(){
    console.log('SliderCard.componentDidMount', this)

    // ReactDOM.findDOMNode(this).setAttribute('value', this.state.percent * 100)
    // this.props.updateSliderCardDimensions(this);
  }
  //{/*shouldComponentUpdate (nextProps, nextState){*/}
    //{/*// console.log('SliderCard.shouldComponentUpdate nextProps', nextProps);*/}
    //{/*// console.log('SliderCard.shouldComponentUpdate this.props', this.props);*/}
    //{/*// console.log('SliderCard.shouldComponentUpdate nextState', nextState);*/}
    //{///*// console.log('SliderCard.shouldComponentUpdate this.state', this.state);*/}
    //{/*const test=(*/}
    //  {/*nextProps.percent !== this.state.percent*/}
    //{/*)*/}
    //{/*// console.log('SliderCard.shouldComponentUpdate', test);*/}
  //   return test;
  // }
  // componentWillReceiveProps(nextProps) {
  //   // console.log('SliderCard.componentWillReceiveProps nextProps', nextProps)
  //   this.setState(nextProps)
  //   ReactDOM.findDOMNode(this).setAttribute('value', nextProps.percent * 100);
  // }
  // componentDidUpdate (prevProps, prevState){
  //   // console.log('SliderCard.componentDidUpdate prevProps', prevProps);
  //   // console.log('SliderCard.componentDidUpdate this.props', this.props);
  //   // console.log('SliderCard.componentDidUpdate prevState', prevState);
  //   // console.log('SliderCard.componentDidUpdate this.state', this.state);
  // }

  render (){
    return (
      <Column style={{textAlign:'center'}} className="promisefin_card">
          <Title size={'is4'}>{this.props.title}</Title>
          <Subtitle size={'is4'}>400-500</Subtitle>

      </Column>
    )
  }
}

SliderCard.defaultProps= {
  interestRateLow: 0.0631,
  interestRateHigh: 0.2666,
  originationFeeLow: 0.01,
  // originationFeeHigh: 0.06,
  // origination_fee_high: 0.05
}
SliderCard.propTypes={
  originationFeeHeight:React.PropTypes.oneOf([0.05, 0.06]).isRequired
}

export default SliderCard;