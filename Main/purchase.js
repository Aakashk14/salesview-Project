const express = require('express');
const router = express.Router();
const orders = require('../database/buyers_queries/orders')
const sales_db = require('../database/admin_queries/sales_queries')
const buyers_db=require('../database/buyers_queries/account')
const fn = require('../Main/fn');
const buyers = require('../database/models/buyers');
const fs = require('fs')





router.get(["/Buyer/login/","/Buyer/signup"],(req,res)=>{
  
  
        let redir= req.query.redir?`${req.query.redir}`:"/home"
        if(req.query.error==1) {
            res.render("buyer.ejs",{redir:redir,error:1})
        }else{
    res.render("buyer.ejs",{redir:redir})
        }
    })

router.post("/buyer/login",(req,res)=>{
    
    let redir = req.query.redir!="/home"?`/item${req.query.redir}`:"/home"
    buyers_db.login(req.body.email,req.body.password).then((result)=>{
        if(result!=0){
            req.session.userid=req.body.email
            req.session.level=1;
            req.session.myid=result
            res.cookie("myid",req.session.myid)
            req.session.save((err)=>{
            res.redirect(redir)
           })
       }else{
           res.redirect(`/buyer/login?redir=${req.query.redir}&error=1`)
       }
    })
})
router.post("/buyer/signup",(req,res,next)=>{
    
    
return fn.seqid(0).then((id)=>{
    buyers_db.create(req.body.email,req.body.password,id).then((result)=>{
        if(result!=0){
            
            req.session.userid=req.body.email;
            req.session.myid=id
            buyers_db.inbox_setup(id,1)

            req.session.save(function(err){
            
             if(req.query.redir!="/home" && req.query.redir[0]=="/"){
                req.query.redir= req.query.redir.substring(1)
             }
             let redir = req.query.redir!="/home"?`/item/${req.query.redir}`:"/home"
          
             res.redirect(redir)
            })
        }else{
            res.redirect(`/Buyer/signup?redir=${req.query.redir}&error=1`)
        }
     })
    })
})
router.get("/item/:uid/:productid",async(req,res,next)=>{
    if(!req.session.userid){
        res.redirect(`/buyer/login?redir=${req.params.uid}/${req.params.productid}`)
    }else{

   result =await sales_db.single_item_id(req.params.uid,req.params.productid)
   
   
   if(!result.items|| result.items[0].Link==false){
       res.redirect("/home")
   }

   req.session.item_id=result.items[0].item_id


    fs.readFile(`./Storage/users/${req.params.uid}/${req.session.item_id}/${req.session.item_id}.txt`,'utf-8',(err,desc)=>{
       if(err) console.log(err)


    res.render('buyers/Product_buyer',{desc:desc,result:result,url:`/purchase/${req.params.uid}/${req.params.productid}`});
    })
}
})
    router.get("/image_pvt/:id/:identity/:image",(req,res)=>{
        let img_url = `./Storage/users/${req.params.id}/${req.session.item_id}/${req.params.image}`
        res.sendFile(img_url,{root:"./"})

    })

router.post("/payment/:id/:productid",async(req,res)=>{
    //vfunction purchase(userid,order_id,email,status,action){

    let order_id = await fn.generate_orderid(req.params.id);
    orders.buyer_invoice(req.session.userid,req.params.id,order_id)
    await orders.purchase_create(req.params.id,order_id,req.session.userid,"New",0,req.body.street,req.body.city)
    
//res[0].orders.order_id
    res.redirect("/success")
})

router.get("/success",(req,res)=>{
    res.render("buyers/success.ejs")
})
router.get("/purchase/:id/:pid",async(req,res)=>{

    let data =await sales_db.single_item_id(req.params.id,req.params.pid)
    let result={}

    res.render("buyers/purchase",{data:data})
})

///payment
//function purchase(userid,order_id,email,status,action){



module.exports=router