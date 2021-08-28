import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styles from './ProductScreen.module.css'


import Rating from '../../components/Product/Rating/Rating'
import { listProductDetails } from '../../action/productionActions'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(props.match.params.id))

  }, [dispatch, props.match]);

  const addToCartHandler = () => {
     props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
  }

  return (
    <div style={{ width: '100%' }}>
      <div className={styles.ProductScreen}>
        <span>
          <NavLink to={'/'} style={{ textDecoration: 'none', color: '#333', fontWeight: '300', fontSize: '0.9rem' }}>
            <strong> GO BACK</strong>
          </NavLink>
        </span>
        {loading ? <Loader /> : error ? <Message>{error}</Message> : (
          <div className={styles.ProductContent}>
            <img alt='product._id' src={product.image} />
            <div className={styles.ProductDesc}>
              <span> <h1> {product.name} </h1></span>
              <span> <h4> <Rating value={product.rating} text={`${product.numReviews} reviews`} /></h4> </span>
              <span> <h4>Price: ${product.price} </h4> </span>
              <span>  <h4>Description : {product.description} </h4></span>
            </div>
            <div className={styles.ProductStatus}>
              <div>
                <span> <div> Price : </div> <div> ${product.price} </div> </span>
                <span> <div> Status : </div> <div> {product.countInStock > 0 ? 'In Stock':'Out of Stock'} </div> </span>
                {product.countInStock ?
                <span>
                  <div> Qty : </div>
                  <select
                    as='select'
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  > { 
                    [...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1} >
                      {x + 1}
                    </option>
                      ))
                    }
                  </select>
                </span> : null
                  }
                <div className={styles.cartButton}> <button onClick={addToCartHandler} disabled={product.countInStock === 0}> <strong> ADD TO CART </strong> </button> </div>
                <div>  </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        )};

      </div>
    </div>
  )
}

export default ProductScreen
