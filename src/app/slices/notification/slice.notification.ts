import { INotification } from "@/app/services/notifications/notification.types";
import { createSlice } from "@reduxjs/toolkit";

interface IInitNotification{
    notification: INotification[];
    loading: boolean;
}


const initialState: IInitNotification = {
    notification: [],
    loading: false,
};


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, { payload }) => {
            state.notification = payload;
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
    },
});

export const { setNotification, setLoading } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;