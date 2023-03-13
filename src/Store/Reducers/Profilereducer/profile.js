import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {},
    isUpdate:false
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload.data
        },
        toggleUpdate:(state)=>{
            state.isUpdate= !state.isUpdate
        }

    }
})
export const { setProfile,toggleUpdate } = profileSlice.actions;
export default profileSlice.reducer;    