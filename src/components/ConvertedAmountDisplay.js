import React from "react"
import formatCurrency from '../misc/formatter'
function ConvertedAmountDisplay(props) {
  var { amount, currencyCode } = props
  // console.log('Display ' + sourceCode + ' ' + targetCode + ' ' + computedRate)
  return (
    <h3>
      { isNaN(amount) || currencyCode === "-- CHOOSE --" || amount === 0
        ? "No money to convert"
        :  formatCurrency(amount, currencyCode) }
    </h3>
  );
}

export default ConvertedAmountDisplay
