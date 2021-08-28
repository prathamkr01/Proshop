import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import { createOrder } from '../../action/orderActions'

import styles from './PlaceOrderScreen.module.css'

const PlaceOrderScreen = ({history}) => {

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  //Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }))
  }

  useEffect(()=>{
    if(success){
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  },[history,success])

  return (
    <div className={styles.PlaceOrderScreen}>
      <CheckoutSteps step1 step2 step3 step4 />
      <div>
        <h2>SHIPPING</h2>
        <p>
          <strong>Address: </strong>
          {cart.shippingAddress.address},
          {cart.shippingAddress.city}{''},
          {cart.shippingAddress.postalCode}{''},
          {cart.shippingAddress.country}
        </p>
      </div>

      <div>
        <h2>PAYMENT METHOD</h2>
        <p>
          <strong>Method:</strong>
          {cart.paymentMethod}
        </p>
      </div>

      <h2>Order Items</h2>
      <div className={styles.cart}>
        {cart.cartItems.length === 0 ? <Message>Your Cart is Empty</Message> : (
          <div className={styles.cartItems}>
            {cart.cartItems.map((item, index) => (
              <div key={index} >
                <span> <img src={item.image} alt={item.name} /> </span>
                <span> <NavLink to={`/product/${item.product}`} style={{
                  textDecoration: 'none', color: '#333', fontWeight: '600', fontSize: '0.9rem',
                }}>
                  <strong> {item.name}</strong>
                </NavLink> </span>
                <span> {item.qty} x ${item.price} = ${item.qty * item.price} </span>

              </div>
            ))}
          </div>

        )
        }
        <div className={styles.subTotal}>
          <div>
            <h3> Order Summary  </h3>
            <h4> Items : ${cart.itemsPrice} </h4>
            <h4> Shipping :  ${cart.shippingPrice} </h4>
            <h4> Tax :  ${cart.taxPrice} </h4>
            <h4> Total :  ${cart.totalPrice} </h4>
            {error && <Message>{error}</Message>}
          </div>
          <div> <button
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            <h4>PLACE ORDER</h4>  </button> </div>
        </div>
      </div>

    </div>
  )
}

export default PlaceOrderScreen
