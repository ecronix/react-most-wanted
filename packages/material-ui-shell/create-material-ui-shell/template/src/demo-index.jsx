import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppContainer } from '@ecronix/base-shell'
import config from './config'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContainer config={config} />
  </StrictMode>
)
