import { Box } from '@mui/material';
import SignUpForm from '../../components/SignUpForm';
import AuthLayout from '../../layouts/authLayout';

export default function SignUp() {
  return (
    <AuthLayout>
      <Box sx={styles.root}>
        <Box sx={styles.formContainer}>
          <SignUpForm />
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
