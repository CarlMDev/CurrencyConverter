import React, { Component } from "react";

class CurrencySelector extends Component {
  constructor(props) {
    super(props);

    this.handleSelectorChange = this.handleSelectorChange.bind(this);

    this.state = {
      selectorTitle: this.props.selectorTitle,
      currencyList: this.props.list,
      selectedCurrencyCode: ""
    };
  }

  handleSelectorChange = e => {
    const selectedIndex = e.target.options.selectedIndex;
    const currencyKey = e.target.options[selectedIndex].getAttribute(
      "data-key"
    );

    this.props.onCurrencyCodeChange(currencyKey);

    this.setState({
      selectedCurrencyValue: this.state.currencyList[e.target.key]
    });

    // to avoid showing "choose" as currency
    if (e.target.value === "-- CHOOSE --") {
      this.setState({ selectedCurrencyCode: "" });
    } else {
      this.setState({ selectedCurrencyCode: e.target.value });
    }
  };

  render() {
    //this.setState(currencyList, this.props.list)
    return (
      <div className="container">
        <label>{this.state.selectorTitle + " "}</label>
        <select
          id={this.props.type}
          value={this.state.selectedCurrencyCode}
          onChange={this.handleSelectorChange}
          className="form-control"
        >
          <option key="">-- CHOOSE --</option>
          {Object.keys(this.state.currencyList).map(key => (
            <option key={key} data-key={key}>
              {this.state.currencyList[key]}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default CurrencySelector;
