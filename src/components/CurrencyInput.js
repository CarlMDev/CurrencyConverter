import React, { Component } from "react"

class CurrencyInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: "",
      amount: 0
    };
  }

  handleSourceAmountChange = e => {
    const reGex = /([0-9]*\.*[0-9]{0,2})/

    if (isNaN(e.target.value)) {
      this.setState({ error: "Amount needs to be numeric only" });
      this.props.onAmountInputChange(0)
    }

    // Ensure only numeric values are allowed in text box
    else if (reGex.test(e.target.value)) {
      this.props.onAmountInputChange(e.target.value);
      this.setState({ error: "" })
    } else {
      this.props.onAmountInputChange(0);
      this.setState({ error: "" })
    }
  };

  render() {
    let { error } = this.state;
    return (
      <div className="container">
        <input
          type="text"
          name="source-amount"
          onChange={this.handleSourceAmountChange}
          placeholder={
            this.props.sourceCurrency !== null
              ? (this.props.sourceCurrency.length === 3 ? 
                "Amount in " + this.props.sourceCurrency
                : "Select currencies first")
                : "Select currencies first"
          }
          className="form-control"
        />
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }
}
export default CurrencyInput
