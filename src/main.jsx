import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
    <ToastContainer autoClose={3000} limit={1} />
  </React.StrictMode>
)
