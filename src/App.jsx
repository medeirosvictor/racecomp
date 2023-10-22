import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './App.css';
import Home from './Pages/Home';
import Leagues from './Pages/Leagues';
import CreateLeague from './Pages/CreateLeague';
import Profile from './Pages/Profile';
import Root from './Root';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import { AboutUs } from './Pages/AboutUs';
import { ContactUs } from './Pages/ContactUs';
import Login from './Pages/Login.jsx';
import { Page404 } from './Pages/Page404';
import { PrivacyPolicy } from './Pages/PrivacyPolicy';
import { TermsOfService } from './Pages/TermsOfService';
import { AuthContextProvider } from './Context/AuthContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route exact path="leagues" element={<ProtectedRoute><Leagues /></ProtectedRoute>} />
      <Route exact path="create-league" element={<ProtectedRoute><CreateLeague /> </ProtectedRoute>} />
      <Route path="login" element={<Login />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-of-service" element={<TermsOfService />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  )
);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
