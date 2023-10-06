import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home.jsx'
import Leagues from './Pages/Leagues.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/leagues" element={<Leagues />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID || ''}
    >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
