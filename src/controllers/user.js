import User from "../models/User"
import CryptoJS from "crypto-js"
import dotenv from 'dotenv';
import { sign } from "../helper/jwt";
dotenv.config()

class userController{
    static async register(req,res){
        try {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
            })
            const savedUser=  await newUser.save()
            return res.status(201).json({message:"user registered successfully",savedUser})
            
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
    static async login(req,res){
        try {
            const user = await User.findOne({$or:[{email:req.body.email},{username:req.body.username}]});
            !user && res.status(401).json({error:"wrong credentials!"})
            const hashedPassword = await CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
            originalPassword !==  req.body.password && res.status(401).json({error:"wrong credentials!"})
            const { password , ...others } = user._doc
            const accessToken = await sign({ id : user._id, isAdmin: user.isAdmin })
            
            res.status(200).json({message:"user logged in", ...others , accessToken})
        } catch (error) {
            return res.status(401).json({error:error.message})
        }
    }

    static async updateUser(req,res){
        try {
            if(req.body.password){
                req.body.password = CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.PASS_SEC
                    ).toString()
            }
            const userUpdate = await User.findByIdAndUpdate(
            req.params._id,
            {
                $set: req.body,
            },
            { new:true}
            )
            return res.status(200).json({message:"user updated successfully", userUpdate})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
    static async getAll(req,res){
        const query = req.query.new
        try {
            const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find()
            return res.status(200).json(users)
        } catch (error) {
            
            return res.status(500).json({error:error.message})
        }
    }
    static async getSingleUser(req,res){
        try {
            const id = req.params._id
            const user = await User.findById(id)
            const {password , ...others} = user._doc
            return res.status(200).json({message:"user found", others})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
    static async delete(req,res){
        try {
            const id = req.params._id
            console.log(id);
            const user = await User.findByIdAndDelete(id)
            return res.status(200).json({message:"user deleted successfully", user})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }

    // GET USER STATS

    static async stats(req,res){
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        try {
            const data = await User.aggregate([
                {$match : { createdAt: {$gte: lastYear}}},
                {
                    $project:{
                        month :{$month: "$createdAt"}
                    },
                },
                {
                    $group:{
                        _id:"$month",
                        total:{$sum:1 }
                    }
                }
            ])
            return res.status(200).json({message:"user stats", data})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }


}

export default userController