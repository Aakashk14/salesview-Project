const {buyer_chats,seller_chats} = require("../models/Messages")
const seller = require("../models/product")


function update_chatS(userid,to_id,msg,turn){
    
    seller_chats.find({
        userid:userid,
        'Messages.to':to_id
    }).then((res)=>{
        if(res.length >0){

    seller_chats.findOneAndUpdate({
        userid:userid,
        "Messages.to":to_id,
    
    },{$push:{'Messages.$.data':{content:msg,turn:turn}}}).exec()
    
    }else{
        seller_chats.findOneAndUpdate({
            userid:userid
        },{$push:{Messages:{to:to_id}}}).then(()=>{
            seller_chats.findOneAndUpdate({
                userid:userid,
                'Messages.to':to_id
            },{$push:{'Messages.$.data':{content:msg,turn:turn}}}).exec()
        })
    }
    })
    }

function update_chatB(userid,to_id,msg,turn){


buyer_chats.find({
    userid:userid,
    'Messages.to':to_id
}).then((res)=>{
    if(res.length >0){
buyer_chats.findOneAndUpdate({
    userid:userid,
    'Messages.to':to_id
},{$push:{'Messages.$.data':{content:msg,turn:turn}}}).exec()
}else{
    buyer_chats.findOneAndUpdate({
        userid:userid
    },{$push:{Messages:{to:to_id}}}).then(()=>{
        buyer_chats.findOneAndUpdate({
            userid:userid,
            'Messages.to':to_id
        },{$push:{'Messages.$.data':{content:msg,turn:turn}}}).exec()
    })
}
})
}

function access_control(userid,identity){
return new Promise(resolve=>{
seller.item_model.aggregate([{
        $match:{userid:userid,"items.identity":identity}},{$lookup:{
            "from":"admins",
            "localField":"userid",
            "foreignField":"userid",
            "as":"results"
        }}]).then((res)=>{
            resolve(res?res[0].results[0].Name:0)
        })
    })
}

function inbox(userid,which){
    return new Promise(resolve=>{
        if(which==1){
        seller_chats.find({
            userid:userid,
        },'Messages').then((res)=>{

        
        resolve(res)
        })
    }else{
        buyer_chats.aggregate([{$match:{userid:userid}},{$lookup:{
            "from":"admins",
            "localField":"Messages.to",
            "foreignField":"userid",
            "as":"results"
        }}
        
        ]).then((res)=>{
            resolve(res)
        })
        }
    })
}
function fetch_chat(userid,to_id,which){
    
    return new Promise(resolve=>{
        if(which==1){
            seller_chats.find({
                userid:userid,
                'Messages.to':to_id
            },'Messages.$').then((res)=>{

        
        resolve(res)
        })
    }else{
            buyer_chats.find({
                userid:userid,
                "Messages.to":to_id
            },'Messages.$').then((res)=>{
                resolve(res)
            })
        }
    })
}

module.exports={
    update_chatB:update_chatB,
    update_chatS:update_chatS,
    access_control:access_control,
    fetch_chat:fetch_chat,
    inbox:inbox
}