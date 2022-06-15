import React from 'react';
import logo from '../../assets/images/logo_light.png';
import {Link} from "react-router-dom";
import '../../styles/Signup.css';
import '../../common/Footer';
import Footer from '../../common/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const  navigate = useNavigate();

  const handleChange = (event) => {
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json',
            },
           body: JSON.stringify(values),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.hasOwnProperty('token'));
            if (data.hasOwnProperty('token')){
             navigate(`/products`);
            localStorage.setItem('userInfo', JSON.stringify(data))
            }
        })
        .catch(error => console.log(error))
}



  return (
    <div>
       <div style={{backgroundColor: '#FCB800', display: 'flex', justifyContent: 'center', padding: '20px'}}>
            <img src={logo} alt="logo" />
        </div>
        <div className='middle'>
        <div className='links'>
            <Link className='link' to='/login' style={{fontWeight: 'bold'}}>Login</Link>
            <Link  className='link' to='/'>Signup</Link>
        </div>
        <div className='box'>
        <span>Login to your account</span>
            <label htmlFor='email'>Email</label>
            <input id='email' name='email' placeholder='Enter your email' value={values.email} onChange={handleChange}/>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' name='password' placeholder='Enter your password' value={values.password} onChange={handleChange}/>
            <button type='submit' onClick={handleSubmit}>Login</button>
        </div>
        </div>
        <Footer />
    </div>
  )
}
