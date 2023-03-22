import axios from "axios";
import * as actionTypes from './ActionTypes';
import * as config from "../config";

export const loginAc = paramData => {
    return dispatch => {
        return axios.post(config.PATH_VALIDUSER,paramData)
        .then(response=>{
            console.log('res',response.data);
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

export const validToken = async token => {
    if(token === '' && typeof token === undefined){
        return '';
    }
    return dispatch => {
        const header = { 'token' : token };
        axios.defaults.headers.common['token'] = token;
        axios.post(config.PATH_VALIDTOKEN, header)
        .then(response=>{
            console.log('res',response.data);
            dispatch(response.data);
            return Promise.resolve(response.data);
        });
    }
}