import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const AUTH_API_BASE = 'http://localhost:8000/api/v1/auth';

interface AuthState {
  loginState: 'success' | 'fail' | 'progress' | null;
  loginMessage: string | null;
}

const initialState: AuthState = {
  loginState: null,
  loginMessage: null,
};

export const login = createAsyncThunk('auth/login', async (loginInput: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE}/login`, loginInput);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
});

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginState = 'success';
      state.loginMessage = null;
      localStorage.setItem('token', action.payload.data.token);
    });

    builder.addCase(login.pending, (state) => {
      state.loginMessage = null;
      state.loginState = 'progress';
    });

    builder.addCase(login.rejected, (state, action: any) => {
      state.loginState = 'fail';
      state.loginMessage = action.payload;
    });
  },
});

export default authSlice.reducer;
