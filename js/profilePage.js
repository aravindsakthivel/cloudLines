let crnUser = lgdUser.allData()
let userData = new UserDataBase(crnUser.UserName)
let place = 'null'


window.onload = () => {
    let homeBtn = document.getElementById('home_btn')
    let logoutBtn = document.getElementById('logout_btn')
    let findFriend = document.getElementById("find_friend")
    let showProfile = document.getElementById("profile_info")
    let personalInfo = document.getElementById('more_info')
    homeBtn.addEventListener('click', refresh)
    logoutBtn.addEventListener('click', logout)
    findFriend.addEventListener('click',findFriendsPage)
    showProfile.addEventListener('click', profilePage)
    personalInfo.addEventListener('submit', getInfo)
    loadPage(true)
    
}


const getInfo = () => {
    event.preventDefault()
    let data = new FormData(event.target)
    let gender = data.get('gender')
    let about = data.get('about_you')
    userData.addPersonalInfo([gender, about])
    loadPage(false)
}

const loadPage = (option) =>{
    let name = document.getElementById('my_profile_name')
    name.textContent = crnUser.FullName
    let userThgts = []
    let userData = new UserDataBase(crnUser.UserName)
    if(!option){
        let profilePersonalData = document.getElementById('profile_data_in')
        let personalData = userData.getPersonalInfo()
        if(personalData){
            profilePersonalData.innerHTML = `<div>${personalData[1]}</div>`
        }
    }
    if(userData.allData().length !== 0){
        userThgts = userData.getThgts()
    } 
    let flag = true
    let thoughtHolder = document.getElementById('thought')
    thoughtHolder.innerHTML = ''
    if(userThgts.length === 0){
        flag = false
        thoughtHolder.innerHTML = `
            <div class="col-lg-4 col-md-4 col-sm-9 thought_info">
                <div class="card border-0 shadow rounded w3-animate-right">
                    <div class="card-body pt-1 ">
                        You haven't posted anything
                    </div>
                </div>
            </div>`
    }
    if(option && flag){
        ThoughtsrenderDom()
    }
}


const ThoughtsrenderDom = () =>{
    let userThgts = userData.getThgts()
    let thoughtHolder = document.getElementById('thought')
    thoughtHolder.innerHTML = ''
    let dbFlag = false
    for(let i = userThgts.length - 1; i >= 0; i--){
        let like = 0
        let comment = 0
        let margin = 'mb-1'
        if('likes' in userThgts[i]){
            like = userThgts[i].likes.length
        }
        if('comments' in userThgts[i]){
            let commentInd = ldrComment.allData()
            let place = userData.getThgts()[i].Ord
            comment = commentInd[0][place].length
        }
        if(!(userThgts[0].Flag) && place === 'null'){
            let length = 0
            while(length < userThgts.length - 1){
                if(userThgts[length].Flag){
                    place = length
                    break
                }
                length++
            }
        }
        if(place === i){
            margin = 'lastComment'
        }
        else if(margin !== 'lastComment'){
            if(i === 0){
                margin = 'lastComment'
            }
        }
        if(!(userThgts[i].Flag)){
            if(i === 0 && !dbFlag){
                thoughtHolder.innerHTML = `
                    <div class="col-lg-4 col-md-4 col-sm-9 thought_info">
                        <div class="card border-0 shadow rounded w3-animate-right">
                            <div class="card-body pt-1 ">
                                You haven't posted anything
                            </div>
                        </div>
                    </div>`
            }
            continue
        }
        dbFlag = true
        thoughtHolder.innerHTML += `
            <div class="col-lg-4 col-md-4 col-sm-9 thought_info">
                <div class="card border-0 shadow rounded w3-animate-right ${margin}">
                    <div class='d-flex justify-content-between'>
                        <div class='card-title text-black-50 pl-3 ml-1 mb-0 pt-2'>${userThgts[i].Date}</div>
                        <i class="fa fa-trash text-danger float-right pr-3" aria-hidden="true" onclick='deleteThgt(${i})'></i>
                    </div>
                    <hr>
                    <div class="card-body pt-1 ">
                        ${userThgts[i].Thought}
                    </div>
                    <div class="card-footer pb-0">
                        <div class="d-flex justify-content-between">
                            <p class="mt-2">Likes: ${like}</p>
                            <p class="btn" data-toggle="collapse" href="#comment_${i}" onclick='commentshow(${i})' role="button" aria-expanded="false" aria-controls="comment_${i}_example">
                                comments: ${comment}
                            </p>
                        </div>
                    </div>
                    <div class="collapse" id="comment_${i}">
                        <div class="card bg-dark">
                            <div class="card-body bg-dark" id='comment_holder_${i}'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    }
}


const commentshow = (loc) =>{
    let userThgts = userData.getThgts()
    let no = userThgts[loc].Ord
    console.log(no)
    let commentHolder = document.getElementById(`comment_holder_${loc}`)
    commentHolder.innerHTML = ""
    let commentInd = ldrComment.allData()
    if(commentInd[0] === undefined || commentInd[0][no] === undefined){
        commentHolder.innerHTML = "No Comments"
    }
    else{
        for(let i = commentInd[0][no].length - 1; i >= 0 ; i--){
            let [user, ord] = commentInd[0][no][i]
            let ldr = ldrThgts.allData()
            let thgtno = ldr[no].ThoughtNo
            let userThgts = new UserDataBase(crnUser.UserName)
            let allData = userThgts.allData()
            let commentOfThght  = allData[0].thoughtData[thgtno].comments
            let cmbData = commentOfThght[user][ord]
            commentHolder.innerHTML += `
                <div class="card-body">
                    <img class="pr_pic float-left mr-2" src="../Resources/profilePic.png">
                    <div class="d-flex flex-column mx-2 mt-2">
                        <div class="card-title text-white">${cmbData[2]}<small class="text-white-50 ml-2">${cmbData[1]}</small></div>
                        <div class="text-white">
                            ${cmbData[0]}
                        </div>
                    </div>
                </div>`
        }
    }
}


const deleteThgt = (no) =>{
    userData.deleteThgts(no)
    ThoughtsrenderDom()
}