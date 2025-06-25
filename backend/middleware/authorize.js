import jwt from 'jsonwebtoken'
import { User } from '../model/user.model.js';
export const authenticate=async(req,res,next)=>{
  const token=req.cookies.jwt;
  if(!token) return res.status(401).json({message:"unauthorized"});
  try {
  const decoded=jwt.verify(token,"123WED")
  
   req.user= await User.findById(decoded.userId)
  
  } catch (error) {
    return res.status(401).json({message:""+error.message})
  }
  next();
  
}