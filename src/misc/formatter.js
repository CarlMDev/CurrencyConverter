function formatCurrency(amount, code) {
    if(code !== null) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: code.length === 3 ? code : 'USD',
        minimumFractionDigits: 2
      })
    
      return formatter.format(amount)
    }
  }
  export default formatCurrency