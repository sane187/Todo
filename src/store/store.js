import {configureStore} from '@reduxjs/toolkit'
import profileReducer from './features/profile/profileSlice'
import taskReducer from './features/task/taskSlice'


export const store= configureStore({
    reducer:{
        profile:profileReducer,
        task:taskReducer,
        
    }
})