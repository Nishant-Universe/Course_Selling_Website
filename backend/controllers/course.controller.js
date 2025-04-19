import {Course} from "../models/course.models.js"
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
        const allowedFormat=["image/png","image.jpeg"]
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


    }
   
    

