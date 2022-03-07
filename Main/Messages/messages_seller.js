const express = require('express');

const router = express.Router()
const chats = require("../../database/chat_queries/chat")

router.get("/Seller/Messages",async(req,res)=>{

    
    result = await chats.inbox(req.session.myid,1);
    res.render("messages_seller.ejs",{result:result})
})

router.get("/updatechat",async(req,res)=>{
    if(req.session.level==0){
    result = await chats.fetch_chat(req.session.myid,req.query.userid,1)
    res.send(result[0].Messages[0].data)
    }else{
        result = await chats.fetch_chat(req.session.myid,req.query.userid,0)
    res.send(result[0].Messages[0].data)
    }
})

router.get("/buyer/Messages",async(req,res)=>{
    result = await chats.inbox(req.session.myid,0);
     
    res.render("buyers/messages_Buyer",{result:result})
})


module.exports=router;