const contract = require('../service/Blockchain/contractMathed')
const watcher = require('./watcher/watcher')
const mysql = require('../model/mysql')
const messagepusher = require('../service/MessagePush/messagePush')
const Log4js = require('../controller/fstream/log4j')

const Core = function () {
    this.itemList = [16,17,18,19,20]
    this.igo = new contract
    this.timer = new watcher
    this.db = new mysql
    this.msgpusher = new messagepusher
    this.log = new Log4js
}

Core.prototype.start = function () {
    let time = '20 * * * * *'
    this.watchBlockChain(time)
}

Core.prototype.watchBlockChain = function (time) {
    this.min = 0;
    this.timer.initWatcher(time, () => {
        this.igo.getQuantityOfItem(this.itemList[this.min], (value) => {
            this.db.select(this.itemList[this.min], (res) => {
                console.log('Current Qty: ' + res.purchased + ' &&  BlockChain: ' + value)
                if (value != res.purchased){
                    let msgbody = 
                    {
                        "msgtype": "text",
                        "text": {
                            "content": "A new IGO item has been sold [" + res.itemname + "]"
                        },
                        "at": {
                            "atMobiles": [

                            ],
                            "isAtAll": false
                        }
                    }
                    this.msgpusher.pushMsgToRobote(JSON.stringify(msgbody), () => {
                        this.db.update([value, this.itemList[this.min]], () => {
                            if (this.min < 4) {
                                this.min++
                            } else {
                                this.min = 0
                            }           
                        })
                    })
                }else{
                    if (this.min < 4) {
                        this.min++
                    } else {
                        this.min = 0
                    }
                }
            })  
        })
    })
}

module.exports = Core
