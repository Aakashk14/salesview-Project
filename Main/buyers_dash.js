const express = require('express');
const db = require("../database/buyers_queries/orders")

const router = express.Router()


router.get("/home",async(req,res)=>{
    if(!req.session.userid){
        res.redirect("/")
    }else if(req.session.level==0){
        res.redirect("/dashboard")
    }else{
    result = await db.fetch_order(req.session.userid)
    let all_sellersid=[]
    for(let i=0;i< result[0].orders.length;i++){
        all_sellersid.push(result[0].orders[i].seller_id)
    }

let seller_info = await db.get_ordersinfo(all_sellersid)


    if(result!=0){
        console.log("sendingg",result[0])
    res.render("buyers/buyer_orders",{result:result[0],seller_info:seller_info})
    }else{

        res.render("buyers/buyer_orders")
    }
 
}
})


module.exports=router