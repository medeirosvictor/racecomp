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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="leagues" element={<Leagues />} />
    </Route>
  )
)

function App() {
  useScript('https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js')

  return (
      <RouterProvider router={router} />
  )
}

export default App
