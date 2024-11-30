import React from 'react'

export interface DialogsContextType {
  /**
   * @description Open dialog - sets isOpen to true, and pass additional props
   * @param props
   */
  openDialog: (props: any) => void

  /**
   * @description Closes dialog - sets isOpen to false
   * @param name
   * @param offset
   */
  closeDialog: () => void
  /**
   * @description Set processing to true or false
   * @param isProcessing
   */
  setProcessing: (isProcessing: boolean) => void
}

export const Context = React.createContext<DialogsContextType | undefined>(
  undefined
)

export default Context
