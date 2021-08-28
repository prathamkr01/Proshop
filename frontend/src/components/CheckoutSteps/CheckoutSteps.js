import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './CheckoutSteps.module.css'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className={styles.CheckoutSteps}>
      <div>
        {step1 ? (
          <NavLink to='/login' style={{ textDecoration: 'none', color: '#00000' }} activeStyle={{ color: 'orange' }}>
            <h3> SIGN IN </h3>
          </NavLink>
        ) : <NavLink  style={{ textDecoration: 'none', color: '	#888888',cursor:'not-allowed' }}  disabled>
          <h3> SIGN IN </h3>
        </NavLink>
        }
      </div>
      <div>
        {step2 ? (
          <NavLink to='/shipping' style={{ textDecoration: 'none', color: '#00000' }} activeStyle={{ color: 'orange' }}>
            <h3> SHIPPING </h3>
          </NavLink>
        ) : <NavLink style={{ textDecoration: 'none', color: '	#888888', cursor:'not-allowed'}}  disabled>
          <h3> SHIPPING </h3>
        </NavLink>
        }
      </div>
      <div>
        {step3 ? (
          <NavLink to='/payment' style={{ textDecoration: 'none', color: '#00000' }} activeStyle={{ color: 'orange' }}>
            <h3> PAYMENT  </h3>
          </NavLink>
        ) : <NavLink to='/shipping' style={{ textDecoration: 'none', color: '	#888888',cursor:'not-allowed' }} disabled>
          <h3> PAYMENT </h3>
        </NavLink>
        }
      </div>
      <div>
        {step4 ? (
          <NavLink to='/placeorder' style={{ textDecoration: 'none', color: '#00000' }} activeStyle={{ color: 'orange' }}>
            <h3> PLACE ORDER </h3>
          </NavLink>
        ) : <NavLink to='/shipping' style={{ textDecoration: 'none', color: '	#888888',cursor:'not-allowed' }}  disabled>
          <h3> PLACE ORDER </h3>
        </NavLink>
        }
      </div>
    </div>
  )
}

export default CheckoutSteps
