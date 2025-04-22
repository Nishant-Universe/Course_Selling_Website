import express from "express";
import { createCourse, deleteCourse, updateCourse ,getcourses,coursedetails, buyCourses } from "../controllers/course.controller.js";
import { userMiddelware } from "../middelwares/user.mid.js";

const router=express.Router();

router.post("/create",createCourse);
router.put("/update/:courseId",updateCourse);
router.delete("/delete/:courseId",deleteCourse);
router.get("/courses",getcourses);
router.get("/:courseId", coursedetails);
router.get("/buy/:courseId",userMiddelware ,buyCourses)
export default router;
