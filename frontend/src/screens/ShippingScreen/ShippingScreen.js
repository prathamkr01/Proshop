import React, { useState } from 'react'
import styles from './ShippingScreen.module.css'
import { useDispatch, useSelector} from 'react-redux'
import {saveShippingAddress} from '../../action/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'

const ShippingScreen = ({ history }) => {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    history.push('/payment')
  }

  return (
    <div className={styles.ShippingScreen}>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className={styles.formContainer}>
        <h1> SHIPPING </h1>
        <form onSubmit={submitHandler}>
          <label >Address</label>
          <input type="text" id="address" address="address" placeholder="Enter address" value={address} required onChange={(e) => setAddress(e.target.value)}></input>

          <label >City </label>
          <input type="city" id="city" name="city" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)}></input>

          <label>PostalCode</label>
          <input type="text" id="postalCode" name="postalCode" placeholder="Enter PostalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></input>

          <label>Country</label>
          <input type="country" id="country" name="country" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)}></input>

          <div> <button className={styles.signInButton} type="submit"> <strong> CONTINUE </strong> </button> </div>
        </form>

      </div>
    </div>
  )
}

export default ShippingScreen
