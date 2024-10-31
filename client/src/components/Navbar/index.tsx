import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { resetUser } from '../../store/features/authSlice';
import { resetState } from '../../store/features/shipmentSlice';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(resetState());
    dispatch(resetUser());
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styles.appbar}>
        <Toolbar>
          <img src="dispatch.io-logo.png" height={64} alt="logo" />
          {userInfo && (
            <Typography sx={styles.logoutButton} onClick={handleLogout}>
              Log Out
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const styles = {
  appbar: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#FFF6E3',
  },

  logoutButton: {
    ml: 'auto',
    color: 'black',
    cursor: 'pointer',
  },
};
