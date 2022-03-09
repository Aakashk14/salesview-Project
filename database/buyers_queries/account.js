const buyers = require("../models/buyers")
const admin_orders = require("../models/product")
const {buyer_chats, seller_chats} = require("../models/Messages")

function login(email,password){
    return new Promise(resolve=>{
        buyers.find({
            email:email,
            password:password
        }).then((result)=>{
            if(result.length>0){
                resolve(result[0].userid)
            }else{
                resolve(0)
            }
        })
    })
}
 function create(email,password,id){
    return new Promise(resolve=>{
let tn = new buyers({
    email:email,
    password:password,
    userid:id
})
tn.save((error)=>{
    if(error){
        resolve(0)
    }else{
        resolve(1)
    }
})
    })
}

function inbox_setup(userid,which){
    if(which==1){ // if buyers
let tn = new buyer_chats({
    userid:userid
})
tn.save()
}
else{
    seller_chats.create({
        userid:userid
    })
}
}

module.exports={
    create:create,
    login:login,
    inbox_setup:inbox_setup
}