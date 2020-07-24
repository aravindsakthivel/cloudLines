window.onload = () =>{
    let logForm = document.getElementById('lgn_btn')
    logForm.addEventListener('click', getLoginData)
}


const getLoginData = () => {
    event.preventDefault()
    let lgnUsername = document.getElementById('lgn_user_name').value
    let lgnPassword = document.getElementById('lgn_pwd').value

    let allRegUsers = regUsers.allData()
    console.log(allRegUsers)
    if(lgnUsername === "" || lgnPassword === ""){
        alert("all field must be filled")
    }

    else{
        let lgdData = {
            name:lgnUsername,
            password:lgnPassword
        }
        for(let i = 0; i < allRegUsers.length; i++){
            if(allRegUsers.length === 0){
                alert('Please Register')
            }
            else if(allRegUsers[i].UserName === lgdData.name && allRegUsers[i].Password !== lgdData.password){
                alert('Wrong Password')
            }
            else if(allRegUsers[i].UserName === lgdData.name && allRegUsers[i].Password === lgdData.password){
                lgdUser.userWho(allRegUsers[i])
                setInterval(() => {
                    location.href = '../html/userHomepage.html'
                }, 500)
                break
            }
            else if(i === allRegUsers.length - 1){
                alert('Please Register')
            }
        }
    }
}
