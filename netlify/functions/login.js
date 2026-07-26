
import { supabase } from './supabase.js';
import { signToken } from './auth.js';
export async function handler(event){
  if(event.httpMethod!=='POST') return {statusCode:405, body:'method'};
  const {usuario,password}=JSON.parse(event.body);
  if(usuario==='admin' && password==='admin123'){
    const token=signToken({usuario:'admin', rol:'Admin'});
    return {statusCode:200, headers:{'Content-Type':'application/json'}, body:JSON.stringify({token, user:{usuario:'admin'}})};
  }
  // si tienes tabla usuarios en supabase
  const {data, error} = await supabase.from('usuarios').select('*').eq('usuario',usuario).single();
  if(error || !data) return {statusCode:401, body:JSON.stringify({error:'No existe'})};
  // aqui valida password si lo guardaste en texto o hash, demo simple
  if(data.password!==password && data.pass!==password) return {statusCode:401, body:JSON.stringify({error:'Pass mal'})};
  const token=signToken(data);
  return {statusCode:200, body:JSON.stringify({token, user:data})};
}
