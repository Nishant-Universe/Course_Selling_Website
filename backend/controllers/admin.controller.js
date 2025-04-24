import { Admin } from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import z from "zod";
import jwt from "jsonwebtoken";
import config from "../config.js";

//signup function
export const signup=async(req,res)=>{
    try{//validation code
        const{firstName,lastName,email,password}=req.body;
        const adminSchema=z.object({
            firstName:z.string().min(3,{message:"first name should be 3 character long"}),
            lastName:z.string().min(3,{message:"last name should be 3 character long"}),
            email:z.string().email(),
            password:z.string().min(6,{message:"password should be 6 character long"}),
        })
        const validationData=adminSchema.safeParse(req.body);
        if(!validationData.success){
            return res.status(400).json({errors:validationData.error.issues.map(err=>err.message)});
        }
        //hashing password 
        const  hashedPassword= await bcrypt.hash(password,10);
    const existingAdmin=await Admin.findOne({email:email});
    if(existingAdmin){
        return res.status(400).json({errors:"Admin already exists"});
    }
    const newAdmin= new Admin({firstName,lastName,email,password:hashedPassword});
    await newAdmin.save();
    res.json({message:"Signup sucessfull",newAdmin})


    
}catch(error){
    res.status(500).json({error:"Error in sign up"});
    console.log("error in signup",error);
}
};
export const login=async(req,res)=>{
    const {email,password}=req.body;

    try{
        //check emil and password
        const admin=await Admin.findOne({email:email});
        const isPasswordCorrect=await bcrypt.compare(password,admin.password)

        //if emil or password id not exist or incorrect 
        if(!admin || !isPasswordCorrect){
            return res.status(403).json({error:"Invalis credential"})
        }
        
        //generate jwt token for validation
        const token=jwt.sign({
           id:admin._id },config.JWT_ADMIN_PASSWORD,{expiresIn:"1d"});

           const cookieOptions={
            expires:new Date(Date.now()+24*60*60*1000),//1 day 
           httpOnly:true,//can't be access via javascript directly
           secure:process.env.Node_Env==="production",//true for https only]
        
           sameSite:"Strict"//it prevent from CSRF attacks
        }
           res.cookie("jwt",token);
        //return sucess messageand Admin data
        res.status(201).json({message:"login sucessful",admin,token});



    }
    catch(error){
        res.status(500).json({error:"error in login"});
        console.log("error in login",error)
    }
    

};

export const logout=async(req,res)=>{
   try{
    if(!req.cookies.jwt){
        return res.status(401).json({errors:"Kindly login first"})

    } 
    res.clearCookie("jwt");
    res.status(200).json({message:"logged out sucessful"})
   }catch(error){
    console.log("Error in logout",error);
   }
}