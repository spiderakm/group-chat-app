const chat=document.getElementById("chat")
const sendButton=document.getElementById('send')

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
        console.log(data)
    }catch(err){
        console.log("error in snding message",err)
    }
}