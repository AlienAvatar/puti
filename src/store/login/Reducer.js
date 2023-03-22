import * as actionTypes from './ActionTypes';
import isEmpty from 'lodash/isEmpty';

const initState = {
    isAuth: false,
    userData: {}
};

export default (state = initState, action) => {
    switch(action.type){
        case actionTypes.SYNC_USER_DATA:
            return {
                isAuth: !isEmpty(action.userData),
                userData: action.userData
            };
        default:
            return state;
    }
}