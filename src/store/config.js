const SERVER_ADDR = 'http://localhost:9527';
const LOGIN = '/login';

export const PATH_VALIDUSER = SERVER_ADDR + LOGIN + '/validUser';
export const PATH_TEST = SERVER_ADDR + LOGIN + '/testConnection';
export const PATH_VALIDTOKEN = SERVER_ADDR + LOGIN + '/validToken';
export const PATH_ADDUSER = SERVER_ADDR + LOGIN + '/addUser';

const ARTICLE = '/article'
export const PATH_SAVE_ARTICLE = SERVER_ADDR + ARTICLE + '/saveArticle'
export const PATH_QUERY_ARTICLE_BYNUM = SERVER_ADDR + ARTICLE + '/queryArticle'
export const PATH_QUERY_ALL_ARTICLE = SERVER_ADDR + ARTICLE + '/queryAllArticle'
export const PATH_ADD_LIKE_COUNT = SERVER_ADDR + ARTICLE + '/addLikeCount'

export const PATH_HOME = '/';