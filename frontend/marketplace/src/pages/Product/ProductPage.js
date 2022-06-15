import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { Link, Navigate } from 'react-router-dom';
import styles from '../../styles/product.module.css';
import pic from '../../assets/images/air jordan 1.PNG';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddCircle, MdVisibility, MdSell, MdLogout} from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import ModifyModal from './Components/ModifyModal';
import DeleteModal from './Components/DeleteModal';

export default function ProductPage() {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  console.log(user)
  console.log(product)

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = () => {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(product => {
      setProduct(product)
      setUser(product.userId)
    })
  }

  return (
    <div >
     <Header />
     <div className={styles.nav}>
            <span className={styles.homeText} onClick={(e) => {
                e.preventDefault()
                navigate(`/products`)
            }}>Home</span>
            <span className={styles.logOut} onClick={(e) => {
                e.preventDefault()
                navigate(`/login`)
            }}><MdLogout />LogOut</span>
        </div>
     <div style={{display: 'flex', height:'62vh', alignItems: 'center', justifyContent: 'space-between'}}>
     <div className={styles.product}>
         <div >
             <img src={product.imageUrl} alt='product' className={styles.img}/>
             </div>
             <div className={styles.info}>
                 <div style={{display: 'flex', flexDirection: 'column'}}>
                 <span className={styles.brand}>{product.name}</span>
                 <hr className={styles.hr}/>
                 <span className={styles.desc}>{product.description}</span>
                 </div>

                 <div style={{display: 'flex', flexDirection: 'column'}}>
                 <span className={styles.price}>{product.price} XAF</span>
                 <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                   { user._id == JSON.parse(localStorage.getItem('userInfo')).userId &&
                     (<div className={styles.buttons}>
                     <button className={styles.modify} onClick={() => showModal ? setShowModal(false) : setShowModal(true)}>Modify</button>
                     <button className={styles.delete} onClick={() => showDeleteModal ? setShowDeleteModal(false) : setShowDeleteModal(true)}>Delete</button>
                   </div>)
                   }
                 <span className={styles.user} onClick={() => {navigate(`/profile/${user._id}`)}} >Added by {user.username}</span>
                 </div>
                 </div>
             </div>
     </div>
     <div className={styles.additionalInfo}>
       <div className={styles.nestedInfo}><MdAddCircle className={styles.icons}/><span style={{marginLeft: '15px'}}>Add your product</span></div>
       <div className={styles.nestedInfo}><MdVisibility className={styles.icons}/><span style={{marginLeft: '15px'}}>Enhance your visibility</span></div>
       <div className={styles.nestedInfo}><MdSell className={styles.icons}/><span style={{marginLeft: '15px'}}>Sell your product</span></div>
       <div className={styles.nestedInfo}><FaMoneyBillAlt className={styles.icons}/><span style={{marginLeft: '15px'}}>Earn </span></div>
     </div>
     </div>
     {showModal && <ModifyModal closeModal={() => {setShowModal(false)}} productId={product._id} getProduct={getProduct} price={product.price} description={product.description} name={product.name}/>}
     {showDeleteModal && <DeleteModal closeModal={() => {setShowDeleteModal(false)}} productId={product._id}/>}
     <Footer />
    </div>
  )
}
