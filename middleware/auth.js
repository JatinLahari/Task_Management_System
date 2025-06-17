import jwt from "jsonwebtoken";  // jwt
import dotenv from "dotenv";
dotenv.config();
export const auth = (req, res, next)=>{
  let {token} = req.cookies;
  try {
    if(!token) throw new Error("Unauthorized access, Please Login first!");
    const decode = jwt.verify(token, process.env.SECRET_KEY_FOR_PROJECT);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error});
  }
}