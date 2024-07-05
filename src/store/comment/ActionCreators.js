import axios from "axios";
import * as actionTypes from './ActionTypes';
import * as config from "../config";


export const createCommmentAc = (postParam) => {
    const url = `${config.PATH_COMMENT_CREATE}`;
    return () => {
        const token = localStorage.getItem('token');
        axios.defaults.headers['token'] = token;
        return axios.post(url, postParam).then(response=>{
            //告诉调用代码不需要等待
            return response.data;
        }).catch(error => {
            if(error.response.status === 401){
                return error;
            }
        });
    };
};

export const getCommentListAc = (id, limit) => {
    const url = `${config.PATH_COMMENT_LIST_BY_ARTICLE_ID}${id}?limit=${limit}`;
    return () => {
        return axios.get(url).then(response=>{
            //告诉调用代码不需要等待
            return response.data;
        }).catch(error => {
            return error;
        });
    }
}