"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {Columns, Column, Level, LevelLeft, LevelRight, LevelItem} from 're-bulma';


class SliderButton extends React.Component {
  constructor(props){
    super(props)
    this.state={
      amount:props.amount,
      relativePosition:props.relativePosition,
      percent:props.percent,
      position:props.position
    }
  }

  componentWillReceiveProps (nextProps){
    console.log('SliderButton.componentWillReceiveProps nextProps', nextProps)
    // const modifiedProps = Object.assign({},nextProps, this.getButtonDimension());
    // this.setState(modifiedProps);
    this.setState(nextProps);
  }

  shouldComponentUpdate (nextProps, nextState){
    console.log('SliderButton.shouldComponentUpdate nextProps', nextProps);
    console.log('SliderButton.shouldComponentUpdate this.props', this.props);
    console.log('SliderButton.shouldComponentUpdate nextState', nextState);
    console.log('SliderButton.shouldComponentUpdate this.state', this.state);
    const test = (
      // nextState.position !== this.state.position ||
      nextState.amount !== this.state.amount ||
      nextState.relativePosition !== this.state.relativePosition ||
      nextState.percent !== this.state.percent ||
      nextState.position !== this.state.position ||
      nextState.buttonWidth !== this.state.buttonWidth ||
      nextState.buttonHeight !== this.state.buttonHeight
      // nextState.buttonWidth !== this.state.buttonWidth ||
      // nextState.buttonHeight !== this.state.buttonHeight ||
      // nextState.constraintLeft !== this.state.constraintLeft ||
      // nextState.constraintRight !== this.state.constraintRight ||
      // nextState.constraintWidth !== this.state.constraintWidth
    )
    console.log('SliderButton.shouldComponentUpdate', test)
    return test;
  }

  componentDidUpdate (prevProps, prevState){
    console.log('SliderButton.componentDidUpdate this.state.relativePosition', this.state.relativePosition);
  }

  render (){
    const customStyle= {
      marginLeft:`${this.state.relativePosition}px`,
      alignItems:'center'
    }
    const topAdjustment = this.props.getButtonTopPositionRelativeToSliderProgress(this.state.buttonHeight);
    if (topAdjustment && !Number.isNaN(topAdjustment)){
        customStyle.top=this.state.buttonHeight - this.props.constraintHeight
    }

    return (
      <Columns
        style={customStyle}
        responsive={'isMobile'}
        className={this.props.class}
        onMouseDown={this.props.mouseDown}
        onTouchStart={this.props.mouseDown}
        onMouseUp={this.props.mouseUp}
        onTouchEnd={this.props.mouseUp}
      >
        <Column>
          <div className={'promisefin_slider__button__arrow_left'}/>
        </Column>
        <Column>
          <div className={'promisefin_slider__button__amount'}>
          ${this.props.formatAmount(this.state.amount)}
          </div>
        </Column>
        <Column>
          <div
            className={'promisefin_slider__button__arrow_right'} />
        </Column>
      </Columns>
    )
  }
}
/*

<Level
  hasTextCentered={true}
  className={this.props.className}
  onMouseDown={this.props.mouseDown}
  onTouchStart={this.props.mouseDown}
  onMouseUp={this.props.mouseUp}
  onTouchEnd={this.props.mouseUp}
>
  <LevelLeft>
    <LevelItem
      className={'promisefin_slider__button__arrow_left'} />
  </LevelLeft>
  <LevelItem
    hasTextCentered={true}
    className={'promisefin_slider__button__amount'}>
    ${this.props.formatAmount(this.state.amount)}
  </LevelItem>
  <LevelRight>
    <LevelItem
      className={'promisefin_slider__button__arrow_right'} />
  </LevelRight>
</Level>
*/
export default SliderButton;