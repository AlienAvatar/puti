import axios from "axios";
import * as actionTypes from './ActionTypes';
import * as config from "../config";

export const loginAc = paramData => {
    return () => {
        return axios.post(config.PATH_VALID_USER, paramData)
            .then(response=>{
                //告诉调用代码不需要等待
                return response.data;
            }).catch(error => {
                console.log('loginAc error', error);
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

        axios.post(config.PATH_VALID_USER, header)
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


export const signupAc = paramData => {
    return () => {
        return axios.post(config.PATH_USER_CREATE, paramData)
            .then(response=>{
                //告诉调用代码不需要等待
                return response.data;
            }).catch(error => {
                console.log('signupAc error', error);
            });
    };
};

export const forgetPasswordAc = paramData => {
    return () => {
        const username = paramData.username;
        const url = `${config.PATH_USER_UPDATE_PWD}${username}`;
        return axios.post(url, paramData)
            .then(response=>{
                //告诉调用代码不需要等待
                return response.data;
            }).catch(error => {
                console.log('forgetPasswordAc error', error);
            });
    };
};