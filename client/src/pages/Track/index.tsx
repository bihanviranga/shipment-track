import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import api from '../../api/api';
import Navbar from '../../components/Navbar';

export default function TrackPage() {
  const params = useParams();
  const { trackingNumber } = params;

  const [data, setData] = useState([]);

  const getTrackingData = async (trackingNumber: string) => {
    const trackingData = await api.trackShipment(trackingNumber);
    setData(trackingData.data.data);
  };

  useEffect(() => {
    if (trackingNumber) {
      getTrackingData(trackingNumber);
    }
  }, [trackingNumber]);

  return (
    <Box>
      <Navbar />
      <Box sx={stylesMui.root}>
        <Typography sx={{ fontSize: '36px', fontWeight: 700 }}>Track Your Package</Typography>
        {!trackingNumber && <Typography>Invalid tracking number. Please check again!</Typography>}

        {data.length === 0 && <Typography>Loading data...</Typography>}
        <Box sx={{ mt: '50px', width: '50%' }}>
          <Typography>Tracking Number: {trackingNumber}</Typography>
          <Timeline>
            {data.map((item: any) => (
              <TimelineItem key={item.ID}>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Box>
                    <Typography>{item.shipmentStatus.name}</Typography>
                    <Typography>{new Date(item.createdAt).toLocaleString()}</Typography>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      </Box>
    </Box>
  );
}

const stylesMui = {
  root: {
    width: '80%',
    mx: 'auto',
    mt: '50px',
  },
};
