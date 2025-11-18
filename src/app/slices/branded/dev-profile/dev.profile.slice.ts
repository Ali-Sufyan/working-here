import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDeveloperProfileFull, VerificationStatus } from "./dev.profile.types";

const initialState: {data:IDeveloperProfileFull, loading:boolean} = {
 data:{   _id: "",
    userId: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        auth0Id: "",
        isAbove18: false,
        privacyAndPolicy: false,
        role: "",
        twoFactorAuth: false,
        isEmailVerified: false,
        subscriptionStatus: "FREE",
        lastLogin: "",
        createdAt: "",
        id: ""
    },
    companyName: "",
    website: "",
    verificationStatus: VerificationStatus.PENDING,
    commissionRate: 0,
    portfolioUrls: [],
    totalRevenue: 0,
    developerRating: 0,
    createdAt: "",
    updatedAt: ""}, loading:true
};

const devProfileSlice = createSlice({
  name: "DevProfile",
  initialState,
  reducers: {
    setDevProfileData(state, { payload }: PayloadAction<IDeveloperProfileFull>) {

          //   {state.data = payload;}
          
          state.data = payload;
            state.loading = false;
    },
    updateDevProfile(
      state,
      { payload }: PayloadAction<Partial<IDeveloperProfileFull>>
    ) {
      const obj = { ...state.data, ...payload };
      for (const [key, value] of Object.entries(obj)) {
        if (key && value === undefined) {
          delete obj[key as keyof IDeveloperProfileFull];
        }
      }
        state.data = obj;
        state.loading = false;
    },
    resetDevProfileData() {
      return initialState;
    },
  },
});

export const { setDevProfileData, updateDevProfile, resetDevProfileData } = devProfileSlice.actions;
export const devProfileReducer = devProfileSlice.reducer;