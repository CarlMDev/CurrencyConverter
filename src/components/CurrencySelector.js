import React, { Component } from 'react'

class CurrencySelector extends Component {
    constructor(props) {
        super(props)

        this.handleSelectorChange = this.handleSelectorChange.bind(this)

        this.state = {
            selectorTitle: this.props.selectorTitle,
            currencyList: this.props.list,
            selectedCurrencyCode: '',
            selectedCurrencyValue: 0,
        }
    }

    handleSelectorChange = (e) => {
        
        this.props.onCurrencyCodeChange(e.target.value, this.state.currencyList[e.target.value])

        this.setState({ selectedCurrencyValue: this.state.currencyList[e.target.value] })

        // to avoid showing "choose" as currency
        if(e.target.value === '-- CHOOSE --'){
          this.setState({ selectedCurrencyCode: '' })
        }
        else {
          this.setState({ selectedCurrencyCode: e.target.value })
        }

    }

    render() {

        //this.setState(currencyList, this.props.list)
        return (
            <div>
                <label>{ this.state.selectorTitle + ' '}
                </label>
                <select id={ this.props.type }
                    value={ this.state.selectedCurrencyCode }
                    onChange={ this.handleSelectorChange }
                >
                    <option key="">-- CHOOSE --</option>  
                    <option key="EUR">EUR</option>  
                    { Object.keys(this.state.currencyList).map(currency => (
                    <option key={currency}>
                        { currency }
                    </option>
                    ))};
              </select>
            </div>
        )
    }
}

export default CurrencySelector