import async from 'async';
class QueueTask {
    constructor (name, action, onStart) {
        this.eventsHandlers = {};
        this.name = name;
        this.action = action;
        this.onStart = onStart;


        this._active = false;
        this._resolved = false;
        this._failed = false;
    }

    start () {
        console.log('start');
        let prom = new Promise( (resolve, reject) => {
            this.action(resolve.bind(this), reject);
            this._active = true;
        });
        prom.then(this._onSuccess.bind(this)).catch(this._onFail.bind(this));
        return prom;
    }

    _onSuccess (result) {
        console.log('success');
        this._active = false;
        this._resolved = true;
        this._result = result;

        if (this.callback) {
            this.callback(result);
        }

    }

    _onFail () {
        console.log('fail');
        this._active = false;
        this._failed = true;
    }

    isActive () {
        return this._active;
    }

    then (callback) {
        this.callback = callback;
        if (this._resolved || this._failed) {
            callback(this._result);
        }
    }
    on (name, cb) {
        if (!this.eventsHandlers[name]) {
            this.eventsHandlers[name] = [];
        }

        this.eventsHandlers[name].push(cb);
    }

    trigger (name, params) {
        this.eventsHandlers[name].forEach(cb => cb(params));
    }

}

let task1 = new QueueTask('task1',
    function (done, fail) {
       // done('Результат первой функции');
        setTimeout(function () {
            console.log('Первая функция 1500');
            done('Результат первой функции');
        }, 200)
    },
    function(){console.log('onStart')}
);


task1.then(function (result) {
    console.log('Таск 1 выполненс с результатом:', result);
});

// create a queue object with concurrency 2
var q = async.priorityQueue(function(task, callback) {
    console.log('hello ' + task.name);
    task.start().then(
        (result) => console.log('Success here:', result)
        //() => console.log('Failure here')
    ).catch((error)=>console.log('Failure here:', error));
    callback();
}, 1);

// assign a callback
q.drain = function() {
    console.log('all items have been processed');
};

// add some items to the queue
q.push(task1, 2, function(err){console.log('finished processing first');});


export default q;