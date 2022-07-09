import { createSlice } from "@reduxjs/toolkit";
let dateObj = new Date();

const date=dateObj

const initialState = {
    data:[ {date: '19/06/2022',
    title:"Start doing React",
    fav:+true,id:12,task:"d"},
    {date: '19/06/2022',
    title:"Start doing React",
    fav:+false,id:14,task:"d"},
    {date: '19/06/2022',
    title:"Start doing React",
    fav:+true,id:16,task:"u"},
    {date: '19/06/2022',
    title:"Start doing React",
    fav:+false,id:17,task:"u"},{date: '19/06/2022',
    title:"Start doing React",
    fav:+true,id:18,task:"u"}
]
}

const taskSlice=createSlice({
    name:"task",
    initialState,
    reducers:{
        addTask: (state,action) => {
            const aj=action.payload;
            
            state.data.push(aj);
           

          },
    }
}
)

export default taskSlice.reducer

export const {addTask} = taskSlice.actions