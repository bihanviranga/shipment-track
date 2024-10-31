import { Box } from '@mui/material';

interface AuthLayoutProps {
  children: JSX.Element;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <Box sx={styles.root}>{children}</Box>;
}

const styles = {
  root: {
    background: 'aliceblue',
    height: '100vh',
    width: '100vw',
  },
};
