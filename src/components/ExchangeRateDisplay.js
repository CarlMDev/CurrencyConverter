import React from "react";
import formatCurrency from "../misc/formatter";
function ExchangeRateDisplay(props) {
  var { sourceCode, targetCode, computedRate, symbols } = props;
  let exchangeRate;

  if (
    sourceCode === null ||
    targetCode === null ||
    sourceCode === undefined ||
    targetCode === undefined
  ) {
    exchangeRate = "";
  } else {
    // only show exchange rate if both source  & target currencies are selected
    exchangeRate =
      symbols[sourceCode] +
      formatCurrency(1, sourceCode) +
      " = " +
      (Number.isNaN(computedRate)
        ? symbols[targetCode] + formatCurrency(1, targetCode)
        : symbols[targetCode] + formatCurrency(computedRate, targetCode));
  }
  return (
    <div>
      <table style={{ tablelayout: "fixed", width: "100%" }}>
        <tr>
          <td>
            <h3>Exchange Rate:</h3>
          </td>
          <td align="right">
            <h2 style={{ color: "green" }}>{exchangeRate}</h2>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ExchangeRateDisplay;
