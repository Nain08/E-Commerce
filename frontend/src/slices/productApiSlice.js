import { PRODUCTS_URL,UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Inject additional endpoints into the existing API slice
export const productApiSlice = apiSlice.injectEndpoints({
  // Define endpoints using a builder object
  endpoints: (builder) => ({
    // Define a query endpoint to fetch products
    getProducts: builder.query({
      // Specify the query function
      query: ({keyword,pageNumber}) => ({
        // Set the URL to PRODUCTS_URL
        url: PRODUCTS_URL,
        params:{
          keyword,
          pageNumber,
        }
      }),
      providesTags:["Products"],
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
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct:builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
        
      }),
    }),
    createReview: builder.mutation({
      query:(data)=>({
        url:`${PRODUCTS_URL}/${data.productId}/reviews`,
        method:'POST',
        body:data,
      }),
      invalidatesTags:['Product']
    }),
    getTopProducts:builder.query({
      query:()=>({
        url:`${PRODUCTS_URL}/top`
      }),
      keepUnusedDataFor:5
    })
  }),
});

// Destructure and export the generated hooks for accessing the endpoints
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery
} = productApiSlice;
