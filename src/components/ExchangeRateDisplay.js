import React from "react";
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
              1 {" " + (sourceCode !== "-- CHOOSE --" ? sourceCode : "")}={" "}
              {Number.isNaN(computedRate) ? 1 : computedRate + " " + targetCode}
            </h2>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  );
}

export default ExchangeRateDisplay;
