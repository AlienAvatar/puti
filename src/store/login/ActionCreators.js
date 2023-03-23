import axios from "axios";
import * as actionTypes from './ActionTypes';
import * as config from "../config";

export const loginAc = paramData => {
    return dispatch => {
        return axios.post(config.PATH_VALIDUSER,paramData)
        .then(response=>{
            console.log('res',response.data);
            //告诉调用代码不需要等待
            return Promise.resolve(response.data);
        });
    };
};

export const syncInfoAc = data => {
    return {
        type: actionTypes.SYNC_USER_DATA,
        userData: data
    };
};

export const validToken = token => {
    if(token === '' && typeof token === undefined){
        return '';
    }
    
    return dispatch => {
        dispatch({
            type : actionTypes.VALID_TOKEN_REQUEST
        });

        const header = { 'token' : token };
        axios.defaults.headers.common['token'] = token;

        axios.post(config.PATH_VALIDTOKEN, header)
        .then(response=>{
            console.log('res',response.data);
            dispatch({
                type : actionTypes.VALID_TOKEN_RECEIVED,
                payload : response.data
            });
        }).catch(error => dispatch({
            type : actionTypes.VALID_TOKEN_ERROR,
            payload : error
        }));
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch(syncInfoAc({}));
    };
};