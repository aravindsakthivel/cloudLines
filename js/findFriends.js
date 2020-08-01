window.onload = () => {
    let homeBtn = document.getElementById('home_btn')
    let logoutBtn = document.getElementById('logout_btn')
    let findFriend = document.getElementById("find_friend")
    let showProfile = document.getElementById("profile_info")
    homeBtn.addEventListener('click', refresh)
    logoutBtn.addEventListener('click', logout)
    findFriend.addEventListener('click',findFriendsPage)
    showProfile.addEventListener('click', profilePage)
}