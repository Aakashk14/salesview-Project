const mongoose = require('mongoose');

const sellers_Schema = new mongoose.Schema({
    email:String,
    Name:String,
    userid:Number,
    password:String

})

const admins= mongoose.model("admins",sellers_Schema);


module.exports=admins;

