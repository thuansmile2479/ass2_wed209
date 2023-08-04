import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const productApi = createApi({
    reducerPatch: "productApi",
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...args) => {
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
			query: () => `product`,
            providesTags(result) {
                return [{ type: "Products", id: 'LIST' }]
            }
        }),
        getProduct: builder.query({
            query: (slup) => `product/${slup}`
        }),
        deleteProduct: builder.mutation({
            query: (id) => {
                return {
                    url: `product/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: (result, error, body) => [{ type: "Products", id: 'LIST' }]
        }),
        createProduct: builder.mutation({
            query: (payload) => {
                return {
                    url: 'product',
                    method: "POST",
                    body: payload,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data");
                        return headers;
                    },
                    formData: true,
                }
            },
            invalidatesTags: (result, error, body) => [{ type: "Products", id: 'LIST' }]
        }),
        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `product/${id}`,
                method: "PUT",
                body: formData,
                prepareHeaders: (headers) => {
                    headers.set("COntent-Type", "multipart/form-data");
                    return headers;
                },
                formData: true
            }),
            invalidatesTags: (result, error, body) => [{ type: "Products", id: 'LIST' }]
        })
    })
})

export const { useGetProductQuery, useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation } = productApi
export default productApi