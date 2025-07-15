import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Layout/App.tsx'
import { reduxStore } from "./redux/store"
import { Provider } from 'react-redux'
import AuthProvider from './contex/Auth.tsx'
import ErrorBoundary from './components/ErrorBoundry/index.tsx'


createRoot(document.getElementById('root')!).render(
  <Provider store={reduxStore}>
    <AuthProvider>
      <ErrorBoundary>
       <App />
      </ErrorBoundary>
    </AuthProvider>
  </Provider>

)
