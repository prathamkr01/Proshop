import React from 'react'
import styles from './Message.module.css'

const Message = ({ children }) => {
  return (
    <div className={styles.Message}>
      <h3>{children}</h3>
    </div>
  )

}




export default Message