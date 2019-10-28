import React, { Component } from 'react'
class ExchangeRateDisplay extends Component {

    render() {
        var { sourceCode, targetCode, computedRate } = this.props
        // console.log('Display ' + sourceCode + ' ' + targetCode + ' ' + computedRate)
        return(
            <h3>
            1  {' ' + (sourceCode !== '-- CHOOSE --' ? sourceCode : '') } 
            =  { Number.isNaN(computedRate) ? 1: computedRate + ' ' + 
              targetCode } 
          </h3>
        )
    }
}

export default ExchangeRateDisplay