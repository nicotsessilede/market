import React from 'react';
import { useState } from 'react';
import pic from '../../../assets/images/air jordan 1.PNG';
import styles from '../../../styles/comment.module.css';
import { useParams } from 'react-router-dom';

export default function Comment(content, author) {
  const { id } = useParams();
  //console.log(author)
  //console.log(content)

  return (
    <div className={styles.comments}>
        <div className={styles.comment}>
            <img className={styles.img} src={pic} alt="profile"/>
            <div className={styles.userComment}>
                <span style={{padding: '10px', fontWeight: '700'}}>{content.author}</span>
                <span style={{padding: '10px'}}>{content.content}</span>
            </div>
        </div>
        
    </div>
  )
}
