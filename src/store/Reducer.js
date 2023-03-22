import { combineReducers } from 'redux';
import loginReducer  from './login/Reducer';

/**
 * 组合reducer
 */
export default combineReducers({
    loginReducer : loginReducer
})