import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Inject additional endpoints into the existing API slice
export const productApiSlice = apiSlice.injectEndpoints({
  // Define endpoints using a builder object
  endpoints: (builder) => ({
    // Define a query endpoint to fetch products
    getProducts: builder.query({
      // Specify the query function
      query: () => ({
        // Set the URL to PRODUCTS_URL
        url: PRODUCTS_URL,
      }),
      // Configure caching behavior to keep unused data for 5 seconds
      keepUnusedDataFor: 5,
    }),
    // Define a query endpoint to fetch product details by ID
    getProductDetails: builder.query({
      // Specify the query function with productId as a parameter
      query: (productId) => ({
        // Construct the URL using PRODUCTS_URL and the productId
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      // Configure caching behavior to keep unused data for 5 seconds
      keepUnusedDataFor: 5,
    }),
  }),
});

// Destructure and export the generated hooks for accessing the endpoints
export const { useGetProductsQuery, useGetProductDetailsQuery } = productApiSlice;
