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
import { AuthContextProvider } from './context/AuthContext';
import Profile from './Pages/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Pages/Login.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="leagues" element={<Leagues />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={ <ProtectedRoute><Profile /></ProtectedRoute>} />
    </Route>
  )
)

function App() {
  return (
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
  )
}

export default App
