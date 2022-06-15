import React from 'react'
import Backdrop from '../../../common/Backdrop';
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from '../../../styles/delete.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DeleteModal({closeModal, productId}) {
    const navigate = useNavigate();

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    const handleDelete = () => {
        axios.delete(`http://localhost:3000/api/products/${productId}`)
        .then(response => {
            console.log(response)
            navigate('/products')
        })
        .catch(error => console.log(error))
    }

  return (
    <Backdrop closeModal={closeModal}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.top}>
                 <span style={{fontSize: '22px', fontWeight: '700'}}>Delete Product</span>
                 <AiOutlineCloseCircle style={{fontSize: '20px', cursor: 'pointer'}} onClick={closeModal}/>
             </div>
             <div className={styles.content}>
                 <span>Are you sure you want to delete this product?</span>
                 <div className={styles.buttons}>
                     <button className={styles.cancel} onClick={closeModal}>Cancel</button>
                     <button className={styles.delete} onClick={handleDelete}>Delete</button>
                 </div>
             </div>
             </div>
    </Backdrop>
  )
}
