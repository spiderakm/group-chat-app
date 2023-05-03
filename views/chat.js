
const chat=document.getElementById("chat")
const sendButton=document.getElementById('send')

//page load
window.addEventListener("DOMContentLoaded",async()=>{
   try{
   
    getAllGroupNames()

   }catch(err){
    console.log("dom loading error",err)
   }
})

//Get all group Names
async function getAllGroupNames(addGroup){
    try{
       if(addGroup){
        const parent=document.getElementById("groupButtons")
        parent.innerHTML=""
       }
        const getToken=localStorage.getItem("token")
        const data=await axios.get("http://localhost:4000/group/getName",{
            headers:{"Authorization":getToken}
        })
        const parent=document.getElementById("groupButtons")
        const groupNames=data.data.groupNames
        const groupId=data.data.groupId
        for(let i=0;i<groupNames.length;i++){
            
            let child=`<button onclick="insideGroup(${groupId[i]})" class="btn btn-secondary btn-lg" style="width:100%;margin-bottom:5px">${groupNames[i]}</button>`
            parent.innerHTML=parent.innerHTML+child
        }
       
        
    }catch(err){
        console.log("error in get all group name",err)
    }
   
}
//inside group function 
async function insideGroup(id){
    try{
        localStorage.setItem("groupId",id)
        window.location.href="./messages.html"
    }catch(err){
        console.log("error in inside group FE",err)
    }

}



//create new group button
document.getElementById("newGroup").onclick=async()=>{
   try{
       
        const inputBox=document.createElement("input")
        inputBox.type="text"
        inputBox.id="groupNameFirst"
        inputBox.setAttribute("class","form-control")
        inputBox.placeholder="Type group name"
        const button=document.createElement("button")
        text=document.createTextNode("create")
        button.id="createButton"
        button.setAttribute("class","btn btn-success rounded-pill")
        button.appendChild(text)
        const parent1=document.getElementById("createGroup1")
        const parent2=document.getElementById("createGroup2")
    
        parent1.appendChild(inputBox)
        parent2.appendChild(button)
       
        //create group button functionality
        const createButton=document.getElementById("createButton")
        createButton.onclick=async()=>{
            try{
                
                const nameG=document.getElementById("groupNameFirst").value
                const obj={
                    groupName:nameG
                }
                const getToken=localStorage.getItem("token")
           const response=await axios.post("http://localhost:4000/group/addName",obj,{
            headers:{"Authorization":getToken}
        })
            getAllGroupNames(response)
        inputBox.style.display="none"
        button.style.display="none"
            }catch(err){
                console.log("error in create button",err)
            }
        }
   }catch(err){
    console.log("error in new group",err)
   }
}

//logout from groups
document.getElementById("logout").onclick=()=>{
    window.location.href="./login.html"
}