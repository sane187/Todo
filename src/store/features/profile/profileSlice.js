import { createSlice } from "@reduxjs/toolkit";
import user from '../../../Assets/user.jpg';

const initialState ={
    name: 'Arpit Joshi',
    username:"joshiarpit",
    total: 60,
    isLoading: true,
    link:user
}

const profileSlice=createSlice({
    name:"profile",
    initialState,
    reducers:{
    changeName: (state,action) => {
        const aj=action.payload
        state.name = `Raja ${aj}`;
      },

    }
}
)

export const {changeName}= profileSlice.actions

export default profileSlice.reducer