const mongoose = require('mongoose')
const {Schema, ObjectId} = mongoose

const UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    phone:{type:Number},
    address:{type:String},
    image: String,
    createdAt: Date,
    role: String
})

const User = mongoose.model("user", UserSchema)
module.exports = User;