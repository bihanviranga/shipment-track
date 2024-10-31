import { Box, Typography } from '@mui/material';

export default function LoginForm() {
  return (
    <Box>
      <Typography sx={styles.heading}>Login</Typography>
      <Typography sx={styles.text}>Enter your credentials below.</Typography>
    </Box>
  );
}

const styles = {
  heading: {
    fontSize: '36px',
    fontWeight: 700,
  },

  text: {
    fontSize: '18px',
  },
};
