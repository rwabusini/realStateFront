import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi } from '../auth/authServices';

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await loginApi(user);
  } catch (error) {
    console.error('🔥 API Error:', error); // 👈 ADD THIS

    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || 'Login failed'
    );
  }
});

const initialState = {
  user: null,
  token: localStorage.getItem('authToken'),
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    logout: (state) => {
      localStorage.removeItem('authToken');
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('authToken', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;