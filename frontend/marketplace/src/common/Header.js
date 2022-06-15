import logo from '../assets/images/logo_light.png';
import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';

export default function () {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('userInfo')).userId;
  const [selected, setSelected] = useState('books');
  const [selectedAttribute, setSelectedAttribute] = useState(true);
  console.log(window.location.href)

  const handleSelect = (event) => {
    setSelected(event.target.value)
  }

  const search = () => {
    navigate(`/category/${selected}`);
  }

  return (
    <div className='header'>
        <div className='logo'>
           <img src={logo} alt='logo'/>
        </div>
        <div className='search' onChange={handleSelect}>
            <select name='categories' id='categories'>
                <option value='shoes' selected={selected == 'shoes' && true}>shoes</option>
                <option value='dresses' selected={selected == 'dresses' && true}>dresses</option>
                <option value='accesories' selected={selected == 'accesories' && true}>accesories</option>
                <option value='electronics' selected={selected == 'electronics' && true}>electronics</option>
                <option value='utensils' selected={selected == 'utensils' && true}>utensils</option>
                <option value='books' selected={selected == 'books' && true}>books</option>
            </select>
            <button onClick={search}>Search</button>
        </div>
        <div className='profile'>
          <AiOutlineUser style={{fontSize: '40px', cursor: 'pointer'}} onClick={() => {navigate(`/profile/${userId}`)}}/>
          <span>Profile</span>
        </div>
    </div>
  )
}
