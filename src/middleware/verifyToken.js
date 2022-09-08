import { verify } from "../helper/jwt";

export const verifyToken = async(req, res, next)=>{
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const user = verify(token);
    console.log(user)
    req.token = token;
    req.user = user;
    return next();
  } catch (error) {
    console.log(error)
  }
}

export const verifyTokenAndAuthorization = (req ,res, next)=>{
        verifyToken(res , req, ()=>{
          if(req.user.id === req.params.id || req.user.isAdmin){
            next()
          }
          return res.status(403).json({error:"you are not allowed to do that!"})
        })
    
}

export const verifyTokenAndAdmin = (req,res,next)=>{
        verifyToken(res , req, ()=>{
          if(req.user.isAdmin){
            next()
          }
          return res.status(403).json({error:"you are not allowed to do that!"})
        })
    
}