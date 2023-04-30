const chat=document.getElementById("chat")
const sendButton=document.getElementById('send')

window.addEventListener("DOMContentLoaded",async()=>{
    try{
     const response=await setInterval(() => {
        axios.get("http://localhost:4000/chat/showMessage")
     },1000) 
     
     const showData=response.data.allData;
       for(let i=0;i<showData.length;i++){
         showChatOnScreen(showData[i].message)
       }
    
    }catch(err){
     console.log("dom loading error",err)
    }
 })
 
 async function showChatOnScreen(msg){
     try{
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
        showChatOnScreen(data.data.data.message)
        console.log(data)
    }catch(err){
        console.log("error in snding message",err)
    }
}