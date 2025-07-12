import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Layout/App.tsx'
import { reduxStore } from "./redux/store"
import { Provider } from 'react-redux'
import AuthProvider from './contex/Auth.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <AuthProvider>
      <App />
      </AuthProvider>
    </Provider>
  
  </StrictMode>,
)
