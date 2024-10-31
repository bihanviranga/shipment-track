import axiosClient from './axios';

const getAllShipments = async () => {
  return axiosClient.get('/shipment');
};

const createShipment = async (payload: any) => {
  return axiosClient.post('/shipment', payload);
};

export default {
  getAllShipments,
  createShipment,
};
