import { useEffect } from 'react';
import { Box, Button, CircularProgress, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAllShipments, getAllStatus, updateShipment } from '../../store/features/shipmentSlice';
import styles from './dashboard.module.css';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const shipments = useAppSelector((state) => state.shipment.shipments);
  const loading = useAppSelector((state) => state.shipment.loading);
  const userInfo: any = useAppSelector((state) => state.auth.user);
  const status = useAppSelector((state) => state.shipment.status);
  const updatingShipmentID = useAppSelector((state) => state.shipment.updatingShipment);

  const isAdmin = userInfo?.role === 'ADMIN';

  const handleCreateButtonClick = () => {
    navigate('/create');
  };

  const handleStatusChange = (shipmentID: string, event: SelectChangeEvent) => {
    dispatch(updateShipment({ shipmentID, statusID: event.target.value }));
  };

  useEffect(() => {
    dispatch(getAllShipments());
    dispatch(getAllStatus());
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
            {shipments.map((shipment) => {
              if (shipment.shipmentID === updatingShipmentID) {
                return <tr key={shipment.shipmentID}>Loading..............</tr>;
              } else {
                return (
                  <tr key={shipment.shipmentID}>
                    <td>{shipment.recipientAddress}</td>
                    <td>{shipment.recipientName}</td>
                    <td>{shipment.trackingNumber}</td>
                    <td>
                      {isAdmin && status.length > 0 ? (
                        <Select
                          sx={{ height: '35px', width: '75%' }}
                          value={shipment.status.statusID}
                          onChange={(e) => {
                            handleStatusChange(shipment.shipmentID, e);
                          }}
                        >
                          {status.map((st) => (
                            <MenuItem key={st.statusID} value={st.statusID}>
                              {st.name}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        shipment.status.name
                      )}
                      {}
                    </td>
                    <td>{shipment.updatedAt}</td>
                  </tr>
                );
              }
            })}
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
