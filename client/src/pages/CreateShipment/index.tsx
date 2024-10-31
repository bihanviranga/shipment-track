import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store';
import { createShipment } from '../../store/features/shipmentSlice';
import { useNavigate } from 'react-router-dom';

export default function CreateShipment() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userInfo: any = useAppSelector((state) => state.auth.user);

  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const inputField = event.target.name;

    if (inputField === 'recipientName') {
      setRecipientName(inputValue);
    } else if (inputField === 'recipientAddress') {
      setRecipientAddress(inputValue);
    } else if (inputField === 'trackingNumber') {
      setTrackingNumber(inputValue);
    }
  };

  const handleCreateButtonClick = async () => {
    const payload = {
      recipientName,
      recipientAddress,
      trackingNumber,
    };
    await dispatch(createShipment(payload));
    navigate('/');
  };

  return (
    <Box sx={stylesMui.root}>
      <Typography sx={{ mb: '40px' }}>Create Shipment</Typography>
      <Box sx={stylesMui.formContainer}>
        <label htmlFor="senderName" style={stylesMui.label}>
          Sender Name
        </label>
        <input type="text" name="senderName" style={stylesMui.fieldDisabled} disabled value={userInfo?.name} />

        <label htmlFor="senderAddress" style={stylesMui.label}>
          Sender Address
        </label>
        <input type="text" name="senderAddress" style={stylesMui.fieldDisabled} disabled value={userInfo.address} />

        <label htmlFor="recipientName" style={stylesMui.label}>
          Recipient Name
        </label>
        <input type="text" name="recipientName" value={recipientName} onChange={handleChange} style={stylesMui.field} placeholder="Recipient Name" />

        <label htmlFor="recipientAddress" style={stylesMui.label}>
          Recipient Address
        </label>
        <input
          type="text"
          name="recipientAddress"
          value={recipientAddress}
          onChange={handleChange}
          style={stylesMui.field}
          placeholder="Recipient Address"
        />

        <label htmlFor="trackingNumber" style={stylesMui.label}>
          Tracking Number
        </label>
        <input
          type="text"
          name="trackingNumber"
          value={trackingNumber}
          onChange={handleChange}
          style={stylesMui.field}
          placeholder="Tracking Number"
        />

        <Button variant="contained" sx={stylesMui.button} onClick={handleCreateButtonClick}>
          Create
        </Button>
      </Box>
    </Box>
  );
}

const stylesMui = {
  root: {
    width: '80%',
    mx: 'auto',
  },

  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },

  field: {
    marginTop: '10px',
    marginBottom: '40px',
    height: '30px',
    fontSize: '18px',
    borderRadius: '10px',
    boxShadow: 'none',
    padding: '10px',
    border: '1px solid gray',
  },

  fieldDisabled: {
    marginTop: '10px',
    marginBottom: '40px',
    height: '30px',
    fontSize: '18px',
    borderRadius: '10px',
    boxShadow: 'none',
    padding: '10px',
    border: '1px solid gray',
    backgroundColor: 'lightgrey',
  },

  label: {
    lineHeight: 0,
  },

  button: {
    height: '50px',
    borderRadius: '10px',
    fontSize: '18px',
  },
};
