const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {UserModel}=require("../model/user.model")


const userRouter=express.Router()

userRouter.post("/signup",async (req,res)=>{
    try {
        const {userName,password,cpassword}=req.body
        if(password!==cpassword)
        {
            return res.send({msg:"Password doesn't match"})
        }
        const isUserPresent=await UserModel.findOne({userName})
        if(isUserPresent)
        {
            return res.send({msg:"user already present"})
        }

        const hashedPassword=bcrypt.hashSync(password,10)
        const chashedPassword=bcrypt.hashSync(cpassword,10)

        const user=new UserModel({userName,password:hashedPassword,cpassword:chashedPassword})

        await user.save()
        res.send({data:user,msg:"registration successful"})

    } catch (error) {
        res.send({msg:"something went wrong"})
    }
})


userRouter.post("/login",async (req,res)=>{
    try {
        const {userName,password}=req.body

        const isUserPresent=await UserModel.findOne({userName})
        if(!isUserPresent)
        {
            return res.send({msg:"user not present"})
        }

        const isPasswordMatch=await bcrypt.compareSync(password,isUserPresent.password)
        if(!isPasswordMatch)
        {
            return res.send({msg:"wrong credentials"})
        }

        const token=jwt.sign({userId:isUserPresent._id},"emp",{expiresIn:"4h"})
        res.send({msg:"Login Successful",token:token})
    } catch (error) {
        res.send({msg:"something went wrong"}) 
    }
})


module.exports={userRouter}