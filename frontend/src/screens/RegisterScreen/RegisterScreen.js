import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { register } from '../../action/userActions'

import styles from './RegisterScreen.module.css'

const RegisterScreen = ({ location, history }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)

  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password does not match')
    }
    else{
    dispatch(register(name, email, password))
    }
  }

  return (
    <div className={styles.RegisterScreen}>
      <div className={styles.formContainer}>
        <h1> SIGN UP</h1>
        {error && <Message>{error}</Message>}
        {message && <Message>{message}</Message>}
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

          <div> <button className={styles.signInButton} type="submit"> <strong> REGISTER </strong> </button> </div>
        </form>

        <div >
          <div>
            Already have an account ? <NavLink to={redirect ? `/login?redirect=${redirect}` : '/login'} style={{ textDecoration: 'none', color: '#333', fontWeight: '600' }}>Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
