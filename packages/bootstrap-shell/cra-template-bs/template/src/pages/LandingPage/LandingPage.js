import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h2>Cool Landing Page</h2>

      <div>
        <Link to="/home">Home</Link>
      </div>
    </div>
  )
}
export default LandingPage
