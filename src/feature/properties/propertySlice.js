// src/features/properties/propertySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/properties');
      return response.data; // This is whatever your backend sends
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch properties');
    }
  }
);

const initialState = {
  properties: [], // ✅ Always start as array
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;

        // 🔍 Safely extract array from payload
        if (Array.isArray(action.payload)) {
          state.properties = action.payload;
        } else if (Array.isArray(action.payload.properties)) {
          state.properties = action.payload.properties;
        } else if (Array.isArray(action.payload.data)) {
          state.properties = action.payload.data;
        } else {
          console.warn('Unexpected properties payload format:', action.payload);
          state.properties = [];
        }
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default propertySlice.reducer;
export { fetchProperties };