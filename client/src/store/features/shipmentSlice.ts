import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

interface ShipmentState {
  shipments: Array<any>;
  loading: boolean;
}

const initialState: ShipmentState = {
  shipments: [],
  loading: false,
};

export const getAllShipments = createAsyncThunk('shipment/getAll', async (_, thunkAPI) => {
  try {
    console.log('dispatching fetch all!');
    const response = await api.getAllShipments();
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
  },
});

export const { resetState } = shipmentSlice.actions;

export default shipmentSlice.reducer;
