import * as actionTypes from './ActionTypes';

const initState = {
    articleData: {}
};

export default (state = initState, action) => {
    switch(action.type){
        case actionTypes.SAVE_ARTICLE_REQUEST:
            state = Object.assign({}, state, {
                status: 'waiting'
            });
        break;
        case actionTypes.SAVE_TOKEN_ERROR:
            state = Object.assign({}, state, {
                status: 'failed',
                error: action.payload
            });
        break;
        case actionTypes.SAVE_TOKEN_RECEIVED:
            state = Object.assign({}, state, {
                status: 'received',
                articleData: action.payload,
            });
        break;
    }
    return state;
}