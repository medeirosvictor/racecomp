import './App.css'
import Home from './Pages/Home'
import Leagues from './Pages/Leagues'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from './Root'
import useScript from './hooks/useScript.js'
import { AuthContextProvider } from './context/AuthContext';
import Profile from './Pages/Profile';
import ProtectedRoute from './Components/ProtectedRoute';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="leagues" element={<Leagues />} />
      <Route path="profile" element={ <ProtectedRoute><Profile /></ProtectedRoute>} />
    </Route>
  )
)

function App() {
  useScript('https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js')

  return (
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
  )
}

export default App
