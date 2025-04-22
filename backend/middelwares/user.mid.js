import config  from "../config.js";
import jwt from "jsonwebtoken";
//authorization 
export function userMiddelware(req,res,next){

    const authHeader=req.headers.authorization;
    if(!authorization || !authHeader.startwith("Bearer ")){
       return  res.status(401).json({error:"No token Provided"})
    }
    const token =authHeader.split(" ")[1];
    try{
        const decoded=jwt.verify(token,config.JWT_USER_PASSWORD)
        req.userId=decoded.id
        next();
    }catch(error){

        return res.status(401).json({errors:"Invalid token or Expired"})
        console.log("Invalid token or Expired token",+ error)
    }

}