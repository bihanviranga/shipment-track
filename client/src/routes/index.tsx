import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';
import LandingPage from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
]);

export default router;
