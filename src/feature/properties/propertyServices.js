// src/features/properties/propertySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { propertyService } from './propertyService';

// ... (all your thunks and slice logic)

const initialState = { /* ... */ };

export const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: { /* ... */ },
  extraReducers: (builder) => { /* ... */ }
});

export const { reset } = propertySlice.actions;
export default propertySlice.reducer; // ← REQUIRED for default import