const mysql = require('mysql')
const DBenv = require('./mysql.js')
const Log4j = require('../controller/fstream/log4j')

const Mysql = function () {
    this.log = new Log4j
    this.initDB()
}

Mysql.prototype.initDB = function () {
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        port: '3306',
        password: '',
        database: 'bitguildigo'
    })
    this.db = connection
}

Mysql.prototype.insert = function (data) {
    let db = this.initDB()
    let addSql = 'INSERT INTO igoitem (itemid, total, purchased) VALUES(?,?,?)'
    this.db.query(addSql, data, (err, result) => {
        if(err){
            this.log.err(err)
        }else{
            this.log.info(result)
        }
    })
}

Mysql.prototype.update = function (data) {
    let updateSql = 'UPDATE igoitem set purchased= ? where itemid = ?'
    let updateParams = data
    this.db.query(updateSql, updateParams, (err, result) => {
        if(err){
            console.log('[UPDATE ERROR] ' + err.message)
        }else{
            console.log('[UPDATE SUCCESS]' + 'Affect ' + result.affectedRows + 'rows')
        }
    })
}

Mysql.prototype.select = function (itemid, callback) {
    let query = 'SELECT purchased from igoitem where itemid = ' + itemid
    this.db.query(query, function (err, results) {
        if(err){
            console.log(err);
        }else{
            console.log(results[0]);
            return results[0].purchased
        }
        if(callback){
            callback()
        }
    })
}

module.exports = Mysql