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
                post:[thgt]
            }
            allthgts.push(userthgt)
        }
        else{
            allthgts[0].post.push(thgt)
        }
        this.updateDB(allthgts)
    }
}


class thgtsLdr extends CreateDataBase{
    constructor(name){
        super(name)
    }


    indexThgts(ind){
        let allthgtsInd = this.allData()
        allthgtsInd.unshift(ind)
        this.updateDB(allthgtsInd)
    }

}



let regUsers = new CreateDataBase('Registered_Users')
let lgdUser = new CurrentUser('Current_User')
let ldrThgts = new thgtsLdr('ledger')


// lgn = login
// lgd = logged
// reg = Registered
// thgt = thought
// thgts = thoughts
// wr = write
// btn = button
// ind = index
// ldr = ledger