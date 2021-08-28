import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import { getOrderDetails, payOrder } from '../../action/orderActions'
import { ORDER_PAY_RESET } from '../../constants/orderConstants'

import styles from './OrderScreen.module.css'
import Loader from '../../components/Loader/Loader'

const OrderScreen = ({ match }) => {

  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()


  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  if (!loading) {
    //Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    }
    else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      }
      else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? <Loader /> : error ? <Message>{error}</Message> :
    <>
      <div className={styles.OrderScreen}>
        <h1>ORDER {order._id}</h1>
        <div>
          <h2>SHIPPING</h2>
          <p><strong>Name :</strong> {order.user.name} </p>
          <p><strong>Email :</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
          <p>
            <strong>Address: </strong>
            {order.shippingAddress.address},
          {order.shippingAddress.city}{''},
          {order.shippingAddress.postalCode}{''},
          {order.shippingAddress.country}
          </p>
          {order.idDelivered ? <Message>Delivered on {order.DeliveredAt}</Message> : <Message>Not Delivered</Message>}
        </div>

        <div>
          <h2>PAYMENT METHOD</h2>
          <p>
            <strong>Method: </strong>
            {order.paymentMethod}
          </p>
          {order.isPaid ? <Message>Paid on {order.paidAt}</Message> : <Message>Not Paid</Message>}
        </div>

        <h2>Order Items</h2>
        <div className={styles.cart}>
          {order.orderItems.length === 0 ? <Message>Order is Empty</Message> : (
            <div className={styles.cartItems}>
              {order.orderItems.map((item, index) => (
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
              <h4> Items : ${order.itemsPrice} </h4>
              <h4> Shipping :  ${order.shippingPrice} </h4>
              <h4> Tax :  ${order.taxPrice} </h4>
              <h4> Total :  ${order.totalPrice} </h4>
              {!order.isPaid && (
                <h4>
                  {loadingPay && <Loader />}
                  {!sdkReady ? <Loader /> : (
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                  )}
                </h4>
              )}
            </div>
          </div>
        </div>

      </div>
    </>

}

export default OrderScreen
