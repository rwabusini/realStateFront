import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/auth/authSlice';
import propertyReducer from '../feature/properties/propertySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
  },
});