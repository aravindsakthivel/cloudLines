let crnUser = lgdUser.allData()


window.onload = () => {
    let thgtWrBtn = document.getElementById("thoughtBtn")
    thgtWrBtn.addEventListener('click', getThgt)
    let homeBtn = document.getElementById('home_btn')
    let logoutBtn = document.getElementById('logout_btn')
    let findFriend = document.getElementById("find_friend")
    let showProfile = document.getElementById("profile_info")
    homeBtn.addEventListener('click', refresh)
    logoutBtn.addEventListener('click', logout)
    findFriend.addEventListener('click',findFriendsPage)
    showProfile.addEventListener('click', profilePage)
    renderDom()
}


const getThgt = () =>{
    let thgt = document.getElementById('writtenthoughts').value
    let date =  Date().split("").slice(4,16).join("")
    let userThgts = new UserDataBase(crnUser.UserName)
    let thoughtNo = 0
    if(userThgts.allData().length === 0){
        thoughtNo = 0
    }
    else{
        thoughtNo = userThgts.allData()[0].thoughtData.length
    }
    let ldrobj = {
        User:crnUser.UserName,
        ThoughtNo:thoughtNo
    }
    ldrThgts.indexThgts(ldrobj)
    let thgtData = {
        Flag:true,
        Date:date,
        Ord:ldrThgts.getLastIndex(),
        ThoughtNo: thoughtNo,
        Thought:thgt
    }
    userThgts.addthgts(thgtData,crnUser.FullName ,crnUser.id)
    $('#thoughtModal').modal('hide')
    setTimeout(() =>{
        renderDom()
    }, 500)
}


const renderDom = () =>{
    let ldr = ldrThgts.allData()
    let thgtsHolder = document.getElementById('everyThoughts')
    thgtsHolder.innerHTML = ""
    for(var i = ldr.length - 1; i >= 0 ; i--){
        let userThgts = new UserDataBase(ldr[i].User)
        let data = userThgts.allData()
        let indivThgt = data[0].thoughtData[ldr[i].ThoughtNo]
        let likeOption = `like(${i})`
        let clr = 'text-white'
        let noLikes = 0
        let noComments = 0
        if(!indivThgt.Flag){
            continue
        }
        if(('likes' in indivThgt)){
            let temp = indivThgt.likes
            noLikes = temp.length
            if(temp.includes(crnUser.UserName)){
                clr = 'text-danger'
                likeOption = `unlike(${i})`
            }
        }
        if(('comments' in indivThgt)){
            let commentInd = ldrComment.allData()
            noComments = commentInd[0][i].length
        }
        thgtsHolder.innerHTML +=`
            <div class="col-lg-12 col-md-12 col-sm-12 p-0 ">
                <div class="card border-0 bg-dark mb-1 shadow w3-container w3-animate-top">
                    <div class="card-body">
                        <img class="pr_pic float-left mr-2" src="../Resources/profilePic.png">
                        <div class="d-flex flex-column mx-2 mt-2 ">
                            <div class="card-title text-white">${data[0].user}<small class="text-white-50 ml-2">${data[0].thoughtData[ldr[i].ThoughtNo].Date}</small></div>
                            <div class="text-white">
                                ${data[0].thoughtData[ldr[i].ThoughtNo].Thought}
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="d-flex justify-content-between mt-2 ">
                            <i class="fa fa-heart ${clr} fa-1x " aria-hidden="true" id='like_${i}' onclick='${likeOption}'>
                                <p class='text-success float-right ml-2'>${noLikes}</p>
                            </i>
                            <i class="fa fa-comments text-white btn fa-1x" data-toggle="collapse" href="#collapse${i}" id="commentImg${i}" onclick='commentshow(${i})' role="button" aria-expanded="false" aria-controls="collapseExample">
                                <p class='text-success float-right ml-2'>${noComments}</p>
                            </i>
                            <i class="fa fa-share-alt text-white fa-1x" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="collapse" id="collapse${i}">
                        <button class="btn btn-outline-info btn-sm badge-pill cmn_btn mt-2" onclick='commentPre(${i})'>comment</button>
                        <div class='card border-0 bg-dark mb-1 ml-5 w3-animate-left' id='comment_holder_${i}'>
                        </div>
                    </div>
                </div>
            </div>`
    }

}


