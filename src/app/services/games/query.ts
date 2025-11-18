import { BASE_URL } from "@/app/config";
import { setAssetsUploadProgress, setGameVersionUploadProgress, setUploadProgress } from "@/app/slices/games/games.slice";
import { errorToast, successToast } from "@/components/utilities/toaster";
import { getLocalAuthData } from "@/components/utilities/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import dayjs from "dayjs";
import baseQueryWithTokenCheck from "../base.query";

// Games API
export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: baseQueryWithTokenCheck,
  tagTypes: ["Games", "GameAssets", "GameVersions", "SystemRequirements"],
  endpoints: (builder) => ({



    // Game CRUD operations
    createGame: builder.mutation({


 async queryFn(file, api) {
        return new Promise((resolve, reject) => {

          const { token,expireTime } = getLocalAuthData();
          const xhr = new XMLHttpRequest();
          xhr.open("POST", `${BASE_URL}/games/game`);
          xhr.withCredentials = true;
          if (token || dayjs().isBefore(dayjs(expireTime))) {
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
          } else {
            window.location.href = "/logout";
          }

             
         
         

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
            
              api.dispatch(setUploadProgress(progress)); // Update progress in the store
            }
          };

          xhr.onload = () => {

            const message = JSON.parse(xhr.responseText)?.message;
            if (xhr.status >= 200 && xhr.status < 300) {
              successToast(message ||"Game uploaded successfully");
              resolve({ data: JSON.parse(xhr.responseText) });
            } else {
              errorToast(message || "Upload failed", { duration: Infinity });
              reject({ error: JSON.parse(xhr.responseText) });
            }
          };

          xhr.onerror = () => reject({ error: 'Upload failed' });

          xhr.send(file);
        });
      },
      


      // query: (formData) => ({
      //   url: "/games/game",
      //   method: "POST",
      //       body: formData,
      //   useFormData: true,
      // }),
      // transformResponse: (response) => response.data,
      // invalidatesTags: ["Games"],
    }),

    getGames: builder.query({
      query: (params) => ({
        url: `/games/game`,
        params,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Games"],
    }),

    getGameById: builder.query({
      query: (id) => `/games/game/get/${id}`,
      transformResponse: (response) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Games", id }],
    }),

    updateGame: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/games/game/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: (_result, _error, { id }) => [{ type: "Games", id }],
    }),

    deleteGame: builder.mutation({
      query: (id) => ({
        url: `/games/game/delete/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Games"],
    }),

    // Developer specific endpoints
    getGamesByDev: builder.query({
      query: () => "/games/game/developer/get/all",
      transformResponse: (response) => response.data,
      providesTags: ["Games"],
    }),

    getGameByDevId: builder.query({
      query: (id) => `/games/game/developer/get/${id}/one`,
      transformResponse: (response) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Games", id }],
    }),

    updateGameByDev: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/games/game/developer/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: (_result, _error, { id }) => [{ type: "Games", id }],
    }),

    deleteGameByDev: builder.mutation({
      query: (id) => ({
        url: `/games/game/developer/delete/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Games"],
    }),
  }),
});

// Game Assets API
export const gameAssetsApi = createApi({
  reducerPath: "gameAssetsApi",
  baseQuery: baseQueryWithTokenCheck,
  tagTypes: ["GameAssets"],
  endpoints: (builder) => ({
    createGameAsset: builder.mutation({
   
      invalidatesTags: ["GameAssets"],

      async queryFn({ gameId, file }, api) {
        return new Promise((resolve, reject) => {
          const { token, expireTime } = getLocalAuthData();
          const xhr = new XMLHttpRequest();
          xhr.open("POST", `${BASE_URL}/games/game-assets/${gameId}`);
          xhr.withCredentials = true;
          if (token || dayjs().isBefore(dayjs(expireTime))) {
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
          } else {
            window.location.href = "/logout";
          }

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);

              api.dispatch(setAssetsUploadProgress(progress)); // Update progress in the store
            }
          };

          xhr.onload = () => {
            const message = JSON.parse(xhr.responseText)?.message;
            if (xhr.status >= 200 && xhr.status < 300) {
              successToast(message || "Assets uploaded successfully");
              resolve({ data: JSON.parse(xhr.responseText) });
            } else {
              errorToast(message || "asset upload failed", { duration: Infinity });
              reject({ error: JSON.parse(xhr.responseText) });
            }
          };

          xhr.onerror = () => reject({ error: "Upload failed" });

          xhr.send(file);
        });
      },
    }),

    getGameAssets: builder.query({
      query: (params) => ({
        url: "/games/game-assets",
        params,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["GameAssets"],
    }),

    updateGameAsset: builder.mutation({
      query: ({ id, assetId, ...data }) => ({
        url: `/games/game-assets/update/${id}/${assetId}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["GameAssets"],
    }),

    deleteGameAsset: builder.mutation({
      query: ({ id, assetId }) => ({
        url: `/games/game-assets/delete/${id}/${assetId}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["GameAssets"],
    }),

    // Developer specific endpoints
    getGameAssetByDevId: builder.query({
      query: (assetId) => `/games/game-assets/developer/get/asset/${assetId}`,
      transformResponse: (response) => response.data,
      providesTags: (_result, _error, assetId) => [
        { type: "GameAssets", id: assetId },
      ],
    }),

    getGameAssetsByGameIdAndDevId: builder.query({
      query: (gameId) => `/games/game-assets/developer/get/assets/${gameId}`,
      transformResponse: (response) => response.data,
      providesTags: ["GameAssets"],
    }),
  }),
});

// System Requirements API
export const systemRequirementsApi = createApi({
  reducerPath: "systemRequirementsApi",
  baseQuery: baseQueryWithTokenCheck,
  tagTypes: ["SystemRequirements"],
  endpoints: (builder) => ({
    createSystemRequirements: builder.mutation({
      query: ({ gameId, ...data }) => ({
        url: `/games/system-requirements/${gameId}`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["SystemRequirements"],
    }),

    getSystemRequirements: builder.query({
      query: (gameId) => `/games/system-requirements/${gameId}`,
      transformResponse: (response) => response.data,
      providesTags: ["SystemRequirements"],
    }),

    updateSystemRequirements: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/games/system-requirements/get/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["SystemRequirements"],
    }),

    // Developer specific endpoints
    getSystemRequirementsByDevId: builder.query({
      query: (gameId) => `/games/system-requirements/developer/${gameId}/all`,
      transformResponse: (response) => response.data,
      providesTags: ["SystemRequirements"],
    }),

    updateSystemRequirementsByDevId: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/games/system-requirements/developer/get/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["SystemRequirements"],
    }),
  }),
});

