import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './HomeScreen.module.css'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'

import Product from '../../components/Product/Product'
import { listProducts } from '../../action/productionActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts())

  }, [dispatch]);

  return (
    <div className={styles.HomeScreen}>
      <h2> LATEST PRODUCTS </h2>
      {loading ? (<Loader />) : error ? (<Message> {error}</Message>) : <div className={styles.HSproducts}>
        {products.map(product => (
          <Product product={product} key={product._id} />
        ))}
      </div>}
    </div>
  )
}

export default HomeScreen
