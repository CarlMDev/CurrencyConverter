import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      currencies: [],
      isLoaded: false,
      sourceSelectedValue: 'EUR',
      targetSelectedValue: 'TRY'
    }
  }

  handleSourceChange = (e) => {
    this.setState({ sourceSelectedValue: e.target.value })
  }

  handleTargetChange = (e) => {
    this.setState({ targetSelectedValue: e.target.value })
  }
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
            value={this.state.sourceSelectedValue }
            onChange={this.handleSourceChange}
          >
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
            value={this.state.targetSelectedValue }
            onChange={this.handleTargetChange}
          >
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
            1 {' ' + this.state.sourceSelectedValue }  = { currencies[this.state.targetSelectedValue] + ' ' + 
              this.state.targetSelectedValue } 
          </label>

        </div>
      );
    }


  }

}

export default App;
