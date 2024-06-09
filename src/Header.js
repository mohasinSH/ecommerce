import React from 'react'
import { Box,Avatar,TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import './Header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStateValue } from './StateProvider';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
const Header = () => {
    const [{basket,user},dispatch] = useStateValue();
   
    const handleAuthentication = ()=>{
        if(user){
            signOut(auth);
        }
    }
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
        <Link to='/login'>
        <div onClick={handleAuthentication} className='header__option'>
            <span className='header__optionLineOne'>Hello Guest</span>
            <span className='header__optionLineTwo'>{user?'Sign Out':'Sign In'}</span>
        </div>
        </Link>
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
