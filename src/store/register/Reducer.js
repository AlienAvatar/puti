import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import * as config from "../config";

//status 'idle 空闲状态 | loading 加载状态 | succeeded 成功返回数据 | failed 失败返回数据 | error 错误状态
const initState = {
    userData: {},
    status : 'idle',
    error : null
};


//Action
//createAsyncThunk 来帮助发送数据，而不仅仅是获取数据,这是一个异步请求
export const fetchAddUserPosts = createAsyncThunk(config.PATH_ADDUSER, async (paramData) => {
    const response = await axios.post(config.PATH_ADDUSER, paramData);
    return response.data;
})

const registerReducer = createSlice({
    name : 'login',
    initState,
    reducers: {
        addUser(state, action){
          state = Object.assign({}, state, {
            userData: action.payload,
          });
        },
    },

    //这是原来的reducer
    extraReducers(builder) {
        builder
            .addCase(fetchAddUserPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAddUserPosts.fulfilled, (state, action) => {
            if(action.payload.code === 200){
                state.status = 'succeeded';
                state.articleData = action.payload;
            }else{
                state.status = 'failed';
                state.error = action.payload.message;
            }
            })
            .addCase(fetchAddUserPosts.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload.message
            })
            .addDefaultCase((state, action) => {
                return initState;
            })
    },
})

export const { addUser } = registerReducer.actions;

export default registerReducer.reducer;
