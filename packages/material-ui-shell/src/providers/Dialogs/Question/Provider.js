import PropTypes from 'prop-types'
import React, { useState, Fragment } from 'react'
import Context from './Context'
import QuestionDialog from 'material-ui-shell/lib/components/QuestionDialog/QuestionDialog'

const Provider = ({ children }) => {
  const [state, setState] = useState({ isOpen: false })
  const [isProcessing, setIsProcessing] = useState(false)

  const openDialog = (props) => {
    setState({ isOpen: true, ...props })
  }

  const closeDialog = () => {
    setState({ isOpen: false })
  }

  const setProcessing = (isProcessing) => {
    setIsProcessing(isProcessing)
  }

  return (
    <Context.Provider value={{ openDialog, closeDialog, setProcessing }}>
      <Fragment>
        {children}
        <QuestionDialog
          handleClose={closeDialog}
          isProcessing={isProcessing}
          {...state}
        />
      </Fragment>
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
