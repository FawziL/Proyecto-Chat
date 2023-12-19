const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true},
    phone: { type: Number, required: true },
    avatar: { type: String, required: true} 
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel
