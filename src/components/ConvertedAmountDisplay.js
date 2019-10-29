import React from "react"
function ConvertedAmountDisplay(props) {
  var { amount, currencyCode } = props
  // console.log('Display ' + sourceCode + ' ' + targetCode + ' ' + computedRate)
  return (
    <h3>
      {isNaN(amount) || currencyCode === "-- CHOOSE --" || amount === 0
        ? "No money to convert"
        : amount + " " + currencyCode}
    </h3>
  );
}

export default ConvertedAmountDisplay
