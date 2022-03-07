const express = require('express');
const db =  require('../database/admin_queries/sales_queries')
const multer = require('multer');
const { stringify } = require('querystring');
const sales = require("../database/models/product")
const {fetch_item_id} = require("./fn");
const fs = require('fs');


const storage = multer.diskStorage({
destination:async function(req,file,cb){
    let item_id = await fetch_item_id(req.session.myid)
    let dr=`./Storage/users/${req.session.myid}/${item_id}`
    fs.mkdirSync(dr,{recursive:true},(err)=>console.log(err))
    cb(null,dr)
},
filename:function(req,file,cb){
    a=file.originalname
    cb(null,a)
}
}
)
const upload=multer({storage:storage})
const router = express.Router();


async function item_url(email){
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

    let x = Math.floor(Math.random()*6)+4
    let str=""

    for(let i=0;i<x;i++){
        let y =Math.floor(Math.random()*61)+1
        y=y.toString().split(".")
        str=str+a[y[0]];

    
    }
result=await sales.item_model.find({email:email,"items.identity":str})

if(result.length >0){
    item_url()
}else{

    return str
}

}


router.post("/item",upload.single("item_file"),async(req,res)=>{
    
    let identity = await item_url(req.session.userid)
    let item_id = await fetch_item_id(req.session.myid)
    fs.writeFile(`./Storage/users/${req.session.myid}/${item_id}/${item_id}.txt`,req.body.desc,err=>{
        if(err) console.log(err)
    })
    
    

     req.file?db.add(req.session.myid,req.body.name,`${item_id}.txt`,1,identity,item_id,req.file.filename):db.add(req.session.myid,req.body.name,req.body.desc,0,identity,item_id)
      res.send(item_id.toString())


})

router.get("/product/:productid",async(req,res)=>{

    result = await db.single_item(req.session.myid,req.params.productid);
    
    let url = `http://localhost:3000/item/${req.session.myid}/${result.items[0].identity}`
    res.render("active_product.ejs",{data:result,url:url});
})
router.get("/products",async(req,res)=>{
    result = await db.all_products(req.session.myid)
    if(result!=0) res.render("products.ejs",{items:result[0]})
    else res.render("products.ejs")
})


module.exports=router;