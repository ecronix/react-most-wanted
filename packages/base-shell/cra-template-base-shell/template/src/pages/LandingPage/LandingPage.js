import React from 'react'
import withOnline from 'base-shell/lib/providers/OnlineProvider/withOnline'

const LandingPage = ({ isOnline }) => {
  return (
    <div>
      Landing Page
      <br />
      {isOnline ? 'online' : 'offline'}
    </div>
  )
}

export default withOnline(LandingPage)
