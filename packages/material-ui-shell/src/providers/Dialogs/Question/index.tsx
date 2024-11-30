import { useContext } from 'react'
import Context from './Context'
import Provider from './Provider'

function useQuestionsDialog() {
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
