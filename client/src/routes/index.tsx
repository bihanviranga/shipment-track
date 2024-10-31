import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';
import DashboardPage from '../pages/Dashboard';
import AppLayout from '../layouts/appLayout';
import CreateShipment from '../pages/CreateShipment';
import TrackPage from '../pages/Track';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/create',
        element: <CreateShipment />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/track/:trackingNumber',
    element: <TrackPage />,
  },
]);

export default router;
