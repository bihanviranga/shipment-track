import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store';
import { login } from '../../store/features/authSlice';
import styles from './loginForm.module.css';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginState = useAppSelector((state) => state.auth.loginState);
  const loginMessage = useAppSelector((state) => state.auth.loginMessage);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const inputField = event.target.name;

    if (inputField === 'email') {
      setEmail(inputValue);
    } else if (inputField === 'password') {
      setPassword(inputValue);
    }
  };

  const clickHandler = () => {
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (loginState === 'success') {
      navigate('/');
    } else if (loginState === 'fail') {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: loginMessage || 'Failed to log in',
        confirmButtonColor: '#1976d2',
      });
    }
  }, [loginState]);

  return (
    <Box>
      <Box>
        <Typography sx={stylesMui.heading}>Login</Typography>
        <Typography sx={stylesMui.text}>Enter your credentials below.</Typography>
      </Box>

      <Box sx={stylesMui.fieldsContainer}>
        <input type="email" name="email" placeholder="Email" style={stylesMui.field} value={email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" style={stylesMui.field} value={password} onChange={handleChange} />
      </Box>

      <Box sx={stylesMui.buttonContainer}>
        {loginState === 'progress' && <CircularProgress />}
        <button className={styles.authButton} onClick={clickHandler}>
          Continue
        </button>
      </Box>
    </Box>
  );
}

const stylesMui = {
  heading: {
    fontSize: '36px',
    fontWeight: 700,
    textAlign: 'center',
  },

  text: {
    fontSize: '18px',
    textAlign: 'center',
  },

  fieldsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    mt: '20px',
  },

  field: {
    marginTop: '10px',
    marginBottom: '10px',
    height: '30px',
    fontSize: '18px',
    borderRadius: '10px',
    boxShadow: 'none',
    padding: '10px',
    border: '1px solid gray',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    mt: '10px',
  },
};
