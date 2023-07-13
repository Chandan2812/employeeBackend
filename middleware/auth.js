const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization

    if(token)
    {
         jwt.verify(token,"emp",(err,decoded)=>{
            if(decoded){
                console.log(decoded)
                req.body.user=decoded.userId
                next()
            }
            else{
                res.send({msg:"please login"})
            }
         })
    }
    else{
        res.send({msg:"Please login"})
    }
}

module.exports={authenticate}