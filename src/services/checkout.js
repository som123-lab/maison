import {request} from './api';
export const checkoutService={quote:(payload)=>request('/checkout/quote',{method:'POST',body:payload}),createSession:(payload)=>request('/checkout/sessions',{method:'POST',body:payload}),confirm:(id,payload)=>request(`/checkout/sessions/${encodeURIComponent(id)}/confirm`,{method:'POST',body:payload})};
