import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

interface ShipmentState {
  shipments: Array<any>;
  loading: boolean;
  status: Array<any>;
  updatingShipment: string | null;
}

const initialState: ShipmentState = {
  shipments: [],
  loading: false,
  status: [],
  updatingShipment: null,
};

export const getAllShipments = createAsyncThunk('shipment/getAll', async (_, thunkAPI) => {
  try {
    const response = await api.getAllShipments();
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createShipment = createAsyncThunk('shipment/create', async (payload: any, thunkAPI) => {
  try {
    const response = await api.createShipment(payload);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.resposne.data);
  }
});

export const getAllStatus = createAsyncThunk('shipment/statusAll', async (_, thunkAPI) => {
  try {
    const response = await api.getAllStatus();
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateShipment = createAsyncThunk('shipment/update', async (payload: any, thunkAPI) => {
  try {
    const response = await api.updateShipment(payload.shipmentID, { statusID: payload.statusID });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const trackShipment = createAsyncThunk('shipment/track', async (payload: any, thunkAPI) => {
  try {
    const response = await api.trackShipment(payload);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const shipmentSlice = createSlice({
  name: 'shipmentSlice',
  initialState,
  reducers: {
    resetState: (state) => {
      state.shipments = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Get all shipments
    builder.addCase(getAllShipments.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllShipments.fulfilled, (state, action) => {
      state.loading = false;
      state.shipments = action.payload.data;
    });

    builder.addCase(getAllShipments.rejected, (state) => {
      state.loading = false;
    });

    // Create shipment
    builder.addCase(createShipment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createShipment.fulfilled, (state, action) => {
      state.loading = false;
      const newShipments = [...state.shipments, action.payload.shipment];
      state.shipments = newShipments;
    });

    builder.addCase(createShipment.rejected, (state) => {
      state.loading = false;
    });

    // Get all status
    builder.addCase(getAllStatus.fulfilled, (state, action) => {
      state.status = action.payload.data;
    });

    // Update shipment
    builder.addCase(updateShipment.pending, (state, action) => {
      state.updatingShipment = action.meta.arg.shipmentID;
    });

    builder.addCase(updateShipment.fulfilled, (state, action) => {
      const updatedShipment = action.payload.data;
      const newShipments = state.shipments.map((shipment) => {
        if (shipment.shipmentID === updatedShipment.shipmentID) {
          return updatedShipment;
        }
        return shipment;
      });
      state.shipments = newShipments;
      state.updatingShipment = null;
    });

    builder.addCase(updateShipment.rejected, (state) => {
      state.updatingShipment = null;
    });
  },
});

export const { resetState } = shipmentSlice.actions;

export default shipmentSlice.reducer;
