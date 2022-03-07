const express = require('express');
const users = require("../database/models/sellers")
const db = require("../database/admin_queries/accounts")
const router=express.Router();
const {user_storage,seqid} = require("./fn")
const {inbox_setup} = require("../database/buyers_queries/account")




router.get("/signup",(req,res)=>{
    res.render("signup.ejs")
})
router.post("/signup",(req,res)=>{


return seqid(1).then((id)=>{

     if(db.create(req.body.email,req.body.password,req.body.name,id)==1){
         user_storage(`./Storage/users/${id}`);
         db.setup_orders(id)
        inbox_setup(id,0)
         res.send("<script>alert('created'); location.href='/login'</script>")
    
     }else{
         res.send("invalid")
     }

})
})



module.exports=router;