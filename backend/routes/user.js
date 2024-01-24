const express = require("express");
const zod=require("zod");
const {User} = require("../db")
const jwt= require("jsonwebtoken");
const {JWT_SECRET}= require("../config")

const router = express.Router();

const signupSchema= zod.object({
    username:zod.string(),
    passwords:zod.string(),
    fristName:zod.string(),
    lastName:zod.string(),
})
router.post("/signup", async(req,res)=>{
    const body= req.body;
    const  {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
 const existinguser=  await User.findOne({
    username:body.username
 })
 if(existinguser){
    return res.status(411).json({
        message: "Email already taken / Incorrect inputs"
    })
 }
    const user= await User.create({
        username:req.body.username,
        passsword:req.body.passsword,
        fristName:req.body.fristName,
        lastName:req.body.lastName,
    })
    const userId= user._id;

    const token= jwt.sign({
        userId
    },JWT_SECRET)
    res.json({
        message:"user created sucessfully",
        token:token
    })

})



module.exports = router;