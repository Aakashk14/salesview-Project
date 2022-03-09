const mongoose= require('mongoose');


const users_orders = new mongoose.Schema({
    
        order_id:Number,
        seller_id:Number,
        Status:{type:String,default:"New"}
    

})
const Buyer_Schema = new mongoose.Schema({
    email:{type:String,unique:true},
    password:String,
    userid:Number,
    orders:[users_orders]
}) 

const buyers = mongoose.model("buyers",Buyer_Schema)



module.exports=buyers;