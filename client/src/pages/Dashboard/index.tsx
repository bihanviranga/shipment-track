import { useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAllShipments } from '../../store/features/shipmentSlice';
import styles from './dashboard.module.css';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const shipments = useAppSelector((state) => state.shipment.shipments);
  const loading = useAppSelector((state) => state.shipment.loading);

  const handleCreateButtonClick = () => {
    navigate('/create');
  };

  useEffect(() => {
    dispatch(getAllShipments());
  }, []);

  return (
    <Box sx={stylesMui.root}>
      <Box sx={stylesMui.topRow}>
        <Typography>Dashboard</Typography>
        {loading && <CircularProgress />}
        <Button sx={{ ml: 'auto' }} onClick={handleCreateButtonClick}>
          Create Shipment
        </Button>
      </Box>

      <Box sx={stylesMui.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Recipient Address</td>
              <td>Recipient Name</td>
              <td>Tracking Number</td>
              <td>Status</td>
              <td>Last Updated</td>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.shipmentID}>
                <td>{shipment.recipientAddress}</td>
                <td>{shipment.recipientName}</td>
                <td>{shipment.trackingNumber}</td>
                <td>{shipment.status.name}</td>
                <td>{shipment.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {shipments.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: '20px' }}>
            <Typography sx={{ textAlign: 'center' }}>No data found.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

const stylesMui = {
  root: {
    width: '80%',
    mx: 'auto',
  },

  tableContainer: {
    width: '100%',
  },

  topRow: {
    display: 'flex',
    alignItems: 'center',
    mb: '10px',
  },
};
