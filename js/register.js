window.onload = () =>{
    let regForm = document.querySelector('#reg_btn')
    regForm.addEventListener('click', getRegData)
}

const getRegData = () =>{
    event.preventDefault()
    let regName =  document.getElementById("reg_name").value
    let regUsername = document.getElementById("reg_user_name").value
    let regEmail =  document.getElementById("reg_email").value
    let regPasswd =  document.getElementById("reg_pwd").value
    
    if(regName === "" || regUsername === "" || regEmail === "" || regPasswd === ""){
        alert("All fields must be filled")
    }
    else{
        let userEntData = {
            FullName:regName,
            UserName:regUsername,
            Email:regEmail,
            Password:regPasswd
        }
        let flag = false
        let allRegUsers = regUsers.allData()
        if(allRegUsers.length === 0){
            regUsers.addUser(userEntData)
            setTimeout(() =>{
                alert("Successfully registered")
            }, 200)
            
        }
        else{
            for (let i = 0; i < allRegUsers.length; i++){
                if(allRegUsers[i].UserName === userEntData.UserName){
                    alert("The Username is already used")
                    break
                }
                else if(allRegUsers[i].Email === userEntData.Email){
                    alert("The Username is already used")
                    break
                }
                else if(i === allRegUsers.length - 1){
                    flag = true
                    setTimeout(() =>{
                        alert("Successfully registered")
                    }, 200)
                    break
                }
            }
            if(flag){
                regUsers.addUser(userEntData)
            }
        }
        
    }
}


// reg = Registered