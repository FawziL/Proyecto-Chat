const mongoose = require("mongoose");

const mesaggeSchema =  new mongoose.Schema({
    username: { type: String, required: true},
    message: { type: String, required: true },
    type: { type: String, default: 'Usuario' },
    timestamp: {type:Number,required: true}
})

const messageModel = mongoose.model('Messages', mesaggeSchema);

module.exports =  messageModel