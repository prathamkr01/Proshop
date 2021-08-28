import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Navbar.module.css'

import { NavLink } from 'react-router-dom'
import { logout } from '../../../action/userActions'
import Radium from 'radium'

const RadiatingLink = Radium(NavLink)

const Navbar = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.Navbar}>
      <div> <NavLink to='/' exact style={{ textDecoration: 'none', color: '	#888888' }} activeStyle={{ color: 'orange' }}>
        <h1> PROSHOP </h1>
      </NavLink> </div>
      <div className={styles.NavRight}>
        <div>
          <RadiatingLink to='/cart' style={{ textDecoration: 'none', color: '	#888888', marginRight: '7px', ":hover": { background: "green" } }} activeStyle={{ color: 'orange' }} >
            <i className='fas fa-shopping-cart'></i> <span> CART </span>
          </RadiatingLink>
        </div>
        {userInfo ? (
          <div className={styles.username}>
            <NavLink to='/profile' style={{ textDecoration: 'none', color: '	#888888', marginRight: '7px' }} activeStyle={{ color: 'orange' }}>
              <i class="fas fa-user"></i> {userInfo.name}
            </NavLink>
            <div className={styles.logout} onClick={logoutHandler}>
              Logout 
                  </div>
          </div>
        )
          :
          <NavLink to='/logIn' style={{ textDecoration: 'none', color: '	#888888' }} activeStyle={{ color: 'orange' }}>
            <i className='fas fa-user'></i> <span> SIGN IN </span>
          </NavLink>
        }
        {userInfo && userInfo.isAdmin && (
          <div>
            <NavLink to='/admin/userlist' style={{ textDecoration: 'none', color: '	#888888' }} activeStyle={{ color: 'orange' }}>
              <span> Users </span>
            </NavLink>
            <NavLink to='/admin/productlist' style={{ textDecoration: 'none', color: '	#888888' }} activeStyle={{ color: 'orange' }}>
              <span> Products </span>
            </NavLink>
            <NavLink to='/admin/orderlist' style={{ textDecoration: 'none', color: '	#888888' }} activeStyle={{ color: 'orange' }}>
              <span> Orders </span>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
