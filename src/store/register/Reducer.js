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
export const fetchAddUserPosts = createAsyncThunk(config.PATH_USER_CREATE, async (paramData) => {
    const response = await axios.post(config.PATH_USER_CREATE, paramData);
    return response.data;
})

export const fetchValidTokenPosts = createAsyncThunk(config.PATH_USER_LIST, async (paramData) => {
    const token = window.sessionStorage.getItem('token');
    const header = { 'token' : token };
    axios.defaults.headers.common['token'] = token;
    const response = await axios.post(config.PATH_USER_LIST, paramData);
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
        validToken(state,action){
            state = Object.assign({}, state, {
                userData: action.payload,
            });
        }
    },

    //这是原来的reducer
    extraReducers(builder) {
        builder
            //添加用户
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

            //验证Token
            .addCase(fetchValidTokenPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchValidTokenPosts.fulfilled, (state, action) => {
                if(action.payload.code === 200){
                    state.status = 'succeeded';
                    state.userData = action.payload;
                }else{
                    state.status = 'failed';
                    state.error = action.payload.message;
                }
            })
            .addCase(fetchValidTokenPosts.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload.message
            })
            .addDefaultCase((state, action) => {
                return initState;
            })
    },
})

export const { addUser,validToken } = registerReducer.actions;

export default registerReducer.reducer;
