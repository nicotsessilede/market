import React from 'react'
import logo from '../../assets/images/logo_light.png';
import '../../styles/Signup.css';
import '../../common/Footer';
import Footer from '../../common/Footer';
import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';


export default function Signup() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    number: '',
    password: ''
  })

  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [formErrors, setFormErrors] = useState({});

    const validate = () => {
        const errors = {};

        if (values.username.length < 3){
            errors.username = "Username should be atleast 3 caracters long"
        }
        if (!values.email){
            errors.email = 'Please insert an email'
        } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
            errors.email = 'Invalid email';
        }
        if (values.password.length < 5){
            errors.password = 'Password should be atleast 5 caracters long'
        }
        if (values.number < 9){
            errors.number = 'Please enter a valid phone number!'
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0){
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = (event) => {
      event.preventDefault()
      if (validate(values)){
          console.log(values);
         // setShowMessage(true);
         const userData = new FormData()
         userData.append('username', values.username);
         userData.append('password', values.password);
         userData.append('number', values.password);
         userData.append('email', values.email);


           fetch('http://localhost:3000/api/auth/signup', {
              method: 'POST',
              headers: {
              'Accept': 'application/json', 
               'Content-Type': 'application/json',
             },
             body: JSON.stringify(values),
          })
          .then(response => response.json())
          .then(data => {
             console.log(data)
             if (data.message === 'User created!'){
                 navigate(`/login`)
             }
             else {
                 alert('Unauthorized')
             }
          })
          console.log('Tokosss!')
      }
      else {
          setShowMessage(false);
      }

  }



  const handleChange = (event) => {
    setValues(values => ({
      ...values,
      [event.target.name] : event.target.value,
  }));
  }

  return (
    <div>
       <div style={{backgroundColor: '#FCB800', display: 'flex', justifyContent: 'center', padding: '20px'}}>
            <img src={logo} alt="logo" />
        </div> 
        <div className='middle'>
        <div className='links'>
            <Link className='link' to='/login'>Login</Link>
            <Link className='link' to='/' style={{fontWeight: 'bold'}}>Signup</Link>
        </div>
        <div className='box'>
        <span>Create your account</span>
            <label htmlFor='username'>Username</label>
            <input id='username' name='username' placeholder='Enter your username' value={values.username} onChange={handleChange}/>
            {formErrors.username && <p style={{color: 'red', fontSize: '14px'}}> {formErrors.username}</p>}
            <label htmlFor='email'>Email</label>
            <input id='email' name='email' placeholder='Enter your email' value={values.email} onChange={handleChange}/>
            {formErrors.email && <p style={{color: 'red', fontSize: '14px'}}>{formErrors.email}</p>}
            <label htmlFor='number'>Number</label>
            <input id='number' name='number' placeholder='Enter your number' value={values.number} onChange={handleChange}/>
            {formErrors.number && <p style={{color: 'red', fontSize: '14px'}}>{formErrors.number}</p>}
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' name='password' placeholder='Enter your password' value={values.password} onChange={handleChange}/>
            {formErrors.password && <p style={{color: 'red', fontSize: '14px'}}>{formErrors.password}</p>}
            <button type='submit' onClick={handleSubmit}>Signup</button>
        </div>
        <Footer />
        </div>
    </div>
  )
}

