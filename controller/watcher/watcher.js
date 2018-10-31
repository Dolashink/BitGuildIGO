const schedule = require('node-schedule');

const Watcher = function () {}

Watcher.prototype.initWatcher = function (time, task) {
    this.watch = schedule.scheduleJob(time, () => {
        if(task){
            task()
        }
    }) 
}

module.exports = Watcher