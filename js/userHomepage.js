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
    let no = 0
    if(userThgts.allData().length === 0){
        no = 0
    }
    else{
        no = userThgts.allData()[0].post.length
    }
    let thgtData = {
        Date:date,
        No: no,
        Thought:thgt
    }
    let ldrobj = {
        User:crnUser.UserName,
        No:no
    }

    userThgts.addthgts(thgtData,crnUser.FullName ,crnUser.id)
    ldrThgts.indexThgts(ldrobj)
    renderDom()
}


const renderDom = () =>{
    let ldr = ldrThgts.allData()
    let thgtsHolder = document.getElementById('everyThoughts')
    thgtsHolder.innerHTML = ""
    for(let i = 0; i < ldr.length; i++){
        let userThgts = new UserDataBase(ldr[i].User)
        let data = userThgts.allData()
        thgtsHolder.innerHTML +=`
            <div class="col-lg-12 col-md-12 col-sm-12 p-0">
                <div class="card border-0 bg-dark mb-1 shadow">
                    <div class="card-body">
                        <img class="pr_pic float-left mr-2" src="../Resources/profilePic.png">
                        <div class="d-flex flex-column mx-2 mt-2">
                            <div class="card-title text-white">${data[0].user}<small class="text-white-50 ml-2">${data[0].post[ldr[i].No].Date}</small></div>
                            <div class="text-white">
                                ${data[0].post[ldr[i].No].Thought}
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="d-flex justify-content-between mt-2 ">
                            <i class="fa fa-heart text-white fa-1x" aria-hidden="true"></i>
                            <i class="fa fa-comments text-white btn fa-1x" data-toggle="collapse" href="#collapse${i}" role="button" aria-expanded="false" aria-controls="collapseExample"></i>
                            <i class="fa fa-retweet text-white fa-1x" aria-hidden="true"></i>
                            <i class="fa fa-share-alt text-white fa-1x" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="collapse" id="collapse${i}">
                        <div class="card card-body bg-dark text-white-50 border-bottom-0">
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