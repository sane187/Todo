import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import {environment} from '../../../Environments/environments'



export const login= createAsyncThunk(
  'posts/login',async (details) => {
    console.log(details)
   const res= axios.post(
      'https://assignment-venturepact.herokuapp.com/login',
      details,
      {
        headers: {  'Content-Type': 'application/json', mode:'cors'},
      }
    )
    if(res){
      console.log(res)
      return res
  }
  })

  export const signup = createAsyncThunk('posts/sign',async (obj,thunkAPI) => {
    try{
      let response= await fetch(`${environment.baseURL}/admin/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body:JSON.stringify(obj)
      })
      const data = await response.json()
    console.log(data)
      if(data){
        return data.Data
      }
    }
    catch(error){
       return thunkAPI.rejectWithValue({error:error.message})
    }
  })

const userSlice = createSlice({
  name: 'posts',
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
   
    [login.fulfilled]: (state,  {payload} ) => {
      state.list = payload
      state.status = 'success'
    }
  },
})

export default userSlice.reducer
