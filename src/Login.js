import React from 'react'
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';
import {auth} from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const register = async (e)=>{
        e.preventDefault();
        try{
            const userCredintials = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredintials.user;
            console.log(user)
            if(user){
                navigate('/') 
            }
            
        }catch(err){
            console.error('Error registering user:', err);
        }
    }


    const signIn = async(e)=>{
        e.preventDefault();
        try{
          const authi = await signInWithEmailAndPassword(auth,email,password)
           console.log(authi.user)
           if(authi.user){
            navigate('/')
           }
        }catch(err){
            console.error('Error SignIn user:', err);
        }
      
    }
  return (
    <div className='login'>
    <Link to='/'>
        <img
            className="login__logo"
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
        />
    </Link>

    <div className='login__container'>
        <h1>Sign-in</h1>

        <form>
            <h5>E-mail</h5>
            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

            <h5>Password</h5>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

            <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
        </form>
        <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
            see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
    </div>
</div>
  )
}

export default Login
