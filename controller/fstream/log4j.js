const fstream = require('fs')

const Fstream = function () {
    this.optionsIn = {
        flag: 'r',
        encoding: 'utf8',
        autoClose: 'true',
        mode: '0666',
        stat: 0
    }

    this.optionsOut = {
        flags: 'a',
        encoding: 'utf8',
        autoClose: 'true',
        mode: '0666',
        start: 0
    }

    this.fs = fstream;
}

Fstream.prototype.info = function (data) {
    this.log('info', data)
}

Fstream.prototype.warn = function (data) {
    this.log('warn', data)
}

Fstream.prototype.err = function (data) {
    this.log('err', data)
}

Fstream.prototype.log = function (type, data) {
    var fileName = this.formatDate() + '.txt'
    let fpath = './log/' + fileName
    this.fs.exists(fpath, (exists) => {
        if (!exists) {
            console.log('creating' + fpath)
            this.fs.writeFile(fpath, '', function (err) {
                if (err) {
                    return console.log(err)
                } else {
                    console.log('log file created')
                }
            })
        }else{
            let text = '[' + type + ']' + '[' + this.getCurrentTime() + ']-' + data + "\n"
            this.write(fpath, text)
        }
    })
}


Fstream.prototype.write = function (fpath, data) {
    let out = this.fs.createWriteStream(fpath, this.optionsOut)
    out.write(data, (err) => {
        if(err){
            console.log(err)
        }
    })
}

Fstream.prototype.formatDate = function () {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    String(curr_month).length < 2 ? (curr_month = "0" + curr_month) : curr_month;
    String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
    var yyyyMMdd = curr_year + "-" + curr_month + "-" + curr_date;
    return yyyyMMdd;
}

Fstream.prototype.getCurrentTime = function () {
    var date = new Date();
    var currentTime = date.getHours() + ':' + date.getMinutes()
        + ':' + date.getSeconds();
    return currentTime;
}

module.exports = Fstream