let crnUser = lgdUser.allData()


window.onload = () => {
    let thgtWrBtn = document.getElementById("thoughtBtn")
    thgtWrBtn.addEventListener('click', getThgt)
    renderDom()
}


const getThgt = () =>{
    let thgt = document.getElementById('writtenthoughts').value
    let date =  Date().split("").slice(4,16).join("")
    let userThgts = new UserDataBase(crnUser.UserName)
    let thoughtNo = 0
    // object for thought
    if(userThgts.allData().length === 0){
        thoughtNo = 0
    }
    else{
        thoughtNo = userThgts.allData()[0].thoughtData.length
    }
    let thgtData = {
        Date:date,
        ThoughtNo: thoughtNo,
        Thought:thgt
    }
    // Object for ledger
    let ldrobj = {
        User:crnUser.UserName,
        ThoughtNo:thoughtNo
    }
    $('#thoughtModal').modal('hide')
    userThgts.addthgts(thgtData,crnUser.FullName ,crnUser.id)
    ldrThgts.indexThgts(ldrobj)
    setTimeout(() =>{
        renderDom()
    }, 500)


}


const renderDom = async () =>{
    let ldr = ldrThgts.allData()
    let thgtsHolder = document.getElementById('everyThoughts')
    thgtsHolder.innerHTML = ""
    for(var i = 0; i < ldr.length; i++){
        let userThgts = new UserDataBase(ldr[i].User)
        let data = userThgts.allData()
        let indivThgt = data[0].thoughtData[ldr[i].ThoughtNo]
        let likeOption = `like(${i})`
        let clr = 'text-white'
        let noLikes = 0
        if(('likes' in indivThgt)){
            let temp = indivThgt.likes
            noLikes = temp.length
            if(temp.includes(crnUser.UserName)){
                clr = 'text-danger'
                likeOption = `unlike(${i})`
            }
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
                            <i class="fa fa-comments text-white btn fa-1x" data-toggle="collapse" href="#collapse${i}" role="button" aria-expanded="false" aria-controls="collapseExample">
                                <p class='text-success float-right ml-2'>5</p>
                            </i>
                            <i class="fa fa-retweet text-white fa-1x" aria-hidden="true">
                                <p class='text-success float-right ml-2'>5</p>
                            </i>
                            <i class="fa fa-share-alt text-white fa-1x" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="collapse" id="collapse${i}">
                        <div class='card border-0 bg-dark mb-1 ml-5 w3-animate-left' id='comment_holder_${i}'>
                            <div class="card-body">
                                <img class="pr_pic float-left mr-2" src="../Resources/profilePic.png">
                                <div class="d-flex flex-column mx-2 mt-2">
                                    <div class="card-title text-white">xyz<small class="text-white-50 ml-2">20/03</small></div>
                                    <div class="text-white">
                                        lorta oaisfd f osijfikjf oflkbjhasdgfv kjasdfghjkwsertyui
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <img class="pr_pic float-left mr-2" src="../Resources/profilePic.png">
                                <div class="d-flex flex-column mx-2 mt-2">
                                    <div class="card-title text-white">xyz<small class="text-white-50 ml-2">20/03</small></div>
                                    <div class="text-white">
                                        lorta oaisfd f osijfikjf oflkbjhasdgfv kjasdfghjkwsertyui
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info btn-sm badge-pill cmn_btn" data-toggle="modal" data-target="#commentModal" onclick='commentPre(${i})'>comment</button>
                    </div>
                </div>
            </div>`
    }

}


const none = () =>{
    console.log(1)
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
    let commentBtn = document.getElementById('commentBtn')
    commentBtn.addEventListener('click', function(){
        getComment(no)
    })
}

const getComment = (no) =>{
    let comment = document.getElementById('writtencomment').value
    let ldr = ldrThgts.allData()
    let userThgts = new UserDataBase(ldr[no].User)
    userThgts.addComments(crnUser.UserName, ldr[no].ThoughtNo, comment)

}




const logout = () =>{
    setTimeout(() =>{
        window.location.reload(true);
        window.location.replace('../html/login.html');
    }, 300)
}
// crn = current
// thgt = thought
// wr = write
// btn = button
// ldr = ledger
// obj = object
// lgd = logged