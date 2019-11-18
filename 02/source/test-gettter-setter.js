const wanne = {
    info:{name : 'wanne',desc:'玩得好'},
    get name(){
        return this.info.name
    },
    set name(val){
        console.log('new name is '+ val)
        this.info.name = val + 'ggg'
    }
}

console.log(wanne.name)
kaikeba.name = 'wanne'
console.log(wanne.name)