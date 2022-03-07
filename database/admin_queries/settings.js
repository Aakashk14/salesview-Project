const {item_model:admin} = require("../models/product")


function de_act(userid,item_id,setting){
return new Promise(resolve=>{
    admin.findOneAndUpdate({
        "userid":userid,
        "items.item_id":item_id
    },{"items.$.Link":setting}).exec()
    resolve()
})

}

module.exports=de_act
   