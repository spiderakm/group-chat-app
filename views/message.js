
const chat=document.getElementById("chat")
const sendButton=document.getElementById('send')

//page load
window.addEventListener("DOMContentLoaded",async()=>{
   try{
        const groupId=localStorage.getItem("groupId")
        const response=await axios.get("http://localhost:4000/chat/showMessage",{headers:{"Authorization":groupId}})

        const showData=response.data.allData;
        console.log(showData)
        if(showData.length<=10){
            for(let i=0;i<10;i++){        
                localStorage.setItem(showData[i].id,showData[i].message)     
                showChatOnScreen(showData[i].id)
            } 
        } else{
            for(let i=showData.length-10;i<showData.length;i++){        
                localStorage.setItem(showData[i].id,showData[i].message)     
                showChatOnScreen(showData[i].id)   
        }
    }
   
   }catch(err){
    console.log("dom loading error in messages",err)
   }
})


//show the chats on the screen
async function showChatOnScreen(id,postMsg){
    try{
       
       if(postMsg){
        let recent=id-10
       localStorage.removeItem(recent) 
        localStorage.setItem(id,postMsg)
        window.location.reload()
       }
       const msg=localStorage.getItem(id)
       const parent=document.getElementById("allmessages")
       const child=`</li class="text-white">${msg}</li><br>`
       parent.innerHTML=parent.innerHTML+child
      
    }catch(err){
        console.log("error in showchatonscreen",err)
    }
}

//adding the chats to the database
sendButton.addEventListener("click",sendChat)
async function sendChat(e){
    try{
        e.preventDefault() 
        const groupId=localStorage.getItem("groupId")  
        const obj={
            chat:chat.value,
            groupId:groupId
        }
        const getToken=localStorage.getItem("token")
        const data=await axios.post("http://localhost:4000/chat/message",obj,{
            headers:{"Authorization":getToken}
        })
       console.log(data)
        showChatOnScreen(data.data.data.id,data.data.data.message)
    }catch(err){
        console.log("error in snding message",err)
    }
}