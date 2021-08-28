import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { getUserDetails, updateUserProfile } from '../../action/userActions'
import { listMyOrders } from '../../action/orderActions'

import styles from './ProfileScreen.module.css'

const ProfileScreen = ({ location, history }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      }
      else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password does not match')
    }
    else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <div className={styles.ProfileScreen}>
      <div className={styles.formContainer}>
        <h2> User Profile</h2>
        {error && <Message>{error}</Message>}
        {message && <Message>{message}</Message>}
        {success && <Message>Profile Updated</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
          <label >Name</label>
          <input type="name" id="name" name="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></input>

          <label >Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input>

          <label>Password</label>
          <input type="password" id="password" name="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

          <label>Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>

          <div> <button className={styles.signInButton} type="submit"> <strong> UPDATE </strong> </button> </div>
        </form>

      </div>
      <div>
        <h2>My orders</h2>
        {loadingOrders ? <Loader /> : errorOrders ? <Message>{errorOrders}</Message> : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>PAID</th>
                <th>DELIEVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0.10) ): (
                    <i className='fas fa-times' style={{ color:'red' }}></i>
                  )}
                  </td>
                  <td>
                    {order.isDelievered ? (
                      order.deliveredAt.substring(0.10) ): (
                    <i className='fas fa-times' style={{ color:'red' }}></i>
                  )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ProfileScreen
