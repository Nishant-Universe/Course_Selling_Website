import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import courseRoute from "./routes/course.routes.js"
const app = express()
dotenv.config()
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
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})