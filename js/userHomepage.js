let crnUser = lgdUser.allData()

window.onload = () => {
    let thgtWrBtn = document.getElementById("thoughtBtn")
    thgtWrBtn.addEventListener('click', getThgt)
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

    userThgts.addthgts(thgtData,crnUser.FullName ,crnUser.id)
}


let dummy = [{"user":"Kevin","id":2,"post":[{"Date":"Jul 30 2020 ","No":0,"Thought":"write"},{"Date":"Jul 30 2020 ","No":1,"Thought":"write"},{"Date":"Jul 30 2020 ","No":2,"Thought":"write"}]}]



{/* <div class="col-lg-12 col-md-12 col-sm-12 p-0 mb-5">
        <div class="card border-0 bg-dark mb-1 shadow">
            <div class="card-body">
                <img class="pr_pic float-left mr-2" src="../Resources/profilePic.png">
                <div class="d-flex flex-column mx-2 mt-2">
                    <div class="card-title text-white">Aravindan<small class="text-white-50"> 23/Apr</small></div>
                    <div class="text-white">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
                        unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
                        sheets containing Lorem Ipsum passages, and more recently with 
                        desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="d-flex justify-content-between mt-2 ">
                    <i class="fa fa-heart text-white fa-1x" aria-hidden="true"></i>
                    <i class="fa fa-comments text-white btn fa-1x" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"></i>
                    <i class="fa fa-retweet text-white fa-1x" aria-hidden="true"></i>
                    <i class="fa fa-share-alt text-white fa-1x" aria-hidden="true"></i>
                </div>
            </div>
            <div class="collapse" id="collapseExample">
                <div class="card card-body bg-dark text-white-50 border-bottom-0">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                    Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                </div>
                <form class="mx-5">
                    <div class="form-group">
                        <textarea class="form-control bg-dark text-white" id="exampleFormControlTextarea1" rows="2" placeholder="comments"></textarea>
                    </div>
                    <button type="submit" class="btn btn-info btn-sm btn-block mb-2">Submit</button>
                </form>
            </div>
        </div>
    </div> */}

// crn = current
// thgt = thought
// wr = write
// btn = button