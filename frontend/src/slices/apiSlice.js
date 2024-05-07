
// this setup provides the foundation for defining and managing API endpoints using @reduxjs/toolkit/query/react. You would typically define your API endpoints inside the endpoints object, specifying the request methods, URL paths, request bodies, and other configurations specific to each endpoint.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// Create a base query function using fetchBaseQuery with the baseUrl specified
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create an API slice using createApi
export const apiSlice = createApi({
  // Provide the base query function
  baseQuery: baseQuery,
  // Define tag types for entities managed by the API slice
  tagTypes: ['Product', 'Order', 'User'],
  // Define API endpoints using the builder
  endpoints: (builder) => ({
    // Endpoints will be defined here
  }),
});
