import React from 'react'
import { Box,Avatar,TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import './Header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStateValue } from './StateProvider';

const Header = () => {
    const [{basket},dispatch] = useStateValue();
  return (
    <div className='header'>
    <Link to='/'>
     <img className='header__logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'/>
     </Link>
    <div className='header__search'>
        <input className='header__searchInput' type='text' />
        <SearchIcon className='header__searchIcon'/>
    </div>
    <div className='header__nav'>
        <div className='header__option'>
            <span className='header__optionLineOne'>Hello</span>
            <span className='header__optionLineTwo'>User</span>
        </div>
        <div className='header__option'>
            <span className='header__optionLineOne'>Your</span>
            <span className='header__optionLineTwo'>Orders</span>
        </div>
        <div className='header__option'>
            <span className='header__optionLineOne'>Your</span>
            <span className='header__optionLineTwo'>Prime</span>
        </div>
    </div>
    <Link to='/checkout'>
    <div className='header__optionBasket'>
        <ShoppingCartIcon/>
        <span className='header__optionLineTwo header__basketCount'>{basket?.length}</span>
    </div>
    </Link>
   

    </div>
  )
}

export default Header
