import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import * as jose from 'jose';

const JWT_SECRET = (process.env.REACT_APP_JWT_SECRET || '') as string;

export default function AppLayout() {
  const navigate = useNavigate();

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
        } catch (err) {
          // Token is invalid or expired
          console.error('Error verifying token:', err);
          navigate('/login');
        }
      }
    };

    verifyJWT();
  }, []);

  return (
    <Box>
      <Typography>Layout!!!</Typography>
      <Outlet />
    </Box>
  );
}
