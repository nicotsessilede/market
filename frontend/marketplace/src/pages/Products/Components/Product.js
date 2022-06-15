import React from 'react';
import styles from '../../../styles/product.module.css'
import pic from '../../../assets/images/air jordan 1.PNG';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Product({price, name, imageUrl, product_id}) {
    const navigate = useNavigate();
  return (
      <>
    <div className={styles.box} onClick={() => {navigate(`/products/${product_id}`)}}>
        <img src={imageUrl} style={{width: '250px', height: '200px'}}/>
        <span className={styles.brand}>
            {name}
        </span>
        <span className={styles.price}>
            {price} XAF
        </span>
    </div>
   
    </>
  )
}
