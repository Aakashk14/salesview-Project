
           const socket= io()    
                $(()=>{
//recieve message

socket.on("message",(data,userid)=>{
        let x = document.getElementsByClassName("chats")[0];
        x.scrollTop=x.scrollHeight

        if($(`#${userid}`).attr("active")=="true"){


let p = document.createElement("p");
p.id="from"
p.innerText=data
let x = document.getElementsByClassName("chats")[0];
x.appendChild(p);
x.scrollTop=x.scrollHeight;

        }else{
                console.log("else")
        }
})
$("#btn2").on("click",()=>{

// jquery static
let x={}
 x.message = $("#m").val()
 x.user=location.hash.split("#")[1]

let elem = document.createElement("p");
elem.id="sent";
elem.innerText=x.message;
let elem_main = document.getElementsByClassName("chats")[0]

elem_main.appendChild(elem)
elem_main.scrollTop=elem_main.scrollHeight

socket.emit("message",x)


$.ajax({
        url:"/new_chat",
        method:"get",
        data:x,
        success:function(response){
                console.log("done")
        }
})
})

$(".chatlists p").on("click",function(){

        let ids = location.hash=$(this).attr('id');
        let x = document.querySelectorAll(".chatlists p")
        $(".chats").empty();
        $(".message").css("display","block")
        for(i of x){
                i.setAttribute("active","false")
        }
        let data={};
        data.userid=ids
        document.getElementById(ids).setAttribute("active","true");
        $.ajax({
                         url:"/updatechat",
                         method:"get",
                         data:data,
                         success:function(response){
                                 if(response.result!=0){


                                 
                                 for(let x of response.result )
                                 {
                                         let p= document.createElement("p")
                                         let elem = document.getElementsByClassName("chats")[0];
                                         p.innerText=x["message"]
                                                 p.id=x["turn"]==true?"sent":"from"
                                                 elem.appendChild(p);

                                         
                                 }
                                }
                         }
                 })
                })

        })




