import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../store';
import { signUp } from '../../store/features/authSlice';
import styles from './signUpForm.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signUpState = useAppSelector((state) => state.auth.signUpState);
  const authMessage = useAppSelector((state) => state.auth.authMessage);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const inputField = event.target.name;

    if (inputField === 'email') {
      setEmail(inputValue);
    } else if (inputField === 'password') {
      setPassword(inputValue);
    } else if (inputField === 'name') {
      setName(inputValue);
    } else if (inputField === 'address') {
      setAddress(inputValue);
    }
  };

  const clickHandler = () => {
    dispatch(signUp({ email, password, name, address }));
  };

  useEffect(() => {
    if (signUpState === 'success') {
      Swal.fire({
        title: 'Signed Up!',
        text: 'You can now log in.',
        confirmButtonColor: '#1976d2',
      }).then(() => {
        navigate('/login');
      });
    } else if (signUpState === 'fail') {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: authMessage || 'Failed to log in',
        confirmButtonColor: '#1976d2',
      });
    }
  }, [signUpState]);

  return (
    <Box>
      <Box>
        <Typography sx={stylesMui.heading}>Sign Up</Typography>
        <Typography sx={stylesMui.text}>Start using dispatch.io today</Typography>
      </Box>

      <Box sx={stylesMui.fieldsContainer}>
        <input type="text" name="name" placeholder="Name" style={stylesMui.field} value={name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" style={stylesMui.field} value={email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" style={stylesMui.field} value={password} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" style={stylesMui.field} value={address} onChange={handleChange} />
      </Box>

      <Box sx={stylesMui.buttonContainer}>
        {signUpState === 'progress' && <CircularProgress />}
        <button className={styles.authButton} onClick={clickHandler}>
          Continue
        </button>
        <Typography sx={stylesMui.message}>
          Already have an account? <Link to="/login">Login</Link>.
        </Typography>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mt: '10px',
  },

  message: {
    mt: '10px',
  },
};
