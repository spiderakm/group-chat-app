const userName=document.getElementById("name")
const password=document.getElementById("password")
const phone=document.getElementById("phone")
const email=document.getElementById("email")
const signup=document.getElementById("signup")
const SignUperror=document.getElementById('error')

signup.addEventListener('click',signupUser)

async function signupUser(e){
    e.preventDefault()
    const obj={
        userName:userName.value,
        password:password.value,
        phone:phone.value,
        email:email.value
    }
    let data=await axios.post("http://localhost:4000/user/signup",obj)
    //Errors in front end
    if(data.data.success===false){
        const signUpText=document.createTextNode(data.data.message)
            SignUperror.appendChild(signUpText)
            SignUperror.style.color="red"
            console.log(SignUperror)
        setTimeout(()=>{
            SignUperror.removeChild(signUpText)
        },4000)
    }
    if(data.data.success===true){
        const signUpText=document.createTextNode(data.data.message)
        SignUperror.appendChild(signUpText)
        SignUperror.style.color="green"
        console.log(SignUperror)
    setTimeout(()=>{
        SignUperror.removeChild(signUpText)
    },4000)
    }
    userName.value=""
    email.value=""
    password.value=""
    phone.value=""
}