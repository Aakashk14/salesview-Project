const sales = require("../models/product");
const{user_storage}= require("../../Main/fn")

const mongoose = require('mongoose')

// var config = JSON.parse(process.env.APP_CONFIG);
// var mongoPassword = 'aakash';
mongoose.connect('mongodb://localhost:27017/salesview',{autoIndex:true})
//mongoose.connect("mongodb://"+config.mongo.user+":"+encodeURIComponent(mongoPassword)+"@"+config.mongo.hostString,{autoIndex:true})




async function add_item(userid,name,description,file,identity,item_id,filename){
sales.item_model.find({
    userid:userid
}).then((res)=>{

    if(res.length==0){
      let tn = new sales.item_model({
          userid:userid,
          items:{
              Name:name,
              description:description,
              item_id:item_id,
              File:file,
              Images:filename,
              identity:identity
          }

      })
      tn.save();
    }else{
        sales.item_model.findOneAndUpdate({
            userid:userid
        },{$push:{items:{
            Name:name,
            description:description,
            item_id:item_id,
            File:file,
            Images:filename,
            identity:identity
        }}})
    }
})

}


function single_item(userid,item_id){
    return new Promise(resolve=>{
        sales.item_model.find({
            "userid":userid,
            "items.item_id":item_id
        }).then((res)=>{
            if(res.length>0){
                resolve(res[0])
            }else{
                resolve(0)
            }
        })
    })
}

function single_item_id(userid,item_identity){
    return new Promise(resolve=>{
        sales.item_model.find({
            "userid":userid,
            "items.identity":item_identity
        }).then((res)=>{
            if(res.length>0){
                resolve(res[0])
            }else{
                resolve(0)
            }
        })
    })
}

function all_products(userid){
    return new Promise(resolve=>{
        sales.item_model.find({
            userid:userid
        },'items').then((res)=>{
            if(res.length >0){
                resolve(res)
            }
        })
    })
}

function total_sales(userid,status){
    return new Promise(resolve=>{
        sales.admin_orders.find({
            userid:userid,
            "order.Status":status
        }).then((data)=>{
            resolve(data)
        }
        )
})
}


module.exports={
    add:add_item,
    single_item:single_item,
    single_item_id:single_item_id,
    all_products:all_products,
    total_sales:total_sales
}