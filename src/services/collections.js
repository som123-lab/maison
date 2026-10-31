import {request} from './api';
export const collectionService={list:()=>request('/collections'),get:(slug)=>request(`/collections/${encodeURIComponent(slug)}`)};
