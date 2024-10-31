import axiosClient from './axios';

const getAllShipments = async () => {
  return axiosClient.get('/shipment');
};

const createShipment = async (payload: any) => {
  return axiosClient.post('/shipment', payload);
};

const getAllStatus = async () => {
  return axiosClient.get('/status');
};

const updateShipment = async (shipmentID: string, payload: any) => {
  return axiosClient.put(`/shipment/${shipmentID}`, payload);
};

export default {
  getAllShipments,
  createShipment,
  getAllStatus,
  updateShipment,
};
