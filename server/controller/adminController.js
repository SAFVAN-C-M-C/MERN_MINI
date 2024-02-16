const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  fetchUsers: async (req, res) => {
    try {
      const users = await User.find({role:"user"});
      console.log(users);
      if (users) {
        res.status(201).json({ status: "ok", users });
      } else {
        res.json({ status: "error", message: "users not found" });
      }
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
  },

  saveUser: async (req,res) => {
    const { username, phone,address } = req.body;
    const img=req.file?.filename|| "";
    console.log(img);
    try {
      const { id } = req.params;
      const token = req.cookies.userJwt
      // console.log(token);
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      
      const user=await User.findOne({_id:id});

      if (!user) {
        res.json({ status: "error", message: "database error" });
        return;
      }
      user.username=username;
      user.phone=phone;
      user.address=address

      if(user.image!==img && img){
          user.image=img
        }
      user.save()
      res.status(201).json({status: 'ok'})
    } catch (error) {
        if(error.code === 11000) {
            res.json({status:"error", message: "Email already exist"})
        }else{
            console.log(error);
            res.json({status:"error", message: `${error.message}`})
        }
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({ status: 'error', message: 'Invalid user ID' });
      }

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }

      res.status(200).json({ status: 'ok', message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  addUser: async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const img=req.file?.filename|| "";
    try {
      const token = req.cookies.userJwt
      
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      const hashedPassword = await bcrypt.hash(password, 10);
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
      res.status(201).json({status: 'ok'})
    } catch (error) {
        if(error.code === 11000) {
            res.json({status:"error", message: "Email already exist"})
        }else{
            console.log(error);
            res.json({status:"error", message: `${error.message}`})
        }
    }
  }
};
