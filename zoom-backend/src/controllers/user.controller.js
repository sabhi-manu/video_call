import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const userRegister = async (req,res)=>{
    try {
        const {name,userName,password}= req.body
        const isUserExist = await User.findOne({userName})
        if(isUserExist){
            return res.status(400).json({
                message:"user already exist.",
                success: false
            })
        }

        let hashPassword =await bcrypt.hash(password,10)

        const user = await User.create({
            userName,
            password:hashPassword,
            name,

        })
// console.log("user register ==>",user)
        res.status(201).json({
            message:"user register successfully.",
            user
        })

    } catch (error) {
        console.log("error in register cotroller ===>",error.message)
        res.status(500).json({
            message:"user not register ."
        })
    }
}


export const userLonginController = async (req,res)=>{
    try {
        let {userName,password} = req.body
        if(!(userName || password)) return res.status(400).json({message:"provide all details."})
        // console.log("userName check==>",userName, " password check ==>",password)
        const user = await User.findOne({userName})
        // console.log("ckeck the user in login controller ==>",user)
        if(!user){
             return res.status(400).json({
                message:"user not  exist.",
                success: false
            })
        }

        const isPassword = await bcrypt.compare(password,user.password)
        if(!isPassword)return res.status(400).json({message:"provide valid details."})

            let tokenKey = jwt.sign({id:user._id},process.env.JSON_WEBTOKEN_SECRET)
         user.token= tokenKey,
       await user.save()
       return res.status(200).json({
        success:true,
        message:"user login successfully.",
        user
       })

    } catch (error) {
        console.log("error in user login .",error.message)
        res.status(500).json({
            message:error.message
        })
    }
}