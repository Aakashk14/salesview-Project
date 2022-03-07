const fs = require('fs')
const sales = require("../database/models/sellers")
const admin=require("../database/models/product")
const buyer = require("../database/models/buyers")
const buyers = require('../database/models/buyers')



function seqid(temp){
    
    return new Promise(resolve=>{
        if(temp==1){
    sales.find({}).sort({userid:-1}).then((res)=>{
       resolve(res.length==0?1:res[0].userid+1)
    
})}else{
    console.log("saless")
    buyers.find({}).sort({userid:-1}).then((res)=>{
        resolve(res.length==0?1:res[0].userid+1)
    })
}
    })
}

function user_storage(dr){
    fs.mkdir(dr,{recursive:true},(err)=>{
        if(err) console.log(err)
    });
}
async function fetch_item_id(userid){
    let re= await sales.aggregate([{
          $match:{userid:userid}
      },{$unwind:{path:"$items"}},{$sort:{'items.item_id':-1}}])
            
      
      if(re.length >0){
                 
                 return re[0].items.item_id+1
             }else{ return 1}
     
          }
async function generate_orderid(userid){
    let w;
     await admin.admin_orders.aggregate([{
        $match:{userid:parseInt(userid)}
    },{$unwind:{path:"$orders"}},{$sort:{'orders.order_id':-1}}]).then((res)=>{
         w = res.length>0?res[0].orders.order_id+1:1
    })
    return w;
}
        
module.exports={
    user_storage:user_storage,
    fetch_item_id:fetch_item_id,
    generate_orderid:generate_orderid,
    seqid:seqid
}