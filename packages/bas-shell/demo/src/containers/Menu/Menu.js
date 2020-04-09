import React from 'react'
import { logout, isAuthorised } from '../../utils/auth'
import { withRouter } from 'react-router-dom'

const Menu = ({ history }) => {
  const _logout = (user) => {
    logout()
    history.push('/signin')
  }

  return (
    <div>
      Menu
      {isAuthorised() && <button onClick={_logout}>Logout</button>}
    </div>
  )
}

export default withRouter(Menu)
