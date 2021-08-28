import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { login } from '../../action/userActions'

import styles from './LoginScreen.module.css'

const LoginScreen = ({ location, history }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)

  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    } 
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className={styles.LoginScreen}>
      <div className={styles.formContainer}>
        <h1> SIGN IN</h1>
        {error && <Message>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
          <label >Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <label>Password</label>
          <input type="password" id="password" name="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <div> <button className={styles.signInButton} type="submit"> <strong> SIGN IN </strong> </button> </div>
        </form>

        <div >
          <div>
            New Customer ? <NavLink to={redirect ? `/register?redirect=${redirect}` : '/register'} style={{ textDecoration: 'none', color: '#333', fontWeight: '600' }}>Register Here</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
