import { validationResult } from "express-validator";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async(request, response, next)=>{
  try {
    let signUpvalidation = validationResult(request);
    if(!signUpvalidation.isEmpty()){
      return response.status(400).json({errors: signUpvalidation.array()}); 
    }
    let {name, email, password} = request.body;
    let exist = await User.findOne({where:{email:email}});
    if(exist){
      return response.status(400).json({error: "User already exists with this email"});
    }
    let saltKey = bcrypt.genSaltSync(14);
    password = bcrypt.hashSync(password, saltKey);
    let user = await User.create({name, email,password});
    return response.status(201).json({message: "Sign Up Successful", user});
  } catch (error) {
    console.log("Error in signUp controller:", error);
    return response.status(500).json({error: "Internal Server Error"});
  }
}
const generateToken = (userId, email)=>{
  const payload ={ userId: userId, email: email};
  const token = jwt.sign(payload, process.env.SECRET_KEY_FOR_PROJECT, {expiresIn: '1d'});
  return token;
}

export const signIn = async(request,response, next)=>{
  try {
    let signInValidation = validationResult(request);
    if(!signInValidation.isEmpty()){
      return response.status(401).json({message:"Invalid Credentials", errors: signInValidation.array()});
    }
    let {email, password} = request.body;
    let user = await User.findOne({where:{email:email}});
    if(user){
      let decrypt = bcrypt.compareSync(password, user.password);
      response.cookie("token", generateToken(user.id, user.email));
      return decrypt ? response.status(200).json({message: "Sign In Successful", username: user.name}) : response.status(400).json({message: "Invalid Credentials"});
    }
    return response.status(401).json({message: "User not found!"});
  } catch (error) {
    console.log("Error in signIn controller:", error);
    return response.status(500).json({error: "Internal Server Error"});
  }
}
export const userProfile = async(request, response, next)=>{
  try {
    let id = request.user.userId;
    if(!id) return response.status(401).json({message: "User Not Logged in!"});
    let userProfile = await User.findOne({where: {id}, attributes:['id', 'name','email']});
    if(!userProfile) return response.status(401).json({message: "User Not Found!"});

    return response.status(200).json({message: "Profile Found!", userProfile});
  } 
  catch (error) {  
    console.log("Error in User Profile controller:", error);
    return response.status(500).json({error: "Internal Server Error"});
  }
}
export const signOut = async(request, response, next)=>{
  try{
    response.clearCookie("token");
    return response.status(200).json({message:"Sign Out Successful"});
  }
  catch(err){
    console.log("Error in signOut", err);
    return response.status(500).json({error: "Internal Server Error"});
  }
}