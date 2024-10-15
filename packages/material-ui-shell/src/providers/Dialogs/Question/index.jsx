import { useContext } from 'react'
import Context from './Context'
import Provider from './Provider'

function useQuestionsDialog() {
  return useContext(Context)
}

export {
  useQuestionsDialog,
  Context as QuestionsDialogContext,
  Provider as QuestionsDialogProvider,
}