// Game Versions API
export const gameVersionsApi = createApi({
  reducerPath: "gameVersionsApi",
  baseQuery: baseQueryWithTokenCheck,
  tagTypes: ["GameVersions"],
  endpoints: (builder) => ({


    createGameVersion: builder.mutation({
   

      async queryFn({gameId, file}, api) {
        return new Promise((resolve, reject) => {
          const { token, expireTime } = getLocalAuthData();
          const xhr = new XMLHttpRequest();
          xhr.open("POST", `${BASE_URL}/games/game-version/${gameId}`);
          xhr.withCredentials = true;
          if (token || dayjs().isBefore(dayjs(expireTime))) {
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
          } else {
            window.location.href = "/logout";
          }

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);

              api.dispatch(setGameVersionUploadProgress(progress)); // Update progress in the store
            }
          };

          xhr.onload = () => {
            const message = JSON.parse(xhr.responseText)?.message;
            if (xhr.status >= 200 && xhr.status < 300) {
              successToast(message || "Game uploaded successfully");
              resolve({ data: JSON.parse(xhr.responseText) });
            } else {
              errorToast(message || "Upload failed", { duration: Infinity });
              reject({ error: JSON.parse(xhr.responseText) });
            }
          };

          xhr.onerror = () => reject({ error: "Upload failed" });

          xhr.send(file);
        });
      },


    
    }),

    getGameVersions: builder.query({
      query: (gameId) => `/games/game-version/${gameId}`,
      transformResponse: (response) => response.data,
      providesTags: ["GameVersions"],
    }),

    updateGameVersion: builder.mutation({
      query: ({ gameId, versionId, ...data }) => ({
        url: `/games/game-version/get/${gameId}/${versionId}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["GameVersions"],
    }),

    // Developer specific endpoints
    getGameVersionsByDevId: builder.query({
      query: (gameId) => `/games/game-version/developer/get/all/${gameId}`,
      transformResponse: (response) => response.data,
      providesTags: ["GameVersions"],
    }),

    getGameVersionByDevIdAndVersionId: builder.query({
      query: ({ gameId, versionId }) =>
        `/games/game-version/developer/get/${gameId}/${versionId}`,
      transformResponse: (response) => response.data,
      providesTags: (_result, _error, { versionId }) => [
        { type: "GameVersions", id: versionId },
      ],
    }),
  }),
});

// Export hooks
export const {
  useCreateGameMutation,
  useGetGamesQuery,
  useGetGameByIdQuery,
  useUpdateGameMutation,
  useDeleteGameMutation,
  useGetGamesByDevQuery,
  useGetGameByDevIdQuery,
  useLazyGetGameByDevIdQuery,
  useUpdateGameByDevMutation,
  useDeleteGameByDevMutation,
} = gamesApi;

export const {
  useCreateGameAssetMutation,
  useGetGameAssetsQuery,
  useUpdateGameAssetMutation,
  useDeleteGameAssetMutation,
  useGetGameAssetByDevIdQuery,
  useGetGameAssetsByGameIdAndDevIdQuery,
} = gameAssetsApi;

export const {
  useCreateSystemRequirementsMutation,
  useGetSystemRequirementsQuery,
  useUpdateSystemRequirementsMutation,
  useGetSystemRequirementsByDevIdQuery,
  useUpdateSystemRequirementsByDevIdMutation,
} = systemRequirementsApi;

export const {
  useCreateGameVersionMutation,
  useGetGameVersionsQuery,
  useUpdateGameVersionMutation,
  useGetGameVersionsByDevIdQuery,
  useGetGameVersionByDevIdAndVersionIdQuery,
} = gameVersionsApi;
