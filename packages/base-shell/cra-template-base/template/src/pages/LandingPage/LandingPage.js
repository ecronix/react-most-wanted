import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      Landing Page
      <div>
        <Link to="/home">Home</Link>
      </div>
    </div>
  )
}

export default LandingPage
