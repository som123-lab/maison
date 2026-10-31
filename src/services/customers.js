import {request} from './api';
export const customerService={get:()=>request('/customers/me'),update:(profile)=>request('/customers/me',{method:'PATCH',body:profile}),addresses:()=>request('/customers/me/addresses'),addAddress:(address)=>request('/customers/me/addresses',{method:'POST',body:address})};
