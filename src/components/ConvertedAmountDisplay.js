import React from "react";
import formatCurrency from "../misc/formatter";
function ConvertedAmountDisplay(props) {
  var { amount, currencyCode, symbols } = props;
  let result = "";
  let fontColor = "";

  if (isNaN(amount) || currencyCode === "-- CHOOSE --" || amount === 0) {
    result = "0.00";
    fontColor = "red";
  } else {
    result = symbols[currencyCode] + formatCurrency(amount, currencyCode);
    fontColor = "green";
  }

  return (
    <div>
      <table style={{ tablelayout: "fixed", width: "100%" }}>
        <tr>
          <td>
            <h3>Converted Amount:</h3>
          </td>
          <td align="right">
            <h2 style={{ color: fontColor }}>{result}</h2>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ConvertedAmountDisplay;
