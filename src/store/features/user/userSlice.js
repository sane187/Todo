import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import {environment} from '../../../Environments/environments'



export const login= createAsyncThunk(
  'posts/login',async (obj,thunkAPI) => {
    try{
      let response= await fetch(`${environment.baseURL}/admin/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body:JSON.stringify(obj)
      })
      const data = await response.json()
      
      if(response.status===200 && data.IsSuccess){
        return data.Message
      }
      else {
        return thunkAPI.rejectWithValue(data);
      }
    }
    catch(error){
       return thunkAPI.rejectWithValue({error:error.message})
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
      console.log(response)
      if(response.status===200 && data.IsSuccess){
        return data.Message
      }
      else {
        return thunkAPI.rejectWithValue(data);
      }
    }
    catch(error){
       return thunkAPI.rejectWithValue({error:error.message})
    }
  })

const userSlice = createSlice({
  name: 'posts',
  initialState: {
    signupStatus:null,
    loginStatus:null
  },
  extraReducers: {
    [signup.pending]: (state,  {payload} ) => {
      state.signupStatus=false
    },
    [signup.fulfilled]: (state,  {payload} ) => {
      console.log(payload)
      state.signupStatus=true
    },
    [signup.rejected]: (state,  {payload} ) => {
      console.error(payload)
      alert(payload.Message)
      state.signupStatus=false
    },
    [login.pending]: (state,  {payload} ) => {
      state.loginStatus=false
    },
    [login.fulfilled]: (state,  {payload} ) => {
      console.log(payload)
      state.loginStatus=true
    },
    [login.rejected]: (state,  {payload} ) => {
      console.error(payload)
      alert(payload.Message)
      state.loginStatus=false
    }
  },
})
export const userSelector = (state) => state.user;
export default userSlice.reducer
