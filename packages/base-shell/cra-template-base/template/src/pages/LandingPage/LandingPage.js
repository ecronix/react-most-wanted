import React from 'react'
import { useOnline } from 'base-shell/lib/providers/Online'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const isOnline = useOnline()
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
