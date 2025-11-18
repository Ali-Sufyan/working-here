/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteEmptyKeysAndValues } from "@/components/utilities/delete-empty-kv"
import { createSlice } from "@reduxjs/toolkit"
import { IIncomingGame, IIncomingGameAssets, IIncomingGameVersion } from "./games.interface"



interface IGameUpload{
  isLoading: boolean
  uploadProgress: number
  gameVersionUploadProgress: number
  assetsUploadProgress: number

  incomingGame: IIncomingGame
  incomingAsset: IIncomingGameAssets
  incomingVersion:IIncomingGameVersion

}

const initialState: IGameUpload={
  isLoading: false,
  uploadProgress: 0,

  incomingGame: {
    socialLinks: {
      discord: "",
      twitter: "",
      facebook: "",
      youtube: "",
      twitch: ""
    },
    moderationStatus: {
      isApproved: false
    },
    seoMetadata: {
      metaTitle: "",
      metaDescription: "",
      keywords: []
    },
    _id: "",
    title: "",
    slug: "",
    description: "",
    shortDescription: "",

    status: "draft",
    releaseDate: "",
    lastUpdated: "",
    genres: [],
    tags: [],
    features: [],
    ageRating: "",
    contentWarnings: [],
    createdAt: "",
    updatedAt: "",
    id: ""
  },
  gameVersionUploadProgress: 0,
  assetsUploadProgress: 0,
  incomingAsset: {
    _id: "",
    createdAt: "",
    updatedAt: "",
    type: "screenshot",
    url: ""
  },
  incomingVersion: {
    _id: "",
    createdAt: "",
    updatedAt: "",
    version: "",
    releaseNotes: "",
    publishedAt: "",
    size: 0,
    downloadUrl: "",
    changelog: [],
    isPublic: false
  }
}

const gameUploadSlice = createSlice({
  name:'gameUploadSlice',
  initialState, reducers: {
    setUploadProgress: (state, {payload}) => {
      
      
      state.uploadProgress = payload
 

    },
    setGameVersionUploadProgress: (state, { payload }) => {


     
      state.gameVersionUploadProgress = payload
      
    }
    ,
    setAssetsUploadProgress: (state, { payload }) => {
      state.assetsUploadProgress = payload
    },
    

    setIsLoading: (state, {payload}) => {
      state.isLoading = payload.isLoading
    },
    setGameData: (state, { payload }) => {

      
        const p = deleteEmptyKeysAndValues(payload);

        for (const [key, value] of Object.entries(p)) {
          if (typeof value === "object") {
            if (value.$$typeof) {
              delete p[key];
            }
          }
        }
      state.incomingGame = p as any
    }


  }
})

export const { setUploadProgress,   setAssetsUploadProgress, setGameVersionUploadProgress, setIsLoading, setGameData } = gameUploadSlice.actions
export const gameUploadReducer = gameUploadSlice.reducer