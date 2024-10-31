import axiosClient from './axios';

const getAllShipments = async () => {
  return axiosClient.get('/shipment');
};

export default {
  getAllShipments,
};
