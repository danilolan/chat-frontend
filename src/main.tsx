import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/index'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
