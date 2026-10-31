import {request} from './api';
export const productService={list:(params={})=>request(`/products?${new URLSearchParams(params)}`),get:(id)=>request(`/products/${encodeURIComponent(id)}`)};
