import { Box } from '@mui/material';
import LoginForm from '../../components/LoginForm';
import AuthLayout from '../../layouts/authLayout';

export default function Login() {
  return (
    <AuthLayout>
      <Box sx={styles.root}>
        <Box sx={styles.formContainer}>
          <LoginForm />
        </Box>
      </Box>
    </AuthLayout>
  );
}

const styles = {
  root: {
    width: '50%',
    height: '100%',
    mx: 'auto',
    backgroundColor: 'white',
  },

  formContainer: {
    pt: '70px',
  },
};
