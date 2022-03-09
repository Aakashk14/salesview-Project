const express=require('express');
const setting = require("../database/admin_queries/settings")

const router=express.Router()

router.post("/de_act",async(req,res)=>{
await setting(req.session.myid,req.body.item,req.body.change)
res.send("OK")
})



module.exports=router