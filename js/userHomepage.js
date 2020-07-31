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


const renderDom = () =>{
    let ldr = ldrThgts.allData()
    let thgtsHolder = document.getElementById('everyThoughts')
    thgtsHolder.innerHTML = ""
    for(let i = 0; i < ldr.length; i++){
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
                        <div class="card card-body bg-dark text-white-50 border-left-0 border-right-0 border-bottom-0">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                        </div>
                        <form class="mx-5">
                            <div class="form-group">
                                <textarea class="form-control bg-dark text-white" id="comment${i}" rows="2" placeholder="comments"></textarea>
                            </div>
                            <button type="submit" class="btn btn-info btn-sm btn-block mb-2">Submit</button>
                        </form>
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


const logout = () =>{
    setTimeout(() =>{
        window.location.reload(true);
        window.location.replace('../html/login.html');
    }, 300)
}


const likeCount = (ldr, no) =>{
    let userThgts = new UserDataBase(ldr[no].User)
    let data = userThgts.allData()
    let indivThgt = data[0].thoughtData[ldr[no].ThoughtNo]
    return indivThgt.likes.length
    
}



// crn = current
// thgt = thought
// wr = write
// btn = button
// ldr = ledger
// obj = object
// lgd = logged