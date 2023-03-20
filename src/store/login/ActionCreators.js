import axios from "axios";
import * as actionTypes from './ActionTypes';


export const loginAc = data => {
    return dispatch => {
        return axios.post('/login', data);
    };
};

export const syncInfoAc = data => {
    return {
        type: actionTypes.SYNC_STATE_INFO,
        payload: data
    };
};