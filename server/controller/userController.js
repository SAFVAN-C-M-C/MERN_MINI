const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const jwt = require('jsonwebtoken')
require("dotenv").config();
const path = require('path');
const fs=require('fs')
module.exports = {
  postSignup: async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const img=req.file?.filename|| "";
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("heres");

      const data = await User.create({
        username,
        email,
        image:img,
        password: hashedPassword,
        createdAt: new Date(),
        role: "user"
      })
      if (!data) {
        res.json({ status: "error", message: "database error" });
        return;
      }
      const accessToken = jwt.sign(
        { username: username, userId: data._id, role: data.role  },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 60 * 60 * 24 }
      );
      res.cookie("userJwt", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
      });

      res.status(201).json({status: 'ok', data: {username: data.username, userId: data._id , role: data.role }})
    } catch (error) {
        if(error.code === 11000) {
            res.json({status:"error", message: "Email already exist"})
        }else{
            console.log(error);
            res.json({status:"error", message: `${error.message}`})
        }
    }
  },
  postLogin : async (req,res) => {
    console.log(req.body)
    const {email, password} = req.body
    try {
        const user = await User.findOne({email:email});
        if (!user) {
            res.json({ status: "error", message: "Email doesn't exist" });
            return;
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.json({ status: "error", message: "Email or password is incorrect" });
            return;
        }
        const accessToken = jwt.sign(
            { username: user.username, userId: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 60 * 60 * 24 }
          );
          res.cookie("userJwt", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
          });
          res.status(201).json({status: 'ok', data: {username: user.username, userId: user._id, role: user.role }})
    } catch (error) {
        if (error.code === 11000) {
            res.json({ status: 'error', message: "Email already exist" });
        } else {
            res.json({ status: 'error', message: error.message });
        }
    }
  },
  getDetails: async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findOne({_id: userId})
        if(user) {
            res.status(201).json({status: 'ok', data: {user}})
        }else {
            res.json({status:"error", message: "somthing went wrong"})
        }
    } catch (error) {
        res.json({status:"error", message: `${error.message}`})
    }
  },

  update:async(req,res)=>{
    const { username, phone,address } = req.body;
    const img=req.file?.filename|| "";
    console.log(img);
    try {
      const token = req.cookies.userJwt
      // console.log(token);
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      console.log(verified.userId);
      const user=await User.findOne({_id:verified.userId});

      if (!user) {
        res.json({ status: "error", message: "database error" });
        return;
      }
      user.username=username;
      user.phone=phone;
      user.address=address

      if(user.image!==img  && img){
        
          user.image=img
        }
        
      
      user.save()
      res.status(201).json({status: 'ok', data: {username: user.username, userId: user._id , role: user.role }})
    } catch (error) {
        if(error.code === 11000) {
            res.json({status:"error", message: "Email already exist"})
        }else{
            console.log(error);
            res.json({status:"error", message: `${error.message}`})
        }
    }
  },

  getAuth: async (req, res) => {
    const token = req.cookies.userJwt
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                res.json({status: "error", message: err})
              } else {
                  res.status(200).json({status: 'ok', data: user})
              }
          })
      } else {
      res.json({status:"error", message: "cnnot verify jwt"})
  }
},




  

  logout : (req,res) => {
    res.clearCookie("userJwt");
    res.status(200).json({status:'ok'});
  }
};
