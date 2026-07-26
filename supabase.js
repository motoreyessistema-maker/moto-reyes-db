
import { supabase } from './supabase.js';
import { checkAuth } from './auth.js';
export async function handler(event){
  try{ checkAuth(event); }catch(e){ return {statusCode:401, body:JSON.stringify({error:e.message})}; }
  const method=event.httpMethod;
  if(method==='GET'){
    const {data,error}=await supabase.from('productos').select('*').order('codigo');
    if(error) return {statusCode:500, body:JSON.stringify(error)};
    return {statusCode:200, body:JSON.stringify(data)};
  }
  if(method==='POST'){
    const p=JSON.parse(event.body);
    const row={codigo:p.codigo.toUpperCase(), nombre:p.nombre, marca:p.marca||'GENERICO', categoria:p.categoria||'General', stock:parseInt(p.stock)||0, precio_base:p.precioBase||0, precio_general:p.precioGeneral||p.precio_general||0, precio_taller:p.precioTaller||p.precio_taller||0, ubicacion:p.ubicacion||'', foto:p.foto||''};
    const {error}=await supabase.from('productos').upsert(row,{onConflict:'codigo'});
    if(error) return {statusCode:500, body:JSON.stringify(error)};
    return {statusCode:200, body:JSON.stringify({ok:true})};
  }
  if(method==='DELETE'){
    const codigo=event.queryStringParameters?.codigo;
    await supabase.from('productos').delete().eq('codigo',codigo);
    return {statusCode:200, body:JSON.stringify({ok:true})};
  }
  return {statusCode:405, body:'no'};
}
