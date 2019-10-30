import React from "react"
function Header() {
  return (
    <nav className="navbar navbar-expand-sm bg-info navbar-dark">
      <a className="navbar-brand" href="#">
        <img src={ require('../img/bank-notes-banknotes-cash-164560.jpg')} style={{width: '10%', height: '10%'}} alt="Currency Exchange" /> {' '}
        Currency Exchange
      </a>
    </nav>
    )
}
export default Header
