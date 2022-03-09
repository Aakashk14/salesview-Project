const users = require("../models/sellers")
const {admin_orders} = require("../models/product")


function create(email,password,name,id){
    
    users.find({email:email}).then((res)=>{
        if(res.length >0){
            return 0;

        }
    })
       let tn = new users(
        {
            email:email,
            password:password,
            userid:id,
            Name:name

        }
       )
       tn.save()
       return 1;
    
    }

    function checklogin(email,pass){
        return new Promise((resolve)=>{
            users.find({
                email:email,
                password:pass
            },'Name userid').then((res)=>{
    
                if(res.length > 0){
                resolve(res[0])
                }else{
                    resolve(res)
                }
            })
        })
    }

    function setup_orders(userid){

        admin_orders.create({
            userid:userid
        })
    }
    function setup_inbox(userid,which){
        return new Promise(resolve=>{
            if(which==1){
            seller_chats.find({
                userid:userid,
            },'Messages').then((res)=>{
    
            
            resolve(res)
            })
        }else{
                buyer_chats.find({
                    userid:userid
                },'messages').then((res)=>{
                    resolve(res)
                })
            }
        })
    }

module.exports={
    create:create,
    login:checklogin,
    setup_orders:setup_orders
}