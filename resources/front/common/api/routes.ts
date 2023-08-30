import {compile} from 'path-to-regexp';

export const authRoute = compile('api/v1/auth');
export const loginRoute = compile('api/v1/citizen/login');
export const registerRoute = compile('api/v1/citizen/register');
export const logoutRoute = compile('api/v1/citizen/logout');
