const https = require('https')
const config = require('./config')

const HttpsRequest = function (data) {}

HttpsRequest.prototype.post = function (data) {
    const req = https.request(config.options, (res) => {
        //console.log('statusCode:', res.statusCode)
        //console.log('headers:', res.headers)
        res.on('data', (d) => {
            //console.log('' + d)
        })
    })

    req.on('error', (e) => {
        console.error(e)
    })
    req.write(data)
    req.end()
}


module.exports = HttpsRequest;