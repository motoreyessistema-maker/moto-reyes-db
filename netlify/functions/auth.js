
import jwt from 'jsonwebtoken';
export function checkAuth(event){
  const h = event.headers.authorization||'';
  const token = h.replace('Bearer ','');
  if(!token) throw new Error('Sin token');
  return jwt.verify(token, process.env.JWT_SECRET);
}
export function signToken(user){
  return jwt.sign({usuario:user.usuario||user.email, rol:user.rol||'Admin'}, process.env.JWT_SECRET, {expiresIn:'8h'});
}
