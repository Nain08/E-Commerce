import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Inject additional endpoints into the existing API slice
export const usersApiSlice = apiSlice.injectEndpoints({
  // Define endpoints using a builder object
  endpoints: (builder) => ({
    // Define a query endpoint to fetch products
    login: builder.mutation({
      // Specify the query function
      query: (data) => ({
        // Set the URL to USERS_URL/auth
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
      // Configure caching behavior to keep unused data for 5 seconds
      keepUnusedDataFor: 5,
    }),
    register: builder.mutation({
      query: (data) => ({
        // Set the URL to USERS_URL
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        method:"GET"
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    deleteUser:builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE"
      }),
    }), 
    getUserDetails:builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method:"GET"
      }),
      keepUnusedDataFor:5
    }),
    updateUser:builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body:data
      }),
      invalidatesTags:['Users']
    }), 
  }),
});

// Destructure and export the generated hooks for accessing the endpoints
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation
} = usersApiSlice;
