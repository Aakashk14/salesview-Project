
module.exports=function(io){
console.log("accessed")
var clients={}
var num = 0;
io.use(function(socket, next) {
       
    x_session(socket.request, {}, next);
})
    io.on("connection",async (socket)=>{
    if(socket.request.session.userid){
    let temp = socket.request.session.level==0?"seller"+socket.request.session.myid:"buyer"+socket.request.session.myid
    clients[temp]=socket.id
    socket.join(socket.id)

    }

    
   

socket.on("message",(data)=>{
    
    let t = socket.request.session.level==1?"seller"+data.user:"buyer"+data.user
    console.log("sending to",clients[t], clients)
    
    
    io.to(clients[t]).emit("message",data.msg,socket.request.session.myid)
    })

    }

    )
}






