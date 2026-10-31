import {request} from './api';
export const orderService={list:()=>request('/customers/me/orders'),get:(id)=>request(`/orders/${encodeURIComponent(id)}`)};
