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
    this.handleResize = this.handleResize.bind(this)
    // this.updateSliderProgressDimensions = this.constructor.updateSliderProgressDimensions.bind(this)
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
    window.addEventListener('resize', this.handleResize);
    // this.constructor.updateSliderProgressDimensions.call(this);
  }

  handleResize (){
    const bar = ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
    console.log('handleResize what is this progress bar ', bar)
    this.constructor.updateSliderProgressDimensions.call(this);
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
    console.log('Slider: componentDidUpdate', prevProp)
    console.log('Slider: componentDidUpdate', prevState)
  }

  render (){
    // const props = Object.assign({}, this.props, { percent: this.state.percent});
    const newProps = Object.assign({}, this.props, this.state);
    return (
      <div>
        <SliderButton {...newProps} moveButton={this.constructor.moveButton.bind(this)}
                      updateSliderProgressValue={this.constructor.updateSliderProgressValue.bind(this)}
                      updateButtonRelativePosition={this.constructor.updateButtonRelativePosition.bind(this)}>Test</SliderButton>
        {/*<SliderButton {...newProps}>Test</SliderButton>*/}
        <SliderProgress ref="progress" percent={this.state.percent}
                        updateSliderProgressDimensions={this.constructor.updateSliderProgressDimensions.bind(this)}
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

Slider.updateSliderProgressDimensions = function (sliderProgress){
  // console.log('step1 Slider.updateSliderProgressDimensions argument is', sliderProgress)
  // console.log('step1a Slider.updateSliderProgressDimensions argument is', sliderProgress.state)
  // console.log('step2 Slider.updateSliderProgressDimensions preUpdate state is', this)
  // console.log('stepPre2 Slider.updateSliderProgressDimensions preUpdate state is', Object.keys(this))
  // console.log('step2a Slider.updateSliderProgressDimensions preUpdate state is', this.state)
  const progressBar = (sliderProgress)
    ? ReactDOM.findDOMNode(sliderProgress).getBoundingClientRect()
    : ReactDOM.findDOMNode(this.refs.progress).getBoundingClientRect();
  // console.log('step3 Slider.updateSliderProgressDimensions progressBar is', progressBar)
  this.setState({
    constraintLeft: progressBar.left,
    constraintRight: progressBar.right,
    constraintWidth: progressBar.width
  });
  // this.moveButton()
  // console.log('step4 Slider.updateSliderProgressDimensions: postUpdate state', this)
}

Slider.moveButton = function (target, constraintLeft, constraintRight, constraintWidth){
  if(!target) return;
  console.log('what is target move button', target)
  const {currentPosition:targetPosition, width:targetWidth} = target.state;
  // console.log('moveButton progress state', this.refs.progress);
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
    console.log('Slider: moveButton - What is constraintRight', constraintRight)
    console.log('Slider: moveButton - What is constraintWidth', constraintWidth)
    console.log('Slider: moveButton - What is targetPosition', targetPosition)
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

Slider.updateButtonRelativePosition = function (relativePosition){
  if(!relativePosition && !this.refs.button) return;
  console.log('inside updateButtonRelativePosition');
  relativePosition = (!relativePosition) ? this.refs.button.state.relativePosition: relativePosition;
  const sliderProgressWidth = this.refs.progress.state.width;
  const newRelativePosition = sliderProgressWidth * (relativePosition / 100);
  console.log('Slider.updateButtonRelativePosition: what is newRelativePosition', newRelativePosition);
  console.log('what is this.refs', this.refs)
  this.refs.button.setState({
    relativePosition: newRelativePosition
  })
}
Slider.updateSliderProgressValue = function (percent){
  if(!percent || !this.refs || !this.refs.progress) return;
  console.log('updateSliderProgressValue: what is progress state pre', this.refs['progress']);
  console.log('updateSliderProgressValue what is percent', percent)
  this.refs.progress.setState({
    percent: percent
  })
}


// Slider.moveButton = function(target){
//     console.log('what is target move button', target)
//     const {currentPosition:targetPosition, width:targetWidth} = target.state;
//     const {constraintLeft, constraintRight, constraintWidth} = this.refs.progress.state;
//     let relativePosition;
//     let percent;
//     console.log('Slider: moveButton - What is this', this);
//     if (targetPosition <= constraintLeft) {
//       relativePosition = 0;
//       percent=0;
//     } else if(targetPosition >= constraintRight - targetWidth){
//       relativePosition = constraintWidth - targetWidth
//       percent=100;
//     } else {
//       relativePosition = targetPosition - (constraintRight - constraintWidth)
//       console.log('Slider: moveButton - What is constraintRight', constraintRight)
//       console.log('Slider: moveButton - What is constraintWidth', constraintWidth)
//       console.log('Slider: moveButton - What is targetPosition', targetPosition)
//       percent = relativePosition / constraintWidth;
//       percent = (Number.isNaN(percent)) ? 0 : percent;
//     }
//     console.log('Slider: moveButton - What is target', target)
//     // ReactDOM.findDOMNode(target).style= `left: ${relativePosition}px;`
//     console.log('moveButton: what is percent', percent);
//     console.log('moveButton: what is relativePosition', relativePosition);
//     target.setState({
//       percent:percent,
//       relativePosition:relativePosition
//     })
//     // console.log('moveButton: what is new  state ', this.state);
// }
export default Slider;