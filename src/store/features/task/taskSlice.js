import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import { current } from '@reduxjs/toolkit'
import {environment} from '../../../Environments/environments'
let dateObj = new Date();


export const getNotesData = createAsyncThunk("task/getNotesData",async(_,thunkAPI)=>{
  
  try{
    let response= await fetch(environment.baseURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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

export const createNotesData = createAsyncThunk("task/createNotesData",async(obj,thunkAPI)=>{
  
  try{

    let response= await fetch(`${environment.baseURL}/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj)
    })
    const data = await response.json()
  
    if(data){
      return data.Data
    }
  }
  catch(error){
     return thunkAPI.rejectWithValue({error:error.message})
  }
})
export const deleteNotesData = createAsyncThunk("task/deleteNotesData",async(id,thunkAPI)=>{
  
  try{
   
    let response= await fetch(`${environment.baseURL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
export const updateNotesData = createAsyncThunk("task/updateNotesData",async({id,Data},thunkAPI)=>{
  
  try{
   console.log(id,Data)
    let response= await fetch(`${environment.baseURL}/update/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data)
    })
    const data = await response.json()
  console.log(data)
    if(data){
      return data
    }
  }
  catch(error){
     return thunkAPI.rejectWithValue({error:error.message})
  }
})




const initialState = {
    data:[],
    isSuccess:false,
    isError:false,
    loading:false
}

const taskSlice=createSlice({
    name:"task",
    initialState,
    reducers:{
      
          // updateTask:(state,action)=>{
            
          //   let aj=state.data.findIndex(item=>item.id===action.payload.id)
          //            state.data[aj]=action.payload
          // }
          clearState:(state)=>{
            state.isSuccess=false;
            state.isError=false;
            state.loading=false
          }
    },
    extraReducers: {
      [getNotesData.pending]: (state) => {
        state.loading = true
      },
      [getNotesData.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.data = payload
      },
      [getNotesData.rejected]: (state) => {
        state.loading = false
      },
      [createNotesData.pending]: (state) => {
        state.loading = true
      },
      [createNotesData.fulfilled]: (state, { payload }) => {
        console.log(payload)
        state.loading = false
        state.isSuccess= true
      },
      [createNotesData.rejected]: (state) => {
        state.loading = false
        state.isError =true
      },
      [deleteNotesData.pending]: (state) => {
        state.loading = true
      },
      [deleteNotesData.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.isSuccess =true
      },
      [deleteNotesData.rejected]: (state) => {
        state.loading = false;
      },
      [updateNotesData.pending]: (state) => {
        state.loading = true
      },
      [updateNotesData.fulfilled]: (state, { payload }) => {
        state.loading= false;
        state.isSuccess =true
      },
      [updateNotesData.rejected]: (state) => {
        state.loading = false
      }
    }
  },
)

export default taskSlice.reducer

export const {clearState} = taskSlice.actions