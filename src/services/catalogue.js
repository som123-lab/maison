import {request} from './api';
export const categoryService={list:()=>request('/categories')};
export const variantService={list:(productId)=>request(`/products/${encodeURIComponent(productId)}/variants`)};
export const inventoryService={availability:(variantId)=>request(`/inventory?variantId=${encodeURIComponent(variantId)}`)};
