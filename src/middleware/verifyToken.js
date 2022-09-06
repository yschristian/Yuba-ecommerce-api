import { verify } from "../helper/jwt";

export const verifyToken = async(req, res, next)=>{

            //  const {Authorization}  = req.headers
            // const authHeader =  Authorization.replace('Bearer ', '');
            const authHeader = req.headers.Authorization;
            // const token = authHeader.split(" ")[1];
            // const token = req.headers.Authorization
            // console.log(token)
            // const user = verify(token);
            if(authHeader){
                const token = authHeader.split(" ")[1]
                verify(token, (err,user)=>{
                    if(err)res.status(403).json({error:"Token is not valid"})
                    req.user = user;
                    next()
                })   
            }else{
                return res.status(401).json({error:"You are not authenticated"})
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
    try {
        verifyToken(res , req, ()=>{
          if(req.user.isAdmin){
            next()
          }
          return res.status(403).json({error:"you are not allowed to do that!"})
        })
    } catch (error) {
        console.log(error)
    }
}