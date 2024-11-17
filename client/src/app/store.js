// store.js
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
      
    },
       
    
    middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiSlice.middleware),
    devTools: false//לא שלכוח לשנות בהמשך לfalse


   
    
});

export default store; 
