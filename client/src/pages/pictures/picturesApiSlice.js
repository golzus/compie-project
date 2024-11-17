import apiSlice from "../../app/apiSlice";

const picturesApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllImages: build.query({
            query: () => ({
                url: "/api/get-all-images"
            }),
            providesTags: ["Image"]
        }),
    })
})
export const { useGetAllImagesQuery
} = picturesApiSlice;