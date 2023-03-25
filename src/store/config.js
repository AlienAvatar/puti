export const SERVER_ADDR = 'http://localhost:9527';
const LOGIN = '/login';

export const PATH_VALIDUSER = SERVER_ADDR + LOGIN + '/validUser';
export const PATH_HOME = '/';

export const PATH_TEST = SERVER_ADDR + LOGIN + '/testConnection';
export const PATH_VALIDTOKEN = SERVER_ADDR + LOGIN + '/validToken';

const ARTICLE = '/article'
export const PATH_SAVE_ARTICLE = SERVER_ADDR + ARTICLE + '/saveArticle'