import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const AUTH_API_BASE = 'http://localhost:8000/api/v1/auth';

interface AuthState {
  loginState: 'success' | 'fail' | 'progress' | null;
  signUpState: 'success' | 'fail' | 'progress' | null;
  authMessage: string | null;
}

const initialState: AuthState = {
  loginState: null,
  signUpState: null,
  authMessage: null,
};

export const login = createAsyncThunk('auth/login', async (loginInput: { email: string; password: string }, thunkAPI) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE}/login`, loginInput);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const signUp = createAsyncThunk('auth/signUp', async (signUpInput: any, thunkAPI) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE}/register`, signUpInput);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login reducers
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.data.token);
      state.loginState = 'success';
      state.authMessage = null;
    });

    builder.addCase(login.pending, (state) => {
      state.authMessage = null;
      state.loginState = 'progress';
    });

    builder.addCase(login.rejected, (state, action: any) => {
      state.loginState = 'fail';
      state.authMessage = action.payload.message;
    });

    // Sign Up reducers
    builder.addCase(signUp.fulfilled, (state) => {
      state.signUpState = 'success';
      state.authMessage = null;
    });

    builder.addCase(signUp.pending, (state) => {
      state.authMessage = null;
      state.signUpState = 'progress';
    });

    builder.addCase(signUp.rejected, (state, action: any) => {
      state.signUpState = 'fail';
      state.authMessage = action.payload;
    });
  },
});

export default authSlice.reducer;
