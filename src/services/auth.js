import {request} from './api';
export const authService={login:(credentials)=>request('/auth/login',{method:'POST',body:credentials}),register:(details)=>request('/auth/register',{method:'POST',body:details}),logout:()=>request('/auth/logout',{method:'POST'}),me:()=>request('/auth/me')};
