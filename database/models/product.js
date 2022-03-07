const mongoose = require('mongoose');
const users = require('./sellers');

mongoose.set("debug",true)


const orders_payment = new mongoose.Schema({
    email:String,
    Address:{
        street:String,
        city:String
    },
    Status:{type:String,default:"New"},
    Action:Boolean
})
const orders_details = new mongoose.Schema({
    order_id:Number,
    buyer:[orders_payment]

})
const orders_Schema = new mongoose.Schema({
    userid:Number,
    orders:[orders_details]
})
const items_Schema= new mongoose.Schema({
    Name:String,
    description:String,
    item_id:Number,
    File:Boolean,
    Images:String,
    identity:String,
    Link:{type:Boolean,default:true}
    
})
const users_items=new mongoose.Schema({
    userid:Number,
    items:[items_Schema]
})



const items_model = mongoose.model("items_model",users_items)

const admin_orders = mongoose.model("admin_orders",orders_Schema)


module.exports={
    item_model:items_model,
    admin_orders:admin_orders
}