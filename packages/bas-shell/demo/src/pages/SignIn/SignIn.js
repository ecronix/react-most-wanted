import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { saveAuthorisation, isAuthorised } from '../../utils/auth'

const SignIn = ({ history }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    authenticate({
      displayName: username
    })
  }

  const authenticate = (user) => {
    saveAuthorisation(user)
    let _location = history.location
    let isAuth = isAuthorised();
    if (isAuth && _location.state && _location.state.from) {
      let _route = _location.state.from.pathname;
      history.push(_route);
      console.log('SignIn router push', _route)
    }
  };

  return (
    <div>
      SIGN IN
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input type="text" id="username" onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          password
          <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="sign in" />
      </form>
    </div>
  )
}
export default withRouter(SignIn)