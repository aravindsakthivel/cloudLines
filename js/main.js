class CreateDataBase {
    constructor(name){
        this.name = name

        this.init = () => {
            let result = JSON.parse(localStorage.getItem(this.name))
            if(!result){
                this.updateDB([])
            }
        }

        this.updateDB = (data) => {
            localStorage.setItem(this.name, JSON.stringify(data))
        }

        this.allData = () => {
            this.init()
            return JSON.parse(localStorage.getItem(this.name))
        }

    }


    addUser(userCreds){
        let allUser = this.allData()
        if(allUser.length === 0){
            userCreds['id'] = allUser.length + 1
            userCreds['flag'] = true
        }
        else{
            userCreds['id'] = allUser.length + 1
            userCreds['flag'] = true
        }
        allUser.push(userCreds)
        this.updateDB(allUser)
    }

}



class CurrentUser extends CreateDataBase{
    constructor(name){
        super(name)
        this.init = () =>{
            let result = JSON.parse(localStorage.getItem(this.name))
            if(!result){
                this.updateDB({})
            }
        }
    }


    userWho(data){
        this.updateDB(data)
    }

}


class UserDataBase extends CreateDataBase{
    constructor(name){
        super(name)
    }


    addthgts(thgt,name,id){
        let allthgts = this.allData()
        if(allthgts.length === 0){
            let userthgt = {
                user: name,
                id:id,
                thoughtData:[thgt]
            }
            allthgts.push(userthgt)
        }
        else{
            allthgts[0].thoughtData.push(thgt)
        }
        this.updateDB(allthgts)
    }


    addLikes(user, thgtNo){
        let allData = this.allData()
        let thghtsData = allData[0].thoughtData[thgtNo]
        if(!('likes' in thghtsData)){
            let likers = []
            likers.push(user)
            thghtsData.likes = likers
        }
        else{
            thghtsData.likes.push(user)
        }
        this.updateDB(allData)
    }


    removeLikes(user, thgtNo){
        let allData = this.allData()
        let thghtsData = allData[0].thoughtData[thgtNo]
        let likesArr = thghtsData.likes
        let userInd = likesArr.indexOf(user)
        likesArr.splice(userInd, 1)
        this.updateDB(allData)
    }


    addComments(user, thgtNo, comment){
        let allData = this.allData()
        let thghtsData = allData[0].thoughtData[thgtNo]
        if(!('comments' in thghtsData)){
            thghtsData.comments = {}
            if(!(user in thghtsData.comments)){
                let userComments = []
                userComments.push(comment)
                thghtsData.comments = {
                    [user]:userComments
                }
            }
        }
        else{
            if(!(thghtsData.comments.hasOwnProperty(user))){
                let userComments = []
                userComments.push(comment)
                Object.assign(thghtsData.comments, { [user]:userComments})
            }
            else{
                thghtsData.comments[user].push(comment)
            }
        }
        this.updateDB(allData)
    }
}


class Ledger extends CreateDataBase{
    constructor(name){
        super(name)
    }


    indexThgts(ind){
        let allthgtsInd = this.allData()
        if(allthgtsInd.length === 0){
            ind.ord = 0
            allthgtsInd.push(ind)
        }
        else{
            ind.ord = allthgtsInd.length
            allthgtsInd.push(ind)
        }
        this.updateDB(allthgtsInd)
    }


    indexComments(thgtNo, user, no){
        let allCommentInd = this.allData()
        if(allCommentInd.length === 0){
            let temp = [user, no]
            let data = {
                [thgtNo]:[temp]
            }
            allCommentInd.push(data)
        }
        else if(!(allCommentInd[0].hasOwnProperty(thgtNo))){
            let temp = [user, no]
            Object.assign(allCommentInd[0], { [thgtNo]:[temp]})
        }
        else{
            let temp = [user, no]
            console.log(allCommentInd[0][thgtNo])
            allCommentInd[0][thgtNo].push(temp)
        }
        this.updateDB(allCommentInd)
    }

}






let regUsers = new CreateDataBase('Registered_Users')
let lgdUser = new CurrentUser('Current_User')
let ldrThgts = new Ledger('thoughtLedger')
let ldrComment = new Ledger('commentLedger')


// lgn = login
// lgd = logged
// reg = Registered
// thgt = thought
// thgts = thoughts
// wr = write
// btn = button
// ind = index
// ldr = ledger
// ord = order
