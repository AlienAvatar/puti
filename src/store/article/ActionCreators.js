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
            console.log('res',response.data);
            dispatch({
                type : actionTypes.SAVE_TOKEN_RECEIVED,
                payload : response.data
            });
        }).catch(error => dispatch({
            type : actionTypes.SAVE_TOKEN_ERROR,
            payload : error
        }));
    }
};
