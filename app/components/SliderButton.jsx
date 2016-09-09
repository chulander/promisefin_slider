"use strict";
import React, {Component} from 'react';
import {Columns, Column} from 're-bulma';

class SliderButton extends Component {
  constructor (props){
    super(props)
    this.state = {
      amount: props.amount,
      relativePosition: props.relativePosition,
      percent: props.percent,
      position: props.position
    }
  }

  componentWillReceiveProps (nextProps){
    this.setState(nextProps);
  }

  shouldComponentUpdate (nextProps, nextState){
    const test = (
      nextState.amount !== this.state.amount ||
      nextState.relativePosition !== this.state.relativePosition ||
      nextState.percent !== this.state.percent ||
      nextState.position !== this.state.position ||
      nextState.buttonWidth !== this.state.buttonWidth ||
      nextState.buttonHeight !== this.state.buttonHeight ||
      nextState.animationClassRequired !== this.state.animationClassRequired
    )
    return test;
  }

  render (){
    const customStyle = {
      marginLeft: `${this.state.relativePosition}px`,
      alignItems: 'center'
    }

    if(this.state.constraintWidth){
      customStyle.top = this.state.buttonHeight - this.props.constraintHeight
    }
    const customClass = (this.props.animationClassRequired === true) ? `${this.props.class} promisefin_slider__button--animation` : this.props.class;

    return (
      <Columns
        style={customStyle}
        responsive={'isMobile'}
        className={customClass}
        onMouseDown={this.props.mouseDown}
        onTouchStart={this.props.mouseDown}
        onMouseUp={this.props.mouseUp}
        onTouchEnd={this.props.mouseUp}
      >
        <Column>
          <div className={'promisefin_slider__button__arrow_left'} />
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

export default SliderButton