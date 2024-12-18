import { useContext } from 'react'
import Context, { DialogsContextType } from './Context'
import Provider from './Provider'

/**
 * Custom hook to access the question dialog context.
 *
 * @function
 * @returns {DialogsContextType} The theme context value.
 * @throws {Error} If used outside of an QuestionsDialogProvider.
 * @example
 *  const { openDialog, closeDialog, setProcessing } = useQuestionsDialog();
 *
 * @description Gives you access to questions dialog. It must be used within QuestionsDialogProvider and it provides you
 * with methods for opening and closing dialog, as well as handling processing
 *
 */
function useQuestionsDialog(): DialogsContextType {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error(
      'useQuestionsDialog must be used within a QuestionsDialogProvider'
    )
  }
  return context
}

export {
  useQuestionsDialog,
  Context as QuestionsDialogContext,
  Provider as QuestionsDialogProvider,
}
