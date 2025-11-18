import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithTokenCheck from "../base.query";
import { CategoryI, SubCategoryI } from "./types";

// Category API
export const categoryApi = createApi({
  baseQuery: baseQueryWithTokenCheck,
  reducerPath: "categoryApi",
  endpoints: (builder) => ({
    addCategory: builder.mutation<
      CategoryI,
      Pick<CategoryI, "name"> & { image: File }
    >({
      query: (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
            formData.append("image", data.image);
            
       

        return {
          url: "/category/admin",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      transformResponse: (response: { data: CategoryI }) => response.data,
    }),
    getAllCategories: builder.query<CategoryI[], void>({
      query: () => ({
        url: "/category/admin",
      }),
      transformResponse: (response: { data: CategoryI[] }) => response.data,
    }),
    getCategory: builder.query<CategoryI, string>({
      query: (categoryId) => ({
        url: `/category/${categoryId}/admin-category`,
      }),
      transformResponse: (response: { data: CategoryI }) => response.data,
    }),
    updateCategory: builder.mutation<
      void,
      { categoryId: string; data: Partial<Pick<CategoryI,'name'>&{image:File}> }
    >({
      query: ({ categoryId, data }) => ({
        url: `/category/${categoryId}/admin-category`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (categoryId) => ({
        url: `/category/${categoryId}/admin-category`,
        method: "DELETE",
      }),
    }),
  }),
});

// SubCategory API
export const subCategoryApi = createApi({
  baseQuery: baseQueryWithTokenCheck,
  reducerPath: "subCategoryApi",
  endpoints: (builder) => ({
      addSubCategory: builder.mutation<SubCategoryI, Pick<SubCategoryI, 'name' | 'category'> & {
        image: File;
    }>({
      query: (data) => {
                const formData = new FormData();
                formData.append("name", data.name);
                
                formData.append("category", data.category);
                formData.append("image", data.image);
        
            return ({
        url: "/sub-category/admin",
        method: "POST",
                body: formData,
        
      })},
      transformResponse: (response: { data: SubCategoryI }) => response.data,
    }),
    getAllSubCategories: builder.query<SubCategoryI[], void>({
      query: () => ({
        url: "/sub-category/admin",
      }),
      transformResponse: (response: { data: SubCategoryI[] }) => response.data,
    }),
    getSubCategory: builder.query<SubCategoryI, string>({
      query: (subCategoryId) => ({
        url: `/sub-category/${subCategoryId}/admin-sub-category`,
      }),
      transformResponse: (response: { data: SubCategoryI }) => response.data,
    }),
    updateSubCategory: builder.mutation<
      void,
      { subCategoryId: string; data: Partial<SubCategoryI> }
    >({
      query: ({ subCategoryId, data }) => ({
        url: `/sub-category/${subCategoryId}/admin-sub-category`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteSubCategory: builder.mutation<void, string>({
      query: (subCategoryId) => ({
        url: `/sub-category/${subCategoryId}/admin-sub-category`,
        method: "DELETE",
      }),
    }),
  }),
});

// Hooks
export const {
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

export const {
  useAddSubCategoryMutation,
  useGetAllSubCategoriesQuery,
  useGetSubCategoryQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
