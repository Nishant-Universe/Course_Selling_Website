import {Course} from "../models/course.models.js"
import { Purchase } from "../models/purchase.model.js";
import { v2 as cloudinary } from 'cloudinary';
export const createCourse=async(req,res)=>{
    const {title,description,price}=req.body;
    try{
        if(!title ||!description||!price){
            return res.status(400).json({errors:"All feild are required"})
        }
        const {image}=req.files
        if(!req.files || Object.keys(req.files).length==0){
            return res.status(400).json({errors:"no file uploaded"})

        }
        const allowedFormat=["image/png","image/jpeg"]
        if(!allowedFormat.includes(image.mimetype)){
            return res.status(400).json({errors:"invalid file format only jpeg and png are supported"})
        }


        //claudinary code
        const cloud_response=await cloudinary.uploader.upload(image.tempFilePath)
        if(!cloud_response || cloud_response.error){
            return res.status(400).json({errors:"error uploading file on cloudinary"})
        }


            const courseData={
                title,
                description,
                price,
                image:{
                    public_id:cloud_response.public_id,
                    url:cloud_response.url,
                },
            }
            const course=await Course.create(courseData);
            res.json({
                message:"course created sucessfully",
                course
            })
        }

         catch(error){
            console.log(error);           
        }


 };

 export const updateCourse=async(req,res)=>{
    const{courseId}=req.params;
    const{title,description,price,image}=req.body;
    try{
        const course=await Course.updateOne({
            _id : courseId,
        },{
            title,
            description,
            price,
            image:{
                public_id:image?.public_id ||course.image.public_id,
                url:image?.url,

            },
        })
        res.json({message:"course updated sucessfully"})

    }catch(error){
        res.status(201).json({message:"error in course updating"})
       console.log("Error in course updating",error) 
    }
 };
 export const  deleteCourse=async(req,res)=>{
    const {courseId}=req.params;
    try{
       const course=await Course.findByIdAndDelete({
        _id:courseId,
       })
       if(!course){
        return res.status(404).json({errors:"course not found"})
       }
       res.status(200).json({message:"Course deleted successfully"});

    }catch(error){
        res.status(500).json({errors:"Error in course deleting"});
        console.log("error in course deletion",error);

    }


 }

 export const getcourses=async(req,res)=>{
    try{
        const courses=await Course.find({})
            res.status(201).json({courses})
        
    }catch(error){
        res.status(500).json({error:"Error in getting courses"})
        console.log("error to get courses",error);
    }

 };

 export const coursedetails=async(req,res)=>{
    const {courseId}=req.params;
try{
    const course=await Course.findById(courseId);
    if(!course){
        return res.status(404).json({error:"course not found"});
    }
    res.status(200).json({ course });

}catch(error){
    res.status(500).json({errors:"error in course getting details"})
console.log("error in course creating");
}
 };
 export const buyCourses=async(req,res)=>{
   
    const {userId}=req;
    const{courseId} =req.params;
    try{
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({error:"Course not found"});

        }
        //check if already purchased

        const existingPurchase=await Purchase.findOne({userId,courseId});
            if(existingPurchase){
                return res.status(400).json({error:"course already purchase"})
            }
            const newPurchase=new Purchase({userId,courseId});
            await newPurchase.save();
            res.status(201).json({message:"Course purchase sucessfully",newPurchase})



    }catch(error){
       res.status(500).json({errors:"Error in course Buying"});
        console.log("error in course buy");
       
    }
    
 }


   
    

