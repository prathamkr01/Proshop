import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import styles from './Product.module.css'
import Rating from './Rating/Rating'

const Product = (props) => {
 return (
  <div className={styles.Product}>
   <div>
    <Link to={`/product/${props.product._id}`}>
     <img alt={`${props.product._id}`} src={props.product.image} />
    </Link>
   </div>
   <div className={styles.Card}>
    <div>
     <NavLink to={`/product/${props.product._id}`} style={{ textDecoration: 'none', color: '#333', fontWeight: '400', fontSize: '0.9rem' }}>
      <div> <strong> {props.product.name} </strong> </div>
     </NavLink>
    </div>
    <Rating value={props.product.rating} text={`${props.product.numReviews} reviews`} />
    <h3> ${props.product.price} </h3>
   </div>
  </div>
 )
}

export default Product
