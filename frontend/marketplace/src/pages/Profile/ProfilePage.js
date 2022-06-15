import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import styles from '../../styles/profile.module.css';
import profile from '../../assets/images/air jordan 1.PNG';
import Comment from './Components/Comment';
import Modal from '../../common/Modal';
import { FaCommentSlash, FaRegEdit } from "react-icons/fa";
import { MdOutlineAddCircle, MdLogout } from "react-icons/md";
import { TbMessages } from "react-icons/tb";
import { IoSendSharp } from "react-icons/io5";
import { useState } from 'react';
import { useEffect } from 'react';
import { MdEmail, MdPhoneEnabled} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProfilePage() {
    const [showModal, setShowModal] = useState();
    const [user, setuser] = useState({});
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const authorId = JSON.parse(localStorage.getItem('userInfo')).userId;
    const { id } = useParams();
    const message = 'Hi, I just saw the <Product name> you added on Marketplace, how can I proceed to get it?';
    console.log(user)

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    console.log(comments)

    useEffect(() => {
        getUser()
    }, []);

    useEffect(() => {
        getComments();
      }, [])
     
     const getComments = () => {
       fetch('http://localhost:3000/api/comments')
       .then(response => response.json())
       .then((comments) => {
           console.log(comments)
           setComments(comments.filter(comment => comment.recipient._id === id).map(filtered => filtered))
         //setComments(...comments);
         //setAuthor(comments.author);
         //setRecipient(comments.recipient);
       })
       .catch(error => {
         console.log(error)
       })
     } 

    const getUser = () => {
        fetch(`http://localhost:3000/api/auth/${id}`)
        .then(response => response.json())
        .then(user => {
            setuser(user)
        })

    }

    const handleChange = (event) => {
        setText(event.target.value);
      }
    

    const handlePost = (event) => {
        event.preventDefault();
        if (text !== ''){
          axios.post('http://localhost:3000/api/comments', {
            author: authorId,
            text: text,
            recipient: id 
          })
          .then(res => {
              console.log(res)
              getComments()
              setText('');
            })
          .catch(error => console.log(error))
        }
      }

      const sendMessage = () => {
        window.open('https://wa.me/237' + `${user.number}/?text=` + `${message}`);
      }

      console.log(comments.map(comment => comment.author._id)[0])
      //console.log(comments.filter(comment => comment.recipient._id === id).map(filtered => (filtered.author.username)));

  return (
    <div>
        <Header />
        <div className={styles.middle}>
        <div className={styles.wholeCard}>
        <div className={styles.profileCard}>
            <div className={styles.profilePicture}>
                <img src={user.profile} alt='profile-picture' style={{width: '150px', height: '150px', borderRadius: '50%'}}/>
                <span style={{marginTop: '15px', backgroundColor: '#007BFF', padding: '10px', borderRadius: '50%'}}><FaRegEdit style={{color: 'white', fontWeight: '800', cursor: 'pointer'}} /></span>
            </div>
            <div className={styles.otherPart}>
                <div className={styles.userInfo}>
                    <span style={{fontSize: '40px', color: 'white'}}>{user.username}</span>
                    <span style={{color: '#999999', fontSize: '18px', paddingTop:'10px', display: 'flex', alignItems: 'center'}}><MdEmail style={{marginRight: '5px'}}/> {user.email}</span>
                    <span style={{color: '#999999', fontSize: '18px', paddingTop:'10px', display: 'flex', alignItems: 'center'}}><MdPhoneEnabled style={{marginRight: '5px'}}/> {user.number}</span>
                </div>
                <div className={styles.icons}>
                    <div className={styles.iconBox}>
                        <span className={styles.icon}><MdOutlineAddCircle onClick={() => {showModal ? setShowModal(false) : setShowModal(true)}} /></span>
                        <span style={{paddingTop: '10px'}}>Add Product</span>
                    </div>
                    <div className={styles.iconBox}>
                        <span className={styles.icon} onClick={sendMessage} ><TbMessages /></span>
                        <span style={{paddingTop: '10px'}}>Send Message</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.home}>
            <span className={styles.homeText} onClick={(e) => {
                e.preventDefault()
                navigate(`/products`)
            }}>Home</span>
        </div>
        </div>
        </div>
        {showModal && <Modal closeModal={() => setShowModal(false)} />} 
      {/** {!(comments.length < 1) ? comments.filter(comment => comment.recipient._id === id).map((filteredComments) => (
            <Comment comments={comments} author={filteredComments.author._id} recipient={filteredComments.recipient._id} content={filteredComments.text} />
      )) : (<div style={{width: 'clamp(50%, 550px, 90%)', margin: '10px auto', fontSize: '18px'}}><span >No reviews yet!</span></div>)} */}

      {!(comments.length < 1) ? comments.map(comment => (
          <Comment author={comment.author.username} content={comment.text}/>
      )) : (<div style={{width: 'clamp(50%, 550px, 90%)', margin: '10px auto', fontSize: '18px'}}><span >No reviews yet!</span></div>)}
        
        <div style={{width: 'clamp(50%, 550px, 90%)', margin: 'auto', backgroundColor: '#2F2F2F', padding: '1px 10px'}}>
        <label htmlFor='comment' style={{color: 'white'}}>Write a review about user</label>
        <div style={{display: 'flex', alignItems: 'center', lineHeight: '0px'}}>
        <input placeholder='Review....' onChange={handleChange} value={text}/>
        <span style={{padding: '10px', marginLeft: '10px', marginBottom: '15px', borderRadius: '50%', backgroundColor: '#FCB800'}}><IoSendSharp style={{fontSize: '30px', color: '#2F2F2F', cursor: 'pointer'}} onClick={handlePost}/></span>
        </div>
        </div>
        <Footer />
    </div>
  )
}
