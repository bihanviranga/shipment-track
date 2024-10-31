import { Box, Divider } from '@mui/material';

interface AuthLayoutProps {
  children: JSX.Element;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.logoContainer}>
        <img src="dispatch.io-logo.png" alt="logo" height={128} />
        <Divider sx={{ width: '50%' }} />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}

const styles = {
  root: {
    height: '100vh',
    width: '100vw',
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    mx: 'auto',
    pt: '100px',
  },
};
