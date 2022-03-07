const express = require('express');
const db = require('../database/admin_queries/accounts')

const router=express.Router();

const check=(req,res,next)=>{
    if(!req.session.userid){
        res.redirect("/login")
    }else{
        next()
    }
}
router.get(['/','/login'],(req,res)=>{
    if(req.session.userid){
        res.redirect("/dashboard")
    }else{
    res.render("login.ejs")
    }
})

router.post("/login",async(req,res,next)=>{
    let result = await db.login(req.body.email,req.body.password);
    if(result!=0){
req.session.myid=result.userid;
req.session.userid=req.body.email
req.session.level=0;
res.redirect("/dashboard")    }
})


router.get("/dashboard",check,(req,res)=>{
    res.render("index.ejs")
})
    

router.get("/logout",(req,res)=>{
    req.session.destroy()
})
module.exports=router