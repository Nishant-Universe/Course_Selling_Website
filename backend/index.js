import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import courseRoute from "./routes/course.routes.js"
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";
const app = express()
dotenv.config()
app.use(express.json());
// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

const port = process.env.PORT ||3000;
const DB_URI=process.env.MONGO_URI;


try{
   await mongoose.connect(DB_URI);
    console.log("connected to database")


}
catch(error){
    console.log(error)

}


//define course route
app.use("/api/v1/course",courseRoute)

    //cloudinary Configuration
    cloudinary.config({ 
      cloud_name:process.env.cloud_name ,
      api_key: process.env.api_key, 
      api_secret: process.env.api_secret // Click 'View API Keys' above to copy your API secret
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})