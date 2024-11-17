import apiSlice from "../../app/apiSlice";

const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // endpoint לשליפת ההודעות
    getMessages: build.query({
      query: (imageId) => ({
        url: `/api/messages/get-messages/${imageId}`, // ודא שהנתיב נכון
      }),
      providesTags: ['Message'], // תגיות לשימוש בעדכון cache
    }),
    // endpoint לשליחת הודעה חדשה
    sendMessage: build.mutation({
      query: (messageData) => ({
        url: '/api/messages/send-message', // הנתיב לשליחת הודעה
        method: 'POST', // שימוש בשיטת POST
        body: messageData, // נתוני ההודעה שנשלחים בגוף הבקשה
      }),
      invalidatesTags: ['Message'], // invalidation של cache כשיש שינוי
    }),
  }),
});
export default messageApiSlice.reducer;
export const { useGetMessagesQuery, useSendMessageMutation } = messageApiSlice;
