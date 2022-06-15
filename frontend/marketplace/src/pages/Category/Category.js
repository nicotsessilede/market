import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import styles from '../../styles/products.module.css';
import Product from '../Products/Components/Product';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Category() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  let url = window.location.href;

  console.log(window.location.href)

  useEffect(() => {
    fetch(`http://localhost:3000/api/category/${category}`)
    .then(response => response.json())
    .then(products => {
      console.log(products)
      setProducts([...products])
    })
    .catch(error => {console.log(error)})
  }, [url])

  return (
    <div className={styles.productsBody}>
        <Header />
        
        <div className={styles.middle}>
            <div className={styles.products}>
                {products.map((product) => 
                  (<Product key={product.userId._id} imageUrl={product.imageUrl} price={product.price} name={product.name} product_id={product._id} />)
                )}
            </div>
        </div>
        <Footer />
    </div>
  )
}
