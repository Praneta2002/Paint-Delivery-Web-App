import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite Paintings from here</h2>
        <p>Welcome to KinnArt, Your Art Our Passion</p>
        <a href='/#explore-product'>

        <button>View Products</button>
        </a>
        

        </div>
    </div>
  )
}

export default Header
