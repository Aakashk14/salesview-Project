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
    if(req.body.email.length==0 || req.body.password.length==0){
        res.redirect("/error?form=login")
    }else{
        next();

    }
})

    router.post("/login",async(req,res)=>{
    let result = await db.login(req.body.email,req.body.password);
    if(result!=0){
req.session.myid=result.userid;
req.session.userid=req.body.email
req.session.level=0;
res.cookie("user",req.session.myid)
res.redirect("/dashboard")    }else{
res.send("<script>alert('Invalid Login');location.href='/login' </script>")
}
})


router.get("/dashboard",check,(req,res)=>{
   
    res.render("index.ejs")
    
})
    

router.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect("/")
})
module.exports=router