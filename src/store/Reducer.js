import { combineReducers } from 'redux';
import loginReducer  from './login/Reducer';
import articleReducer from './article/Reducer'

/**
 * 组合reducer
 */
export default combineReducers({
    loginReducer : loginReducer,
    articleReducer : articleReducer
})