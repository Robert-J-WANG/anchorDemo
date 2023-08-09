import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom' // Import BrowserRouter
import './index.css'
import App from './App'
// import * as serviceWorker from './serviceWorker'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
