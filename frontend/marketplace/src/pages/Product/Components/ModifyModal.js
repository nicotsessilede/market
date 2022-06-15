import React from 'react'
import Backdrop from '../../../common/Backdrop';
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from 'axios';
import { useState } from 'react';
import '../../../styles/Modal.css';

export default function ModifyModal({closeModal, productId, getProduct, price, description, name}) {
    const [values, setValues] = useState({
        name: name,
        description: description,
        price: price,
    })
    const [showMessage, setShowMessage] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const validate = () => {
        const errors = {};

        if (values.name.length < 3){
            errors.name = "name should be atleast 3 caracters long"
        }
        if (values.description.length < 5){
            errors.description = 'description should be atleast 5 caracters long'
        }
        if (values.price.length < 3){
            errors.price = 'Price should be atleast 3 values!'
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0){
            return true;
        } else {
            return false;
        }
    };

    const [file, setFile] = useState();
    const [selectedValue, setSelectedValue] = useState('shoes');

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    const handleChange = (event) => {
        setValues(values => ({
            ...values,
            [event.target.name] : event.target.value,
        }));
    }

    const handleSelect = (event) => {
        setSelectedValue(event.target.value);
    }

    console.log(selectedValue)

    const handlePost = (event) => {
        event.preventDefault();
        const modifiedProduct = new FormData();
        const userId = JSON.parse(localStorage.getItem('userInfo')).userId
        modifiedProduct.append('name',  values.name)
        modifiedProduct.append('description', values.description)
        modifiedProduct.append('price', values.price)
        modifiedProduct.append('image', file)
        modifiedProduct.append('userId', userId);
        modifiedProduct.append('category', selectedValue);

        if (validate()){
          axios.put(`http://localhost:3000/api/products/${productId}`, modifiedProduct)
          .then((res) => {
              console.log(res)
              getProduct()
          })
          .catch(error => console.log(error))
        }
    }


    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

  return (
    <Backdrop closeModal={closeModal}>
         <div className='modal' onClick={(e) => e.stopPropagation()}>
             <div className='top'>
                 <span style={{fontSize: '22px', fontWeight: '700'}}>Modify Product</span>
                 <AiOutlineCloseCircle style={{fontSize: '20px', cursor: 'pointer'}} onClick={closeModal}/>
             </div>
             <div className='content'>
                 <label htmlFor='name'>Name or product brand</label>
                 <textarea id='name' value={values.name} name='name' placeholder='Enter name or brand e.g Nike Shoe' onChange={handleChange} ></textarea>
                 <label htmlFor='description'>Description</label>
                 <textarea id='description' value={values.description} name='description' placeholder='Enter description' onChange={handleChange}></textarea>
                 <label htmlFor='category'>Category</label>
                 <select name='categories' id='categories' style={{marginTop: '5px', width: '20%', padding:'5px'}} onChange={handleSelect}>
                <option value='shoes'>shoes</option>
                <option value='dresses'>dresses</option>
                <option value='accesories'>accesories</option>
                <option value='electronics'>electronics</option>
                <option value='utensils'>utensils</option>
                <option value='books'>books</option>
            </select>
                 <label htmlFor='price'>Price</label>
                 <textarea id='price' name='price' value={values.price} placeholder='Enter price' onChange={handleChange}></textarea>
                 <label htmlFor='uplaod-product' className='uplaod-productLabel'>Uplaod product Image</label>
             <input id='uplaod-product' name='image' type='file' className='uplaod-productInput' onChange={handleFileChange}></input>
                 <button className='postButton' onClick={handlePost}>Post</button>
             </div>
         </div>
     </Backdrop>
  )
}
