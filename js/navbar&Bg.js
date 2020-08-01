const refresh = () =>{
    setTimeout(() =>{
        window.location.href = "../html/userHomepage.html"
    }, 300)
    
}


const logout = () =>{
    setTimeout(() =>{
        window.location.reload(true);
        window.location.replace('../html/login.html');
    }, 300)
}


const findFriendsPage = () => {
    setTimeout(() =>{
        window.location.href = "../html/findFriends.html"
    }, 300)
}


const profilePage = () =>{
    setTimeout(() =>{
        window.location.href = "../html/profilePage.html"
    }, 300)
}