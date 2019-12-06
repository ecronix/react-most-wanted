import 'react-toastify/dist/ReactToastify.css'
import Drawer from '../../containers/Drawer'
import React, { useEffect } from 'react'
import Routes from '../../containers/Routes'
import { ToastContainer } from 'react-toastify'
import { checkForUpdate } from '../../utils/messaging'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  body: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  }
})

export const AppLayout = () => {
  useEffect(() => {
    checkForUpdate()
  })

  const classes = useStyles()

  return (
    <div className={classes.body}>
      <div className={classes.root}>
        <Drawer />
        <Routes />
        <ToastContainer />
      </div>
    </div>
  )
}

export default AppLayout
