import {brand} from '../config/brand';
const base=import.meta.env.VITE_API_BASE_URL||'';
export class ApiError extends Error{constructor(message,status=0,details=null){super(message);this.name='ApiError';this.status=status;this.details=details}}
export async function request(path,{method='GET',body,headers={}}={}){const res=await fetch(`${base}${path}`,{method,headers:{'Content-Type':'application/json','X-Store-Id':brand.storeId,...headers},body:body?JSON.stringify(body):undefined});let data=null;try{data=await res.json()}catch{}if(!res.ok)throw new ApiError(data?.message||`Request failed (${res.status})`,res.status,data);return data}
