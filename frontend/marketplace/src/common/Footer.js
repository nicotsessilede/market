import React from 'react';
import { AiOutlineInstagram, AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import '../styles/Footer.css'

export default function Footer() {
  return (
    <div className='footer'>
        <div className='icons'>
            <AiOutlineInstagram className='insta'/>
            <AiFillFacebook className='face'/>
            <AiOutlineTwitter className='twitter'/>
        </div>
        <hr /> 
        <span>Marketplace 2022 &#169; </span>
    </div>
  )
}
