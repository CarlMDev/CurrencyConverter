import React from "react";
import formatCurrency from '../misc/formatter'
function ExchangeRateDisplay(props) {
  var { sourceCode, targetCode, computedRate } = props;
  // console.log('Display ' + sourceCode + ' ' + targetCode + ' ' + computedRate)
  return (
    <div>
      <h3>Exchange Rate:</h3> <br />
      <table style={{ tablelayout: "fixed", width: "100%" }}>
        <tr>
          <td></td>
          <td>
            <h2>
              {(sourceCode === null || targetCode === null ? '' :
              formatCurrency(1, sourceCode)  + ' = ' +
              (Number.isNaN(computedRate) ? formatCurrency(1, targetCode) 
                : formatCurrency(computedRate, targetCode))) }

              
            </h2>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  );
}

export default ExchangeRateDisplay;
