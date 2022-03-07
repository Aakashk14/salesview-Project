const mongoose= require('mongoose');
const sales_queries = require('../admin_queries/sales_queries');

const buyers = require('../models/buyers');
const { admin_orders } = require('../models/product');
const product_details = require('../models/product')
const seller = require('../models/sellers')

function buyer_invoice(email,seller_id,order_id)
{
    return new Promise(resolve=>{
        buyers.find({
            email:email

        }).then((res)=>{
            if(res.length==0){
                let tn = new buyers({
                    email:email,
                    orders:{
                        order_id:order_id,
                        seller:seller_id
                    }
                })
                tn.save()
                resolve(1) 
            
            }else{
                buyers.findOneAndUpdate({
                    email:email
                },{$push:{orders:{order_id:order_id,seller_id:seller_id}}}).exec()
                resolve(1)
            }
        })
    })
}

function fetch_order(email){
    return new Promise(resolve=>{

        buyers.find({
            email:email,

        }).then((res)=>{
            if(res.length >0) resolve(res)
            resolve(0)
        })
    })
}



function purchase_admin(userid,order_id,email,status,action,street,city){
    return new Promise(resolve=>{
        
        
        admin_orders.findOneAndUpdate({
            userid:userid
        },{$push:{orders:{order_id:order_id}}}).then(()=>{
        admin_orders.findOneAndUpdate({
            'userid':userid,
            'orders.order_id':order_id
        },{$push:{'orders.$.buyer':{email:email,Address:{street:street,city:city},Status:status,Action:action}}}).exec()
        
        })
    resolve(1)
    })
}

function get_ordersinfo(usr){
    return new Promise(resolve=>{
        seller.find({userid:{$in: usr}}).then((res)=>{

            let t ={}
            for( x of res){
            t[x.userid]=x.Name
            }     
                   resolve(t)

    })
})
}
module.exports={
    fetch_order:fetch_order,
    purchase_create:purchase_admin,
    buyer_invoice:buyer_invoice,
    get_ordersinfo:get_ordersinfo
}