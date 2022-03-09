const express = require('express')

const router = express.Router()
const db = require("../../database/chat_queries/chat")



router.get("/api/chat/userinfo",async(req,res)=>{
    let data = await db.access_control(parseInt(req.query.user),req.query.identity)
    if(data!=0){
        res.json(data)
    }else{
        res.send("ERROR")
    }

})
router.get("/api/chat/send",(req,res,next)=>{

    if(req.query.message=="" || req.query.to=="" || !req.session.userid){
        res.send("ERROR")
    }else{
        next()
    }
})


router.get("/api/chat/send",(req,res)=>{

    console.log("/api/chat/senddd")
if(req.session.level==1){
    db.update_chatB(req.session.myid,parseInt(req.query.user),req.query.msg,true)
    db.update_chatS(parseInt(req.query.user),req.session.myid,req.query.msg,false)
}else{

    db.update_chatB(req.session.myid,parseInt(req.query.user),req.query.msg,false)
    db.update_chatS(parseInt(req.query.user),req.session.myid,req.query.msg,true)
}
})


module.exports=router