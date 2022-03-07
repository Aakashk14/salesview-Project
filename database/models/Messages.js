const mongoose = require('mongoose')

const messages= new mongoose.Schema({
    content:String,
    turn:Boolean,
})

const Messages_schema = new mongoose.Schema({
       to:Number,
       data:[messages]
})
const seller_messages= new mongoose.Schema({
    userid:Number,
    Messages:[Messages_schema]
})


const buyer_messages= new mongoose.Schema({
    userid:Number,
    Messages:[Messages_schema]
})

const chats = mongoose.model("chats",seller_messages);
const buyer_chats = mongoose.model("buyer_chats",buyer_messages)


)
module.exports={
    seller_chats:chats,
    buyer_chats:buyer_chats
}

