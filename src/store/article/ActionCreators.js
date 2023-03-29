import axios from "axios";
import * as actionTypes from './ActionTypes';
import * as config from "../config";

export const saveArticle = paramData => {
    return dispatch => {
        dispatch({
            type : actionTypes.SAVE_ARTICLE_REQUEST
        });

        axios.post(config.PATH_SAVE_ARTICLE,paramData)
        .then(response=>{
            dispatch({
                type : actionTypes.SAVE_ARTICLE_RECEIVED,
                payload : response.data
            });
        }).catch(error => dispatch({
            type : actionTypes.SAVE_ARTICLE_ERROR,
            payload : error
        }));
    }
};

export const queryAricleByNum = num => {
    return dispatch => {
        dispatch({
            type : actionTypes.QUERY_ARTICLE_BYNUM_REQUEST
        });

        axios.get(`${config.PATH_QUERY_ARTICLE_BYNUM}?num=${num}`)
        .then(response=>{
            dispatch({
                type : actionTypes.QUERY_ARTICLE_BYNUM_RECEIVED,
                payload : response.data
            });
        }).catch(error => dispatch({
            type : actionTypes.QUERY_ARTICLE_BYNUM_ERROR,
            payload : error
        }));
    }
}

export const queryAllArticle = () => {
    return dispatch => {
        dispatch({
            type : actionTypes.QUERY_ALL_ARTICLE_REQUEST
        });
        
        axios.get(config.PATH_QUERY_ALL_ARTICLE)
        .then(response=>{
            dispatch({
                type : actionTypes.QUERY_ALL_ARTICLE_RECEIVED,
                payload : response.data
            });
        }).catch(error => dispatch({
            type : actionTypes.QUERY_ALL_ARTICLE_ERROR,
            payload : error
        }));
    }
}
