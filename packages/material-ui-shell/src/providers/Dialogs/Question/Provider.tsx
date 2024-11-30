import React, { useState, Fragment } from 'react'
import Context from './Context'
import QuestionDialog from '../../../components/QuestionDialog'
import { IProviderProps } from '@ecronix/material-ui-shell/common.type'

const Provider: React.FC<IProviderProps> = ({ children }) => {
  const [state, setState] = useState({ isOpen: false })
  const [isProcessing, setIsProcessing] = useState(false)

  const openDialog = (props: any) => {
    setState({ isOpen: true, ...props })
  }

  const closeDialog = () => {
    setState({ isOpen: false })
  }

  const setProcessing = (isProcessing: boolean) => {
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

export default Provider
