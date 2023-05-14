const socket = io('http://localhost:3000');



const chat=document.getElementById("chat")
const sendButton=document.getElementById('send')
const parent=document.getElementById("allmessages")

//used do decode jwt
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

//page load
window.addEventListener("DOMContentLoaded",async()=>{
   try{
        const groupId=localStorage.getItem("groupId")
        const response=await axios.get("http://localhost:4000/chat/showMessage",{headers:{"Authorization":groupId}})

        const showData=response.data.allData;

        if(showData.length<=10){
            for(let i=0;i<showData.length;i++){        
                localStorage.setItem(showData[i].id,showData[i].message)     
                showChatOnScreen(showData[i].id,showData[i].userName)
            } 
        } else{
            for(let i=showData.length-10;i<showData.length;i++){        
                localStorage.setItem(showData[i].id,showData[i].message)     
                showChatOnScreen(showData[i].id,showData[i].userName)   
        }
    }
    socket.on('receive-message', async (group) => {
        if(group == id){
            console.log(lastMessageId);
            await fetchNewMessages(id, groupMessagesBox, userId);
        }
    })
   
   }catch(err){
    console.log("dom loading error in messages",err)
   }
})


//show the chats on the screen
async function showChatOnScreen(id,name,postMsg){
    try{
       
       if(postMsg){
        let recent=id-10
       localStorage.removeItem(recent) 
        localStorage.setItem(id,postMsg)
        window.location.reload()
       }
       const msg=localStorage.getItem(id)
       const child=`<li class="text-black"><span class="text-info">${name}</span><br>${msg}</li>`
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
            groupId:groupId,
            
        }
        socket.emit('send-message',obj)
        const getToken=localStorage.getItem("token")
        const data=await axios.post("http://localhost:4000/chat/message",obj,{
            headers:{"Authorization":getToken}
        })
        console.log(data)
        
        showChatOnScreen(data.data.data.id,data.data.data.userName,data.data.data.message)
    }catch(err){
        console.log("error in snding message",err)
    }
}

//manage members button

const manageButton=document.getElementById("manage")

manageButton.addEventListener("click",manageMembers)

async function manageMembers(e){
    try{
        e.preventDefault()
        parent.style.display="none"
        document.getElementById('showMemebrs').style.display = 'block'
        const getToken=localStorage.getItem("token")
        const response=await axios.get("http://localhost:4000/chat/getUsers",{
            headers:{"Authorization":getToken}
        })
           
const members=document.getElementById("alreadyMember")  
       const userDetails= response.data.allUser
     
       let arr1=[]
       for(let i=0;i<userDetails.length;i++){
                    arr1.push(userDetails[i].id)
                } 
        
         const response2=await axios.get("http://localhost:4000/chat/allUsers",{
            headers:{"Authorization":getToken}
        })
        let arr2=[]
       const users= response2.data.allUser 
                for(let i=0;i<users.length;i++){
                  arr2.push(users[i].id)
              }        
        const mergeArray=[...arr1,...arr2]
        let map=new Map()
        mergeArray.forEach((ele)=>{
            if(map.get(ele)===undefined){
                map.set(ele,1)
            }else{
                map.set(ele,2)
            }
        })
        
        const membersArray=[]
        const addMembersArray=[]
        for(let [key,value] of map){
            if(value===1){
                addMembersArray.push(key)
            }else{
                membersArray.push(key)
            }
        }
        

      const adminDetails= response.data.isAdmin
    
      members.innerHTML=""
     const adminArray=[]
      adminDetails.forEach((ele)=>{
        if(ele.isAdmin===true){
        adminArray.push(ele.userId)
        }
    })
   const mergeArrayForAdmin=[...membersArray,...adminArray]

   let map2=new Map()
   mergeArrayForAdmin.forEach((ele)=>{
       if(map2.get(ele)===undefined){
        map2.set(ele,1)
       }else{
        map2.set(ele,2)
       }
   })
   const adminAccess=[]
   const adminReject=[]
   for(let [key,value] of map2){
       if(value===2){
        adminAccess.push(key)
       }else{
        adminReject.push(key)
       }
   }
   const tokenId=localStorage.getItem("token")
        const decodeToken=parseJwt(tokenId)
        
        const parentUser= document.getElementById("members")
        parentUser.innerHTML=""
//add members
        for(let i=0;i<adminAccess.length;i++){
            if(adminAccess[i]===decodeToken.UserId){
                for(let i=0;i<addMembersArray.length;i++){
                    const child=`<li>${users[addMembersArray[i]-1].name}
                   <button onclick="addMember(${users[addMembersArray[i]-1].id})" class="btn btn-success btn-sm" style="float:right">add</button></li><br>`
                   parentUser.innerHTML=parentUser.innerHTML+child
             }   
            }else{
                for(let i=0;i<addMembersArray.length;i++){
                    const child=`<li ${users[addMembersArray[i]-1].id}>${users[addMembersArray[i]-1].name}</li><br>`
                    parentUser.innerHTML+=child 
                }
            }
        }  
      
//members
   for(let i=0;i<adminAccess.length;i++){
    console.log(decodeToken.UserId);
    if(adminAccess[i]===decodeToken.UserId){
        for(let i=0;i<membersArray.length;i++){
            if(membersArray[i]!==decodeToken.UserId){
                const child=`<li id="${users[membersArray[i]-1].id}">${users[membersArray[i]-1].name}
                <button onclick="removeMember(${users[membersArray[i]-1].id})" class="btn btn-danger btn-sm" style="float:right">remove</button></li><br>`
                members.innerHTML+=child  
                
            }else{  
                const child=`<li>${users[membersArray[i]-1].name} <span style="float:right;color:green">admin<span></li><br>`
                members.innerHTML+=child 
            }   
         }
    }else{
        for(let i=0;i<membersArray.length;i++){
            const child=`<li ${users[membersArray[i]-1].id}>${users[membersArray[i]-1].name}</li><br>`
            members.innerHTML+=child 
        }
    }
}    
    }catch(err){
        console.log("error in manage members",err)
    }

}

//back button
document.getElementById("back").onclick=()=>{
    document.getElementById("showMemebrs").style.display="none"
    parent.style.display="block"
    window.location.href="./messages.html"
  
}

//addMember button
async function addMember(id){
    console.log(id)
    const groupId=localStorage.getItem("groupId")
    const obj={
        userId:id,
        groupId:groupId
    }
    document.getElementById('showMemebrs').style.display = 'none'
    const response=await axios.post("http://localhost:4000/chat/addToGroup",obj)
   window.location.reload()
   
   confirm("User added successfully...")
}

//remove members
async function removeMember(id){
    const groupId=localStorage.getItem("groupId")
    const obj={
        userId:id,
        groupId:groupId
    }
    const members=document.getElementById("alreadyMember")  
    const child=document.getElementById(id)
    members.removeChild(child)
    confirm("Do you want to remove this user?")
    const response=await axios.post("http://localhost:4000/chat/removeMember",obj)
    window.location.reload()
}

