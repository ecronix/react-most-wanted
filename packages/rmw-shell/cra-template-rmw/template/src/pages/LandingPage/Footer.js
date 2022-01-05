import React from 'react'
import AppBar from '@mui/material/AppBar'

const Footer = () => {
  return (
    <React.Fragment>
      <div
        style={{
          height: '400px',
          //width: '100%',
          backgroundImage: 'url(bottom.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      ></div>
      <AppBar
        position="relative"
        style={{
          backgroundColor: '#242424',
          //position: 'absolute',
          width: '100%',
          padding: 18,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        id="footer-text"
      >
        {`© ${new Date().getFullYear()} Copyright: yourcompany.com! All Rights Reserved`}
      </AppBar>
    </React.Fragment>
  )
}

export default Footer
