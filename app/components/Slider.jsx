"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
// import LoanAmount from './LoanAmount.jsx';
import {Progress, Button, Container} from 're-bulma';
import SliderButton from './SliderButton';
import SliderProgress from './SliderProgress';

class Slider extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      minAmount: props.minAmount,
      maxAmount: props.maxAmount,
      amount: props.defaultAmount,
      step: props.step,
      percent: props.percent,
    }
    // this.handleResize = this.handleResize.bind(this)
    // this.updateButtonConstraints = this.constructor.updateButtonConstraints.bind(this)
    // this.updateSliderProgressValue=this.constructor.updateSliderProgressValue(this)
    // this.moveButton = this.constructor.moveButton.bind(this)
    // this.moveButton =
    // this.updateButtonRelativePosition=
    // this.updatePercent = this.updatePercent(this)
  }

  // updatePercent (percent){
  //   this.setState({percent: percent})
  // }
  // update (e){
  //   const v = ReactDOM.findDOMNode(this.refs.loan).value;
  //
  //   console.log('what is the loan value', v);
  //   this.setState({
  //     amount: ReactDOM.findDOMNode(this.refs.loan).value
  //   })
  // }


  componentDidMount (){
    // window.addEventListener('resize', this.handleResize);
    // this.constructor.updateButtonConstraints.call(this);
  }

  handleResize (){
    // const bar = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
    // console.log('handleResize what is this progress bar ', bar)
    // this.constructor.updateButtonConstraints.call(bar);
  }

  // shouldComponentUpdate (nextProps, nextState){
  //
  //   console.log('Slider: shouldComponentUpdate - nextProps', nextProps)
  //   console.log('Slider: shouldComponentUpdate - nextState', nextState)
  //   console.log('Slider: shouldComponentUpdate - this.state', this.state)
  //   const isUpdating= (
  //     !nextState.constraints ||
  //     !this.state.constraints ||
  //     (nextState.constraints.width !== this.state.constraints.width) ||
  //     (nextState.constraints.left !== this.state.constraints.left) ||
  //     (nextState.constraints.right !== this.state.constraints.right) ||
  //     (nextState.percent !== this.state.percent)
  //   )
  //   console.log('shouldComponentUpdate: what is isUpdating', isUpdating)
  //   return isUpdating
  // }

  componentDidUpdate (prevProp, prevState){
    // console.log('Slider: componentDidUpdate prevProp', prevProp)
    // console.log('Slider: componentDidUpdate  prevState', prevState)
    console.log('Slider: componentDidUpdate  this.props', this.props)
    console.log('Slider: componentDidUpdate  this.state', this.state)
  }

  render (){
    // const props = Object.assign({}, this.props, { percent: this.state.percent});
    // const newProps = Object.assign({}, this.props, this.state);
    return (
      <div>
        <SliderButton {...this.props} moveButton={this.constructor.moveButton.bind(this)}
                      updateSliderProgressValue={this.constructor.updateSliderProgressValue.bind(this)}
                      updateButtonRelativePosition={this.constructor.updateButtonRelativePosition.bind(this)}>Test</SliderButton>
        {/*<SliderButton {...newProps}>Test</SliderButton>*/}
        <SliderProgress ref="progress" percent={this.state.percent}
                        updateButtonConstraints={this.constructor.updateButtonConstraints.bind(this)}
                        updateButtonRelativePosition={this.constructor.updateButtonRelativePosition.bind(this)}
        />


      </div>
      //   <div className="slider">
      //     <span>{this.state.amount}</span>
      //     <hr />
      //
      //     <br />
      //     <span>{this.state.minAmount}</span>
      //     {/*<LoanAmount minAmount={this.minAmount} maxAmount={this.maxAmount} value={this.amount} step={this.step} update={this.update}/>*/}
      //     <input
      //       type="range"
      //       ref="loan"
      //       min={this.state.minAmount}
      //       max={this.state.maxAmount}
      //       value={this.state.amount}
      //       step={this.state.step}
      //       onChange={this.update}
      //     />
      //     <span>{this.state.maxAmount}</span>
      //   </div>
    )
  }
}
//
Slider.defaultProps = {
  id: 'button',
  className: 'promisefin_slider__button',
  minAmount: '3000',
  maxAmount: '35000',
  defaultAmount: '15000',
  step: '1000',
  percent: 0.50,
  relativePosition: 0,
  currentPosition: 0
}


