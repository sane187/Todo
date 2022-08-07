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




const initialState = {
    data:[],
    isSuccess:false,
    isLoading:false
}

const taskSlice=createSlice({
    name:"task",
    initialState,
    reducers:{
        addTask: (state,action) => {
            const aj=action.payload;  
            state.data.push(aj);
          },
          deleteTask:(state,action)=>{
            // console.log(current(state).data)
            console.log(action.payload)
                    const id=action.payload
                    const aj=state.data.filter(item => item.id !== id);
           state.data=aj
          },
          updateTask:(state,action)=>{
            
            let aj=state.data.findIndex(item=>item.id===action.payload.id)
                     state.data[aj]=action.payload
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
      },
      [createNotesData.rejected]: (state) => {
        state.loading = false
      },
    }
  },
)

export default taskSlice.reducer

export const {addTask,deleteTask,updateTask} = taskSlice.actions