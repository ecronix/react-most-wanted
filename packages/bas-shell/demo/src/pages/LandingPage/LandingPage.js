import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const isAuthorised = () => {
  try {
    const key = Object.keys(localStorage).find(e => e.match(/persist:root/))
    const data = JSON.parse(localStorage.getItem(key))
    const auth = JSON.parse(data.auth)

    return auth && auth.isAuthorised
  } catch (ex) {
    return false
  }
}
export const LandingPage = ({ history }) => {
  console.log('history', history)
  useEffect(() => {
    if (isAuthorised()) {
      history.push('/signin')
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
     
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
         <h1>Landing page</h1>
        <button
          style={{ margin: 30, borderRadius: '40px' }}
          name="signin"
          onClick={() => {
            history.push('/signin')
          }}
        >
          sign in
                </button>
      </div>
    </div>
  )
}
//export default withRouter(props => <LandingPage {...props} />);
export default withRouter(LandingPage);

