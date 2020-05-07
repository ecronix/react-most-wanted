import React, { useContext } from 'react'
import OnlineContext from 'base-shell/lib/providers/Online/Context'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const isOnline = useContext(OnlineContext)
  return (
    <div>
      Landing Page
      <br />
      {isOnline ? 'online' : 'offline'}
      <div>
        <Link to="/home">Home</Link>
      </div>
    </div>
  )
}

export default LandingPage
