import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import * as jose from 'jose';
import Navbar from '../components/Navbar';
import { useAppDispatch } from '../store';
import { setUser } from '../store/features/authSlice';

const JWT_SECRET = (process.env.REACT_APP_JWT_SECRET || '') as string;

export default function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const verifyJWT = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Verify the token
        try {
          const encoder = new TextEncoder();
          const secretKeyBuffer = encoder.encode(JWT_SECRET);
          const { payload, protectedHeader } = await jose.jwtVerify(token, secretKeyBuffer);
          console.log('Verified payload:', payload);
          console.log('Protected header:', protectedHeader);
          dispatch(setUser(payload));
        } catch (err) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          console.error('Error verifying token:', err);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    verifyJWT();
  }, []);

  return (
    <Box>
      <Navbar />
      <Box sx={{ mt: '50px' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
