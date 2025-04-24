import express from "express";
import { login, logout, purchases, signup } from "../controllers/user.controller.js";
import { userMiddelware } from "../middelwares/user.mid.js";

const router=express.Router();
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/purchases",userMiddelware,purchases)

export default router;
