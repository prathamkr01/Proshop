import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { listUsers, deleteUser } from '../../action/userActions'

import styles from './UserListScreen.module.css'

const UserListScreen = ({ history }) => {

  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    }
    else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div>
      <h1>Users</h1>
      {loading ? <Loader /> : error ? <Message>{error}</Message>
        : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>
                    {user.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}></i>) : (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    )}
                  </td>
                  <td>
                    <NavLink to={`/user/${user._id}/edit`} style={{ textDecoration: 'none', color: '#333', fontWeight: '600' }}>
                      <div className={styles.cartButton}>
                        <button>
                          <i className='fas fa-edit'></i>
                        </button>
                      </div>
                    </NavLink>
                    <div className={styles.cartButton}>
                      <button onClick={() => deleteHandler(user._id)}>
                        <i className='fas fa-trash'></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  )
}

export default UserListScreen
