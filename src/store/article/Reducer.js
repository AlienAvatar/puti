import * as actionTypes from './ActionTypes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import * as config from "../config";

const initState = {
    articleData: {},
    status : 'idle',
    error : null
};

//Action
//createAsyncThunk 来帮助发送数据，而不仅仅是获取数据
export const fetchAllArticlePosts = createAsyncThunk(config.PATH_QUERY_ALL_ARTICLE, async (paramData) => {
    const response = await axios.post(config.PATH_QUERY_ALL_ARTICLE, paramData);
    return response.data
})

//默认情况下，createSlice 生成的 action creator 希望你传入一个参数，该值将作为 action.payload 放入 action 对象中
const articleReducer = createSlice({
    name : 'article',
    initState,
    reducers: {
        //这里代替了原来的action type, reducer的名称应该很好地描述正在发生的事请
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.articleData.find((post) => post.id === id)
            if (existingPost) {
              existingPost.title = title
              existingPost.content = content
            }
        },
        queryAllArticle(state, action){
            //state.articleData = response.data的数据
            state = Object.assign({}, state, {
                articleData: action.payload,
            });
        },
        
    },

    //这是原来的reducer
    extraReducers(builder) {
        builder
          .addCase(fetchAllArticlePosts.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchAllArticlePosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.articleData = action.payload;
            return state;
          })
          .addCase(fetchAllArticlePosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
          .addDefaultCase((state, action) => {
            return initState
          })
    },
})

export const { postUpdated, queryAllArticle } = articleReducer.actions;

export default articleReducer.reducer;

export const selectAllPosts = (state) => state.articleReducer.articleData
    

// export default (state = initState, action) => {
//     switch(action.type){
//         case actionTypes.SAVE_ARTICLE_REQUEST:
//             state = Object.assign({}, state, {
//                 status: 'waiting'
//             });
//         break;
//         case actionTypes.SAVE_ARTICLE_ERROR:
//             state = Object.assign({}, state, {
//                 status: 'error',
//                 error: action.payload
//             });
//         break;
//         case actionTypes.SAVE_ARTICLE_RECEIVED:
//             state = Object.assign({}, state, {
//                 status: 'received',
//                 articleData: action.payload,
//             });
//         break;
//         case actionTypes.QUERY_ARTICLE_BYNUM_REQUEST:
//             state = Object.assign({}, state, {
//                 status: 'waiting'
//             });
//         break;
//         case actionTypes.QUERY_ARTICLE_BYNUM_ERROR:
//             state = Object.assign({}, state, {
//                 status: 'failed',
//                 error: action.payload,
//             });
//         break;
//         case actionTypes.QUERY_ARTICLE_BYNUM_RECEIVED:
//             state = Object.assign({}, state, {
//                 status: 'received',
//                 articleData: action.payload,
//             });
//         break;
//         case actionTypes.QUERY_ALL_ARTICLE_REQUEST:
//             state = Object.assign({}, state, {
//                 status: 'waiting'
//             });
//         break;
//         case actionTypes.QUERY_ALL_ARTICLE_ERROR:
//             state = Object.assign({}, state, {
//                 status: 'failed',
//                 error: action.payload,
//             });
//         break;
//         case actionTypes.QUERY_ALL_ARTICLE_RECEIVED:
//             state = Object.assign({}, state, {
//                 status: 'received',
//                 articleData: action.payload,
//             });
//         break;
//     }
//     return state;
// }