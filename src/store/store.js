import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
import profileReducer from './features/profile/profileSlice'
import taskReducer from './features/task/taskSlice';
import userReducer from './features/user/postsSlice'


export const store= configureStore({
    reducer:{
        profile:profileReducer,
        task:taskReducer,
        user:userReducer
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }),
})