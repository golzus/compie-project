import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
//  baseUrl: 'http://localhost:1000',
 baseUrl: 'https://java-springboot-owxn.onrender.com'
})
const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({}),
});

export default apiSlice;