Slider.moveButton = function (target, constraintLeft, constraintRight, constraintWidth){
  if(!target) return;
  console.log('moveButton: what is target move button', target)
  console.log('Slider: moveButton - What is constraintRight', constraintRight)
  console.log('Slider: moveButton - What is constraintWidth', constraintWidth)

  const {currentPosition:targetPosition, width:targetWidth} = target.state;
  console.log('Slider: moveButton - What is targetPosition', targetPosition)
  console.log('moveButton progress state refs.progress', this.refs.progress);
  // const {constraintLeft, constraintRight, constraintWidth} = this.refs.progress.state;
  let relativePosition;
  let percent;
  console.log('Slider: moveButton - What is this', this);
  if(targetPosition <= constraintLeft){
    relativePosition = 0;
    percent = 0;
  }
  else if(targetPosition >= constraintRight - targetWidth){
    relativePosition = constraintWidth - targetWidth
    percent = 100;
  }
  else {
    relativePosition = targetPosition - (constraintRight - constraintWidth)
    relativePosition = Number.isNaN(relativePosition) ? 0 : relativePosition;
    percent = relativePosition / constraintWidth;
    percent = (Number.isNaN(percent)) ? 0 : percent;
  }
  console.log('Slider: moveButton - What is target', target)
  // ReactDOM.findDOMNode(target).style= `left: ${relativePosition}px;`
  console.log('moveButton: what is percent', percent);
  console.log('moveButton: what is relativePosition', relativePosition);
  target.setState({
    percent: percent,
    relativePosition: relativePosition
  })
  // console.log('moveButton: what is new  state ', this.state);
}

Slider.updateButtonRelativePosition = function (percent, targetButton){
  console.log('Slider.updateButtonRelativePosition this.refs', this.refs);
  console.log('Slider.updateButtonRelativePosition this.refs.button', this.refs.button);
  console.log('Slider.updateButtonRelativePosition this.refs.progress', this.refs.progress);
  console.log('Slider.updateButtonRelativePosition percent', percent);
  console.log('Slider.updateButtonRelativePosition targetButton', targetButton);
  targetButton = targetButton || this.refs.button;
  console.log('what is targetButton', targetButton)
  if(!targetButton && !percent || !this.refs.progress) return;
  console.log('inside updateButtonRelativePosition');
  percent = (!percent) ? targetButton.state.percent: percent;
  console.log('what is percent', percent);
  const sliderProgressWidth = this.refs.progress.state.constraintWidth;
  console.log('what is slideProgresWidth', sliderProgressWidth)
  const newRelativePosition = sliderProgressWidth * percent;
  console.log('Slider.updateButtonRelativePosition: what is newRelativePosition', newRelativePosition);
  console.log('Slider.updateButtonRelativePosition: what is targetButton', targetButton);

  targetButton.setState({
    relativePosition: newRelativePosition,
    percent: percent
  })
}
Slider.updateButtonConstraints = function (sliderButton, sliderProgress){
  if(!sliderProgress || (!this.refs && !this.refs.progress)) return;
  sliderProgress = sliderProgress || this.refs.progress;
  const slideProgressDimensions = ReactDOM.findDOMNode(sliderProgress).getBoundingClientRect()

  sliderButton.setState({
    constraintLeft: slideProgressDimensions.left,
    constraintRight: slideProgressDimensions.right,
    constraintWidth: slideProgressDimensions.width
  });

  // this.moveButton()
  console.log('step4 Slider.updateButtonConstraints: postUpdate state', this)
}

Slider.updateSliderProgressValue = function (percent){
  if(!percent || !this.refs || !this.refs.progress) return;
  console.log('updateSliderProgressValue: what is progress state pre', this.refs['progress']);
  console.log('updateSliderProgressValue what is percent', percent)
  this.refs.progress.setState({
    percent: percent
  })
  // console.log('inside button, what is this.refs.button', this.refs);
  // if(this.refs.button){
  //   console.log('inside button')
  //   this.constructor.updateButtonRelativePosition(percent)
  // }
}



export default Slider;