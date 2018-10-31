const Request = require('./httpRequst')
const config = require('./config')

const MessagePusher = function () {
    this.data = JSON.stringify(config.raw);
};

MessagePusher.prototype.pushMsgToRobote = function(callback){
    var HttpsRquest = new Request
    HttpsRquest.post(this.data)
    if(callback){
        callback();
    }
}

module.exports = MessagePusher;