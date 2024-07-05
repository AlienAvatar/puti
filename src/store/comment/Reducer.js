import { createSlice, nanoid } from '@reduxjs/toolkit'



const initialState = {
    commentData: [],
    status: 'idle',
    error: null
}


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reducer(state, action) {
            state.posts.push(action.payload)
          },
    }
})

export default postsSlice.reducer