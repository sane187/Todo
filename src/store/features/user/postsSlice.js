import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (details) => {
    console.log(details)
   const res= axios.post(
      'https://assignment-venturepact.herokuapp.com/login',
      details,
      {
        headers: {  'Content-Type': 'application/json',mode:'cors'},
      }
    )
    if(res){
      console.log(res)
      return res
  }
  })

const userSlice = createSlice({
  name: 'posts',
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
   
    [getPosts.fulfilled]: (state,  {payload} ) => {
      state.list = payload
      state.status = 'success'
    }
  },
})

export default userSlice.reducer
