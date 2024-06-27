const SERVER_ADDR = 'http://localhost:10001/api/';
// const SERVER_ADDR = 'http://47.241.47.150:9527/puti';
const LOGIN = '/login';
const USER = 'user/'
export const PATH_VALID_USER = SERVER_ADDR + USER + 'login/';
export const PATH_USER_LIST = SERVER_ADDR + USER + 'list/';
export const PATH_USER_CREATE = SERVER_ADDR + USER + 'create/';
export const PATH_USER_GET_USERNAME = SERVER_ADDR + USER + 'get_username/';
export const PATH_USER_GET_ID = SERVER_ADDR + USER + 'get_id/';
export const PATH_USER_UPDATE = SERVER_ADDR + USER + 'update/';
export const PATH_USER_DELETE = SERVER_ADDR + USER + 'delete/';
export const PATH_USER_DELETE_MANY = SERVER_ADDR + USER + 'delete_many/';
export const PATH_USER_UPDATE_PWD = SERVER_ADDR + USER + 'update_pwd/';


const ARTICLE = '/article'
export const PATH_SAVE_ARTICLE = SERVER_ADDR + ARTICLE + '/saveArticle'
export const PATH_QUERY_ARTICLE_BYNUM = SERVER_ADDR + ARTICLE + '/queryArticle'
export const PATH_QUERY_ALL_ARTICLE = SERVER_ADDR + ARTICLE + '/queryAllArticle'
export const PATH_ADD_LIKE_COUNT = SERVER_ADDR + ARTICLE + '/addLikeCount'

export const PATH_HOME = '/';