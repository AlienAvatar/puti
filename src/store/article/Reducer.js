import * as actionTypes from './ActionTypes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import * as config from "../config";

//status 'idle 空闲状态 | loading 加载状态 | succeeded 成功返回数据 | failed 失败返回数据 | error 错误状态
const initState = {
    articleData: {},
    status : 'idle',
    error : null
};

//Action
//createAsyncThunk 来帮助发送数据，而不仅仅是获取数据,这是一个异步请求
export const fetchAllArticlePosts = createAsyncThunk(config.PATH_QUERY_ALL_ARTICLE, async (paramData) => {
    const response = await axios.post(config.PATH_QUERY_ALL_ARTICLE, paramData);
    return response.data;
})

export const fetchArticleByNumGet = createAsyncThunk(config.PATH_QUERY_ARTICLE_BYNUM, async (paramData) => {
    const url = `${config.PATH_QUERY_ARTICLE_BYNUM}?num=${paramData.num}`;
    const response = await axios.get(url, paramData);
    return response.data;
})

export const saveArticlePost = createAsyncThunk(config.PATH_SAVE_ARTICLE, async (paramData)=>{
  const response = await axios.post(config.PATH_SAVE_ARTICLE,paramData);
  return response.data;
})

export const addlikeCountPost = createAsyncThunk(config.PATH_ADD_LIKE_COUNT, async (paramData)=>{
  const token = window.sessionStorage.getItem('token');
  const header = { 'token' : token };
  axios.defaults.headers.common['token'] = token;
  const response = await axios.post(config.PATH_ADD_LIKE_COUNT,paramData);
  return response.data;
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
        queryAricleByNum(state, action){
            state = Object.assign({}, state, {
                articleData: action.payload,
            });
        },
        saveArticle(state, action){
          state = Object.assign({}, state, {
              articleData: action.payload,
          });
        },
        addLikeCount(state,action){
          state = Object.assign({}, state, {
            articleData: action.payload,
          });
        }
    },

    //这是原来的reducer
    extraReducers(builder) {
        builder
          //查找所有文章
          .addCase(fetchAllArticlePosts.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchAllArticlePosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.articleData = action.payload;
            return state;
          })
          .addCase(fetchAllArticlePosts.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message
          })
          //根据Num查找文章
          .addCase(fetchArticleByNumGet.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchArticleByNumGet.fulfilled, (state, action) => {
            if(action.payload.code === 200){
                state.status = 'succeeded';
                state.articleData = action.payload;
            }else{
                state.status = 'failed';
                state.error = action.payload.message;
            }
            return state;
          })
          .addCase(fetchArticleByNumGet.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
          })
          //添加文章
          .addCase(saveArticlePost.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(saveArticlePost.fulfilled, (state, action) => {
            
            if(action.payload.code === 200){
                state.status = 'succeeded';
                state.articleData = action.payload;
            }else{
                state.status = 'failed';
                state.error = action.payload.message;
            }
            return state;
          })
          .addCase(saveArticlePost.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
          })
          //点赞
          .addCase(addlikeCountPost.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(addlikeCountPost.fulfilled, (state, action) => {
            if(action.payload.code === 200){
              state.status = 'succeeded';
              state.articleData = action.payload;
            }else if(action.payload.code === 507){
              state.status = 'succeeded';
              state.error = action.payload.message;
            }else{
              state.status = 'failed';
              state.error = action.payload.message;
            }
            
            return state;
          })
          .addCase(addlikeCountPost.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message
          })
          //默认
          .addDefaultCase((state, action) => {
            return initState
          })
    },
})

export const { postUpdated, queryAllArticle, queryAricleByNum, saveArticle, addlikeCount } = articleReducer.actions;

export default articleReducer.reducer;

export const selectAllPosts = (state) => state.articleReducer


