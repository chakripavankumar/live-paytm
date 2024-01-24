const express = require("express");

const router = express.Router();
const zod=require("zod");
const {User} = require("../db")
const jwt= require("jsonwebtoken");
const {JWT_SECRET}= require("../config")



const signupBody= zod.object({
    username:zod.string(),
    passwords:zod.string(),
    fristName:zod.string(),
    lastName:zod.string(),
})
router.post("/signup", async(req,res)=>{
    const body= req.body;
    const  {success} = signupBody.safeParse(req.body);
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

const signinBody= zod.object({
    username:zod.string().email(),
    passsword:zod.string()
})
router.post("/signin" , async(req,res)=>{
    const {success}= signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "incorrect inputs"
        });
    }
     const user = await User.findOne({
        username:req.body.username,
        passsword:req.body.passsword
     });
     if(user){
        const token= jwt.sign({
            userId:user._id
        },JWT_SECRET);
        res.json({
         token:token
        })
        return;
     }
     res.status(411).json({
        message:"Error while logging in"
     })
})



module.exports = router;