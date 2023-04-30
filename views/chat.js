const chat=document.getElementById("chat")
const sendButton=document.getElementById('send')

window.addEventListener("DOMContentLoaded",async()=>{
    try{
        const response=await axios.get("http://localhost:4000/chat/showMessage")
        const showData=response.data.allData;
          for(let i=showData.length-10;i<showData.length;i++){        
            localStorage.setItem(showData[i].id,showData[i].message)     
            showChatOnScreen(showData[i].id)
        }  
    
    }catch(err){
     console.log("dom loading error",err)
    }
 })
 
 async function showChatOnScreen(id,postMsg){
     try{
        if(postMsg){
            let recent=id-10
           localStorage.removeItem(recent) 
            localStorage.setItem(id,postMsg)
           }
           const msg=localStorage.getItem(id)
           const parent=document.getElementById("allmessages")
           const child=`</li class="text-white">${msg}</li><br>`
           parent.innerHTML=parent.innerHTML+child
     }catch(err){
         console.log("error in showchatonscreen",err)
     }
 }


sendButton.addEventListener("click",sendChat)

async function sendChat(e){
    try{
        e.preventDefault()
        
        const obj={
            chat:chat.value
        }
        const getToken=localStorage.getItem("token")
        const data=await axios.post("http://localhost:4000/chat/message",obj,{
            headers:{"Authorization":getToken}
        })
        showChatOnScreen(data.data.data.id,data.data.data.message)
        console.log(data)
    }catch(err){
        console.log("error in snding message",err)
    }
}