import React, {Component} from 'react';
import {Content} from 're-bulma';

class Restrictions extends Component {
  constructor (props){
    super(props)
    this.formatAmount = props.formatAmount.bind(this)
    this.getRestrictionsDisclaimer = this.getRestrictionsDisclaimer.bind(this)
  }

  getRestrictionsDisclaimer (props){

    const regionList = Array.prototype.reduce.call(this.props.restrictions, (c, n, i, arr)=>{
      const formattedAmount = `($${this.formatAmount(n.amount)})`;
      const regionFormattedAmmount = `${n.region} ${formattedAmount}`;
      if(i === 0){
        c = `$${this.formatAmount(this.props.minAmount)}: ${regionFormattedAmmount}`;
      }
      else if(i ===arr.length-1) {
        c = `${c}, and ${regionFormattedAmmount}`;
      }
      else {
        c = `${c}, ${regionFormattedAmmount}`;
      }
      return c;
    }, '');
    return `${this.props.disclaimer} ${regionList}.`
  }
  render (){
    return (
      <Content>
        <p className={this.props.className}>{this.getRestrictionsDisclaimer(this.props)}</p>
      </Content>
    )
  }
}
Restrictions.defaultProps = {
  disclaimer: 'The following states have minimum loan amounts above',
  className: 'promisefin_restrictions__content'
}

export default Restrictions