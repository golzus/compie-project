import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import messagesReducer from "../pages/dialog/messagesSlice"; // עכשיו זה אמור לעבוד

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    messages: messagesReducer, // הוספת ה-Slice של ההודעות ל-Store
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // אפשר את devTools לפיתוח
});

export default store;
