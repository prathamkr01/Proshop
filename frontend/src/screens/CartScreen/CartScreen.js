import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import { addToCart, removeFromCart } from '../../action/cartActions'

import styles from './CartScreen.module.css'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1


  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart



  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  
  const removeFromCartHandler = (id) => {
    console.log('removed')
    dispatch(removeFromCart(id))
  }

  return (

    <div className={styles.cartScreen}>
      <h1> SHOPPING CART </h1>
      {cartItems.length === 0 ? <Message> <h2>Your cart is empty</h2>
        <NavLink to='/' style={{
          textDecoration: 'none', color: '#333', fontWeight: '600', fontSize: '1.5rem',
          margin: '20px'
        }}>
          <strong> GO BACK</strong>
        </NavLink>
      </Message> :
        (
          <div className={styles.cart}>
            <div className={styles.cartItems}>
              {cartItems.map(item => (
                <div key={item.product} >
                  <span> <img src={item.image} alt={item.name} /> </span>
                  <span> <NavLink to={`/product/${item.product}`} style={{
                    textDecoration: 'none', color: '#333', fontWeight: '600', fontSize: '0.9rem',
                  }}>
                    <strong> {item.name}</strong>
                  </NavLink> </span>
                  <span> <strong> $ {item.price} </strong></span>
                  <span>  <select
                    as='select'
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                  > {
                      [...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1} >
                          {x + 1}
                        </option>
                      ))
                    }
                  </select> </span>
                  <span> <button onClick={()=>removeFromCartHandler(item.product)}> <i className='fas fa-trash'></i> </button> </span>
                </div>
              ))}
            </div>
            <div className={styles.subTotal}>
              <div>
               <h4> SUBTOTAL ({cartItems.reduce((acc, currItem) => acc + currItem.qty, 0)}) ITEMS </h4> 
               <h5> Total Price : $ {cartItems.reduce((acc, currItem) => acc + currItem.qty * currItem.price, 0)}</h5>
               </div>
               <div> <button onClick={checkoutHandler} disabled={cartItems.length===0}> <h5>PROCEED TO CHECKOUT</h5>  </button> </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default CartScreen
