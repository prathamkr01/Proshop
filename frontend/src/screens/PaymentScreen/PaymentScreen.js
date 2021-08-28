import React, { useState } from 'react'
import styles from './PaymentScreen.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../action/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'

const PaymentScreen = ({ history }) => {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <div className={styles.PaymentScreen}>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className={styles.formContainer}>
        <h1> PAYMENT METHOD </h1>
        <form onSubmit={submitHandler}>
          <h2>Select Method</h2>
          <div>
            <input type="radio" id="paymentMethod" name="paymentMethod" value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)} />
            <label>PayPal</label>
          </div>

          <div> <button className={styles.signInButton} type="submit"> <strong> CONTINUE </strong> </button> </div>
        </form>

      </div>
    </div>
  )
}

export default PaymentScreen
