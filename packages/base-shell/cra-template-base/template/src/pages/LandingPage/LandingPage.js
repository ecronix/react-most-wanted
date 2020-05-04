import React from 'react'
import withOnline from 'base-shell/lib/providers/OnlineProvider/withOnline'
import { Link } from 'react-router-dom'

const LandingPage = ({ isOnline }) => {
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

export default withOnline(LandingPage)
