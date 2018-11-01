const Request = require('./httpRequst')
const config = require('./config')

const MessagePusher = function () {
    //this.data = JSON.stringify(config.raw);
};

MessagePusher.prototype.pushMsgToRobote = function(msgbody, callback){
    var HttpsRquest = new Request
    HttpsRquest.post(msgbody)
    if(callback){
        callback();
    }
}

module.exports = MessagePusher;