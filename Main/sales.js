const express=require('express')

const router= express.Router()
const db = require("../database/admin_queries/sales_queries")

router.get("/sales",async(req,res)=>{
sales = await db.total_sales(req.session.myid,req.query.f)
res.render("control_panel.ejs",{sales:sales})
})

module.exports=router;