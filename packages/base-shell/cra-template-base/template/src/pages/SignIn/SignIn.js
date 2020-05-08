import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { saveAuthorisation, isAuthorised } from '../../utils/auth'
import { useIntl } from 'react-intl'

const SignIn = () => {
  let history = useHistory()
  const intl = useIntl()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    authenticate({
      displayName: username,
    })
  }

  const authenticate = (user) => {
    saveAuthorisation(user)
    let _location = history.location
    let isAuth = isAuthorised()
    if (isAuth) {
      let _route = '/home'
      if (_location.state && _location.state.from) {
        _route = _location.state.from.pathname
        history.push(_route)
      } else {
        history.push(_route)
      }
    }
  }

  return (
    <div>
      {intl.formatMessage({ id: 'sign_in' })}
      <form onSubmit={handleSubmit}>
        <label>
          {intl.formatMessage({ id: 'username' })}
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          {intl.formatMessage({ id: 'password' })}
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value={intl.formatMessage({ id: 'sign_in' })} />
      </form>
    </div>
  )
}

export default SignIn
