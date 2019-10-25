import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      currencies: [],
      isLoaded: false,
      sourceSelectedCurrency: '',
      targetSelectedCurrency: '',
      exchangeRate: 1,
      sourceSelectedCurrencyValue: 0,
      targetSelectedCurrencyValue: 0,
      sourceAmount: 0,
      targetAmount:0,
    }
  }

  // Handles source currency change event.
  // This will update the UI based on the source currency chosen by the user
  handleSourceChange = (e) => {

    let er = 0

    this.setState({ sourceSelectedCurrencyValue: this.state.currencies[e.target.value] })

    // to avoid showing choose as currency
    if(e.target.value === '-- CHOOSE --'){
      this.setState({ sourceSelectedCurrency: '' })
    }
    else {
      this.setState({ sourceSelectedCurrency: e.target.value })
    }

    // Because we use the rates provided by the European Central Bank (ECB), we need to make a few calculations
    // if source and target currencies are not Euros

    if(e.target.value !== 'EUR' && this.state.targetSelectedCurrency !== 'EUR'  && this.state.targetSelectedCurrency !== '') {
     // this.setState({exchangeRate : this.roundCurrency(this.state.targetSelectedCurrencyValue  /  this.state.currencies[e.target.value])})
      er = this.roundCurrency(this.state.targetSelectedCurrencyValue  /  this.state.currencies[e.target.value])
    }
    else if(e.target.value === 'EUR' && this.state.targetSelectedCurrency !== 'EUR'){
      //this.setState({exchangeRate: this.roundCurrency(this.state.targetSelectedCurrencyValue)})
      er = this.roundCurrency(this.state.targetSelectedCurrencyValue)
      this.setState({sourceSelectedCurrencyValue:  this.roundCurrency(1)})
    }
    else if(e.target.value !== 'EUR' && this.state.targetSelectedCurrency === 'EUR'){
     // this.setState({exchangeRate : this.roundCurrency(1 / this.state.currencies[e.target.value])})
     er = this.roundCurrency(1 / this.state.currencies[e.target.value])
    }
    else if(e.target.value === 'EUR' && this.state.targetSelectedCurrency === 'EUR'){
      // this.setState({exchangeRate : this.roundCurrency(1)})
      er = 1
      this.setState({sourceSelectedCurrencyValue: this.roundCurrency(1)})
    }

    this.setState({exchangeRate: er})
    this.setState({targetAmount: er * this.state.sourceAmount})
    
  }

  // Handles target currency change event.
  // This will update the UI based on the target currency chosen by the user
  handleTargetChange = (e) => {

    let er = 0

    this.setState({ targetSelectedCurrency: e.target.value })
    this.setState({ targetSelectedCurrencyValue: this.state.currencies[e.target.value] })

    this.setState({ sourceSelectedCurrencyValue: this.state.currencies[this.state.sourceSelectedCurrency] })

    if(this.state.sourceSelectedCurrency !== 'EUR' &&  e.target.value !== 'EUR' && this.state.targetSelectedCurrency !== '') {
      //this.setState({exchangeRate: this.roundCurrency(this.state.currencies[e.target.value] / this.state.sourceSelectedCurrencyValue)})
      er = this.roundCurrency(this.state.currencies[e.target.value] / this.state.sourceSelectedCurrencyValue)
    }

    else if(e.target.value === 'EUR' && this.state.sourceSelectedCurrency !== 'EUR' ){
      //this.setState({exchangeRate: this.roundCurrency(1 / this.state.currencies[this.state.sourceSelectedCurrency])})
      er = this.roundCurrency(1 / this.state.currencies[this.state.sourceSelectedCurrency])
      this.setState({targetSelectedCurrencyValue:  this.roundCurrency(1)})
    }

    else if(e.target.value !== 'EUR' && this.state.sourceSelectedCurrency === 'EUR'){
     // this.setState({exchangeRate : this.roundCurrency(this.state.currencies[e.target.value])})
     er = this.roundCurrency(this.state.currencies[e.target.value])
    }

    else if(e.target.value === 'EUR' && this.state.sourceSelectedCurrency === 'EUR'){
      //this.setState({exchangeRate:  this.roundCurrency(1)})
      er = 1
      this.setState({targetSelectedCurrencyValue:  this.roundCurrency(1)})
    }
    
    this.setState({exchangeRate: er})
    this.setState({targetAmount: er * this.state.sourceAmount})
  }

  handleSourceAmountChange = (e) => {
    const reGex = /^[0-9\b]+$/

    // Ensure only numeric values are allowed in text box
    if(e.target.value === '' || reGex.test(e.target.value)) {
      this.setState({targetAmount: this.convertAmount(e.target.value, this.state.exchangeRate) })
      this.setState({sourceAmount: e.target.value })
    }
    else {

    }

  }
  // Retrieve exchange rated provided by the API.
  // This API was chosen for this project because unlimited API calls can be made at no charge.
  componentDidMount() {

    fetch('https://api.ratesapi.io/api/latest')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        currencies: json.rates
      })
    })

  }

  render() {

    var { isLoaded, currencies } = this.state;
    
    if(!isLoaded) {
      return (
        <div className="App">
          <h1>Currency Exchange</h1>
          <div>Loading...</div>
        </div>
       
      ); 
    }

    else {
      return (
        <div className="App">
          <h1>Currency Exchange</h1>
          <br />
          <h2>1) Select currencies</h2>
          <label>Source Currency: {' '}
          </label>

          <select id="source"
            value={this.state.sourceSelectedCurrency }
            onChange={this.handleSourceChange}
          >
            <option key="">-- CHOOSE --</option>  
            <option key="EUR">EUR</option>  
            { Object.keys(currencies).map(currency => (
              <option key={currency}>
                { currency }
              </option>
            ))};
          </select>
          
          <br/>
          <br/>
          
          <label>Target Currency: {' '}
          </label>
          <select 
            id="target"
            value={this.state.targetSelectedCurrency }
            onChange={this.handleTargetChange}
          >
            <option key="">-- CHOOSE --</option>  
            <option key="EUR">EUR</option>  
            { Object.keys(currencies).map(currency => (
              <option key={currency}>
                { currency }
              </option>
            ))};
          </select>
          <br/>
          <br/>
          
          <h3>
            1 {' ' + this.state.sourceSelectedCurrency }  = { this.state.exchangeRate + ' ' + 
              this.state.targetSelectedCurrency } 
          </h3>
          <h2>2) Enter source currency amount to convert</h2>
          <input type="text" name="source-amount" onChange={ this.handleSourceAmountChange } placeholder={ this.state.sourceSelectedCurrency !== '' ?
            'Amount in ' + this.state.sourceSelectedCurrency : 'Select currencies first' }/> 
          <h3>Target currency Amount:</h3> 
          <h3>{ this.roundCurrency(this.state.targetAmount) +  ' ' + this.state.targetSelectedCurrency }</h3>

        </div>
      );
    }
  }

  // We want to make sure that exchange rates displayed are rounded to 2 decimal places
  roundCurrency(amount) {
    return Math.round(amount * 100) / 100
  }

  convertAmount(amount, exchange) {
    return amount * exchange
  }

}

export default App;
