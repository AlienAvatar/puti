import * as actionTypes from './ActionTypes';
import isEmpty from 'lodash/isEmpty';

const initState = {
    isAuth: false,
    userData: {}
};

export default (state = initState, action) => {
    switch(action.type){
        case actionTypes.SYNC_USER_DATA:
            state = Object.assign({}, state, {
                status: 'sync',
                isAuth: !isEmpty(action.userData),
                userData: action.userData
            });
        break;
        case actionTypes.VALID_TOKEN_REQUEST:
            state = Object.assign({}, state, {
                status: 'waiting'
            });
        break;
        case actionTypes.VALID_TOKEN_ERROR:
            state = Object.assign({}, state, {
                status: 'failed',
                error: action.payload
            });
        break;
        case actionTypes.VALID_TOKEN_RECEIVED:
            state = Object.assign({}, state, {
                status: 'received',
                isAuth: !isEmpty(action.userData),
                userData: action.payload,
            });
        break;
    }
    return state;
}