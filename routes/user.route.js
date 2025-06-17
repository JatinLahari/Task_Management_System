import express from 'express';
import {body} from "express-validator";
import { signIn, signOut, signUp, userProfile } from '../controller/user.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post("/sign-up", 
  body("name","Name is required").notEmpty(),
  body("email","Email is required").notEmpty(),
  body("email","Email is not valid").isEmail(),
  body("password","Password is required").notEmpty(),
  body("password","Password must be at least 6 characters").isLength({min: 6})
  ,signUp);
router.post("/sign-in", signIn);
router.get("/profile",auth ,userProfile);
router.delete("/sign-out", signOut);
export default router;