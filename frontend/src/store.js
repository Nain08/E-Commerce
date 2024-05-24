import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from './slices/cartSlice'
import authSliceReducer from "./slices/authSlice";

// Configure the Redux store
const store = configureStore({
  // Define reducers for the store
  reducer: {
    // Use the reducer from the apiSlice for managing API-related state
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart:cartSliceReducer,
    auth:authSliceReducer,
  },
  // Define middleware for the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // Enable Redux DevTools extension for debugging
  devTools: true,
});

// Export the configured Redux store
export default store;
