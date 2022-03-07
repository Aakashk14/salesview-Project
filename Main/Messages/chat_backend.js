const express = require('express')

const router = express.Router()
const db = require("../../database/chat_queries/chat")



router.get("/api/chat/userinfo",async(req,res)=>{
    let data = await db.access_control(parseInt(req.query.user),req.query.identity)
    console.log("got req 2",data)
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

//userid,to_id,msg,turn

router.get("/api/chat/send",(req,res)=>{


if(req.session.level==1){
    db.update_chatB(req.session.myid,parseInt(req.query.to),req.query.msg,true)
    db.update_chatS(parseInt(req.query.to),req.session.myid,req.query.msg,false)
}else{
    db.update_chatB(req.session.myid,parseInt(req.query.to),req.query.msg,false)
    db.update_chatS(parseInt(req.query.to),req.session.myid,req.query.msg,true)
}
})


module.exports=router