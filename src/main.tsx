import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/global.css'
import App from './app/App'
import ErrorBoundary from './app/providers/ErrorBoundary'

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find root element. Ensure a <div id="root"> exists in index.html.');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
