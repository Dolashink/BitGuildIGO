const contract = require('../service/Blockchain/contractMathed')
const watcher = require('./watcher/watcher')
const mysql = require('../model/mysql')
const messagepusher = require('../service/MessagePush/messagePush')

const Core = function () {
    this.itemList = [16,17,18,19,20]
    this.igo = new contract
    this.timer = new watcher
    this.db = new mysql
    this.msgpusher = new messagepusher
}

Core.prototype.start = function () {
    let time = '20 * * * * *'
    this.watchBlockChain(time)
}

Core.prototype.watchBlockChain = function (time) {
    this.min = 0;
    this.timer.initWatcher(time, () => {
        this.igo.getQuantityOfItem(this.itemList[this.min], (value) => {
            let currentQty = this.db.select(this.itemList[this.min])
            if(value != currentQty){
                this.msgpusher.pushMsgToRobote( () => {
                    this.db.update([value, this.itemList[this.min]])
                })
            }
            console.log(value)
            console.log(this.min)
            if(this.min < 4){
                this.min ++
            }else{
                this.min = 0
            }
        });
    })
}

module.exports = Core