const like = async (no) =>{
    let ldr = ldrThgts.allData()
    let likeIcon = document.getElementById(`like_${no}`)
    likeIcon.setAttribute('onclick', `unlike(${no})`)
    let likeCountNode = likeIcon.firstElementChild
    likeIcon.setAttribute('class', 'fa fa-heart text-danger fa-1x')
    let userThgts = new UserDataBase(ldr[no].User)
    await userThgts.addLikes(crnUser.UserName, ldr[no].ThoughtNo)
    likeCountNode.innerHTML = likeCount(ldr, no)
}


const unlike = async (no) => {
    let ldr = ldrThgts.allData()
    let likeIcon = document.getElementById(`like_${no}`)
    likeIcon.setAttribute('onclick', `like(${no})`)
    let likeCountNode = likeIcon.firstElementChild
    likeIcon.setAttribute('class', 'fa fa-heart text-white fa-1x')
    let userThgts = new UserDataBase(ldr[no].User)
    await userThgts.removeLikes(crnUser.UserName, ldr[no].ThoughtNo)
    likeCountNode.innerHTML = likeCount(ldr, no)
}


const likeCount = (ldr, no) =>{
    let userThgts = new UserDataBase(ldr[no].User)
    let data = userThgts.allData()
    let indivThgt = data[0].thoughtData[ldr[no].ThoughtNo]
    return indivThgt.likes.length
    
}


const commentPre = (no) =>{
    $('#commentModal').modal('show')
    console.log(no, 0)
    let commentBtn = document.getElementById('commentBtn')
    commentBtn.setAttribute('onclick', `getComment(${no})`)
}


const getComment = async (no) =>{
    console.log(no, 1)
    let ldr = ldrThgts.allData()
    let username = crnUser.UserName
    let thghtUser = ldr[no].User
    let thgtno = ldr[no].ThoughtNo
    let order = ldr[no].ord
    let comment = document.getElementById('writtencomment').value
    let date =  Date().split("").slice(4,16).join("")
    let fullName = crnUser.FullName
    let cmbData = [comment,date,fullName]
    $('#commentModal').modal('hide')
    let userThgts = new UserDataBase(thghtUser)
    await userThgts.addComments(username, thgtno, cmbData)
    let allData = userThgts.allData()
    let userCommentLocation = allData[0].thoughtData[thgtno].comments[username]
    await ldrComment.indexComments(order, username, userCommentLocation.length - 1)
    let commentImg = document.getElementById(`commentImg${no}`)
    let commentCount = commentImg.firstElementChild
    let commentInd = ldrComment.allData()
    let noComments = commentInd[0][no].length
    setTimeout(() =>{
        commentshow(no)
        commentCount.innerHTML = noComments
    }, 500)
}


const commentshow = (no) =>{
    let commentHolder = document.getElementById(`comment_holder_${no}`)
    commentHolder.innerHTML = ""
    let commentInd = ldrComment.allData()
    if(commentInd[0] === undefined || commentInd[0][no] === undefined){
        commentHolder.innerHTML += `
        <div class="card-body text-white">No Comments</div>` 
    }
    else{
        for(let i = commentInd[0][no].length - 1; i >= 0 ; i--){
            let [user, ord] = commentInd[0][no][i]
            let ldr = ldrThgts.allData()
            let thghtUser = ldr[no].User
            let thgtno = ldr[no].ThoughtNo
            let userThgts = new UserDataBase(thghtUser)
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



// crn = current
// thgt = thought
// wr = write
// btn = button
// ldr = ledger
// obj = object
// lgd = logged
