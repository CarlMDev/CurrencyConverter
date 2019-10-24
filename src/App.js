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
    }
  }

  // Handles source currency change event.
  // This will update the UI based on the source currency chosen by the user
  handleSourceChange = (e) => {

    this.setState({ sourceSelectedCurrency: e.target.value })
    this.setState({ sourceSelectedCurrencyValue: this.state.currencies[e.target.value] })

    // Because we use the rates provided by the European Central Bank (ECB), we need to make a few calculations
    // if source and target currencies are not Euros

    if(e.target.value !== 'EUR' && this.state.targetSelectedCurrency !== 'EUR'  && this.state.targetSelectedCurrency !== '') {
      this.setState({exchangeRate : this.roundCurrency(this.state.targetSelectedCurrencyValue 
        /  this.state.currencies[e.target.value])})
      
    }
    else if(e.target.value === 'EUR' && this.state.targetSelectedCurrency !== 'EUR'){
      this.setState({exchangeRate: this.roundCurrency(this.state.targetSelectedCurrencyValue)})
      this.setState({sourceSelectedCurrencyValue:  this.roundCurrency(1)})
    }
    else if(e.target.value !== 'EUR' && this.state.targetSelectedCurrency === 'EUR'){
      this.setState({exchangeRate : this.roundCurrency(1 / this.state.currencies[e.target.value])})
    }
    else if(e.target.value === 'EUR' && this.state.targetSelectedCurrency === 'EUR'){
      this.setState({exchangeRate : this.roundCurrency(1)})
      this.setState({sourceSelectedCurrencyValue: this.roundCurrency(1)})
    }
    
  }

  // Handles target currency change event.
  // This will update the UI based on the target currency chosen by the user
  handleTargetChange = (e) => {

    this.setState({ targetSelectedCurrency: e.target.value })
    this.setState({ targetSelectedCurrencyValue: this.state.currencies[e.target.value] })

    this.setState({ sourceSelectedCurrencyValue: this.state.currencies[this.state.sourceSelectedCurrency] })

    if(this.state.sourceSelectedCurrency !== 'EUR' &&  e.target.value !== 'EUR' && this.state.targetSelectedCurrency !== '') {
      this.setState({exchangeRate :this.roundCurrency(this.state.currencies[e.target.value] / this.state.sourceSelectedCurrencyValue)})
    }

    else if(e.target.value === 'EUR' && this.state.sourceSelectedCurrency !== 'EUR' ){
      this.setState({exchangeRate: this.roundCurrency(1 / this.state.currencies[this.state.sourceSelectedCurrency])})
      this.setState({targetSelectedCurrencyValue:  this.roundCurrency(1)})
    }

    else if(e.target.value !== 'EUR' && this.state.sourceSelectedCurrency === 'EUR'){
      this.setState({exchangeRate : this.roundCurrency(this.state.currencies[e.target.value])})
    }

    else if(e.target.value === 'EUR' && this.state.sourceSelectedCurrency === 'EUR'){
      this.setState({exchangeRate:  this.roundCurrency(1)})
      this.setState({targetSelectedCurrencyValue:  this.roundCurrency(1)})
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
          
          <label>
            1 {' ' + this.state.sourceSelectedCurrency }  = { this.state.exchangeRate + ' ' + 
              this.state.targetSelectedCurrency } 
          </label>

        </div>
      );
    }
  }

  // We want to make sure that exchange rates displayed are rounded to 2 decimal places
  roundCurrency(amount) {
    return Math.round(amount * 100) / 100
  }

}

export default App;
