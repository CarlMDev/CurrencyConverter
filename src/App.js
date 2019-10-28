import React, { Component } from 'react'
import './App.css';
import CurrencySelector from './components/CurrencySelector'
import ExchangeRateDisplay from './components/ExchangeRateDisplay'
import CurrencyInput from './components/CurrencyInput'
import ConvertedAmountDisplay from './components/ConvertedAmountDisplay';

class App extends Component {
  
  constructor(props) {
    super(props)

    this.handleSourceChange = this.handleSourceChange.bind(this)
    this.handleTargetChange = this.handleTargetChange.bind(this)

    this.state = {
      currencies: [],
      isLoaded: false,
      type: 'source',
      sourceCode: '',
      targetCode: '',
      sourceRate: 0,
      targetRate: 0,
      amountToConvert: 0
    }
  }

  // Handles source currency change event.
  // This will update the UI based on the source currency chosen by the user
  handleSourceChange = (code, rate) => {
    console.log("Source Change Currency: " + code + " rate: " + rate)
    this.setState({type:'source', sourceCode: code, sourceRate: rate })  
  }

  // Handles target currency change event.
  // This will update the UI based on the target currency chosen by the user
  handleTargetChange = (code, rate) => {
    // console.log("Target Change Currency: " + code + " rate: " + rate)
    this.setState({type:'target', targetCode: code, targetRate: rate })
  }

  handleInputAmountChange = (amount) => {
    this.setState({amountToConvert: amount})
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

    var { isLoaded, currencies, type, sourceCode, targetCode, amountToConvert } = this.state

    var computedRate = this.computeRate()

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

          <CurrencySelector
            type={ type }
            list={ currencies } 
            selectorTitle="Source Currency" 
            onCurrencyCodeChange= { this.handleSourceChange } />
          
          <br/>
          <br/>

          <CurrencySelector
            type="target"
            list={ currencies } 
            selectorTitle="Target Currency" 
            onCurrencyCodeChange= { this.handleTargetChange } />
          
          <br/>
          
          <ExchangeRateDisplay
            sourceCode={ sourceCode }
            targetCode={ targetCode }
            computedRate={ computedRate } />

          <h2>2) Enter source currency amount to convert</h2>
          <CurrencyInput
            sourceCurrency={ sourceCode } 
            onAmountInputChange= { this.handleInputAmountChange }/>
          <h3>Converted amount:</h3> 
          <ConvertedAmountDisplay
            amount= { this.roundCurrency(this.convertAmount(amountToConvert, computedRate)) } 
            currencyCode= { targetCode }/>
        </div>
      );
    }
  }

  // The exchange rates we receive from API are from the European central bank
  // so the rates are based in Euro. This means that we have to perform some math
  // to find the exchange rates between 2 non-euro currencies.
  // We used this particular API because it is freely available at the time of development
  // and it suited our needs
  computeRate() {
 
    var {type, currencies, sourceCode, sourceRate, targetCode, targetRate } = this.state
    let exchangeRate = 0;
    
    // if a source currency is selected from the drop down
    if(type === "source") {
      if(sourceCode !== 'EUR' && targetCode !== 'EUR') {   
         exchangeRate = this.roundCurrency(targetRate  /  sourceRate)
       }
       else if(sourceCode === 'EUR' && targetCode !== 'EUR'){
         exchangeRate = this.roundCurrency(targetRate)
       }
       else if(sourceCode !== 'EUR' && targetCode === 'EUR'){
        exchangeRate = this.roundCurrency(1 / currencies[sourceCode])
       }
       else if(sourceCode === 'EUR' && targetCode === 'EUR'){
         exchangeRate = 1
       }
    }
    
    // if a target currency is selected from the drop down
    else {
      if(targetCode !== 'EUR' && sourceCode !== 'EUR') {
        exchangeRate = this.roundCurrency(targetRate / sourceRate)
      }
  
      else if(sourceCode === 'EUR' && targetCode !== 'EUR' ){
        exchangeRate = this.roundCurrency(currencies[targetCode])
      }
  
      else if(sourceCode !== 'EUR' && targetCode === 'EUR'){
       exchangeRate = this.roundCurrency(1 / currencies[sourceCode])
      }
  
      else if(sourceCode === 'EUR' && targetCode === 'EUR'){
        exchangeRate = 1
      }
    }
    
    // console.log("computed rate: " + exchangeRate)
    return exchangeRate
  }


  // Rounds input to 2 decimal places
  roundCurrency(amount) {
    return Math.round(amount * 100) / 100
  }

  convertAmount(amount, exchange) {
    return amount * exchange
  }

}

export default App