import React, {Component} from 'react';
import {Content, Container} from 're-bulma';

class Restrictions extends Component {
  constructor (props){
    super(props)
    this.state = {
      disclaimer: props.disclaimer,
      restrictions: props.restrictions
    }
    this.formatAmount = props.formatAmount.bind(this)
    this.getRestrictionsDisclaimer = this.getRestrictionsDisclaimer.bind(this)
  }

  getRestrictionsDisclaimer (){

    const stateList = Array.prototype.reduce.call(this.state.restrictions, (c, n, i)=>{
      if(i === 0){
        c = `${n.state} ${this.formatAmount(n.amount)}`;
      }
      else {
        c = `${c}, ${n.state} ${this.formatAmount(n.amount)}`;
      }
      return c;
    }, '');
    return `${this.state.disclaimer} ${stateList}.`
  }

  //The following states have minimum loan amounts above $3,000: GA ($4,000), OH ($6,000), and MA ($7,000).
  render (){
    return (
      <Content>
        <p className={this.props.className}>{this.getRestrictionsDisclaimer()}</p>
      </Content>
    )
  }
}
Restrictions.defaultProps = {
  disclaimer: 'The following states have minimum loan amounts above',
  className: 'promisefin_restrictions__content'
}

export default Restrictions