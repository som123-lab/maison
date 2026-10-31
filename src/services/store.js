import {products,collections} from '../data/products';
const wait=(v)=>new Promise(r=>setTimeout(()=>r(structuredClone(v)),180));
export const mockApi={products:()=>wait(products),product:(slug)=>wait(products.find(p=>p.slug===slug)||null),collections:()=>wait(collections),login:async({email})=>wait({customer:{id:'guest-01',name:email.split('@')[0],email}}),placeOrder:async(order)=>wait({id:`ME-${Date.now().toString().slice(-7)}`,...order,status:'Demonstration order'})};
// Replace these methods with agreed Spring Boot REST contracts; UI consumes this stable adapter.
export const realApi={products:()=>import('./api').then(m=>m.request('/products')),product:(slug)=>import('./api').then(m=>m.request(`/products/${slug}`)),collections:()=>import('./api').then(m=>m.request('/collections')),login:(body)=>import('./api').then(m=>m.request('/auth/login',{method:'POST',body})),placeOrder:(body)=>import('./api').then(m=>m.request('/orders',{method:'POST',body}))};
export const api=(import.meta.env.VITE_USE_MOCK_API??'true')==='true'?mockApi:realApi;
