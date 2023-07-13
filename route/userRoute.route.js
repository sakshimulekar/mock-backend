const express=require("express")
const { UserModel } = require("../model/userModel.mode")
const userRoute=express.Router()
const bcrypt=require("bcrypt")
const  jwt = require("jsonwebtoken")
const { BlacklistModel } = require("../model/logout.model")
userRoute.get("/",async(req,res)=>{
    try {
        const user=await UserModel.find()
        res.status(200).json({msg:"users info",user})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

userRoute.post("/signup",async(req,res)=>{
    const {email,passward,confirm}=req.body
    try {
        const user=await UserModel.findOne({email})
        console.log(user)
        if(!user){
            bcrypt.hash(passward,5,async(err,hash)=>{
                if(hash){
                    const data=new UserModel({email,passward:hash,confirm:hash})
                    await data.save()
                    res.status(200).json({msg:"registered successfully!",data})
                }
                else{
                    res.status(400).json({msg:err.message})
                }
            })
        }
        else{
            res.status(200).json({msg:"registered already!"})
        }
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,passward}=req.body
    try {
        const user=await UserModel.findOne({email})
        console.log(user)
        if(user){
            bcrypt.compare(passward,user.passward,async(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user._id},"mock")
                    res.status(200).json({msg:"Login Successful",token,user})
                }
                else{
                    res.status(200).json({msg:"Invalid credential"})
                }
            })
        }
        else{
            res.status(200).json({msg:"user not found!"})
        }
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

userRoute.get("/logout",async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try {
        const blacklisttoken=new BlacklistModel({token})
        await blacklisttoken.save()
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

module.exports={
    userRoute
}