import { combineReducers } from 'redux';
import loginReducer  from './login/Reducer';
import articleReducer from './article/Reducer'
import registerReducer from './register/Reducer'
import commentReducer from './comment/Reducer'
/**
 * 组合reducer
 */
export default combineReducers({
    loginReducer : loginReducer,
    articleReducer : articleReducer,
    registerReducer : registerReducer,
})