import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import z from "zod";
import jwt from "jsonwebtoken";
import config from "../config.js";
//signup function
export const singup=async(req,res)=>{
    try{//validation code
        const{firstName,lastName,email,password}=req.body;
        const userSchema=z.object({
            firstName:z.string().min(3,{message:"first name should be 3 character long"}),
            lastName:z.string().min(3,{message:"last name should be 3 character long"}),
            email:z.string().email(),
            password:z.string().min(6,{message:"password should be 6 character long"}),
        })
        const validationData=userSchema.safeParse(req.body);
        if(!validationData.success){
            return res.status(400).json({errors:validationData.error.issues.map(err=>err.message)});
        }
        //hashing password 
        const  hashedPassword= await bcrypt.hash(password,10);
    const existingUser=await User.findOne({email:email});
    if(existingUser){
        return res.status(400).json({errors:"user already exists"});
    }
    const newUser= new User({firstName,lastName,email,password:hashedPassword});
    await newUser.save();
    res.json({message:"Signup sucessfull",newUser})


    
}catch(error){
    res.status(500).json({error:"Error in sign up"});
    console.log("error in signup",error);
}
};
export const login=async(req,res)=>{
    const {email,password}=req.body;

    try{
        //check emil and password
        const user=await User.findOne({email:email});
        const isPasswordCorrect=await bcrypt.compare(password,user.password)

        //if emil or password id not exist or incorrect 
        if(!user || !isPasswordCorrect){
            return res.status(403).json({error:"Invalis credential"})
        }
        
        //generate jwt token for validation
        const token=jwt.sign({
           id:user._id },config.JWT_USER_PASSWORD);

           res.cookie("jwt",token);
        //return sucess messageand user data
        res.status(201).json({message:"login sucessful",user,token});



    }
    catch(error){
        res.status(500).json({error:"error in login"});
        console.log("error in login",error)
    }
    

};

export const logout=async(req,res)=>{
   try{ res.clearCookie("jwt");
    res.status(200).json({message:"logged out sucessful"})
   }catch(error){
    console.log("Error in logout",error);
   }
}