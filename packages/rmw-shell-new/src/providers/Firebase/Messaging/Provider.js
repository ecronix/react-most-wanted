import PropTypes from 'prop-types'
import React, { useState, useEffect, useReducer } from 'react'
import Context from './Context'

const Provider = ({
  children,
  firebaseApp,
  persistKey = 'firebase_messaging',
}) => {
  const [messaging, setMessaging] = useState(null)

  const initMessaging = () => {
    const messaging = firebaseApp.messaging()
    messaging.onTokenRefresh(() => {
      console.log('token refresh')
      messaging
        .getToken()
        .then((refreshedToken) => {
          console.log('Token refreshed.', refreshedToken)

          // ...
        })
        .catch((err) => {
          console.log('Unable to retrieve refreshed token ', err)
        })
    })
  }

  return (
    <Context.Provider
      value={{
        firebaseApp,
        messaging,
      }}
    >
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
  firebaseApp: PropTypes.any,
}

export default Provider
