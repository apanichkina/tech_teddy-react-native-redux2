import async from 'async';
import QueueTask from './QueueTask'


//
//let task1 = new QueueTask('task1',
//    function (done, fail) {
//       // done('Результат первой функции');
//        setTimeout(function () {
//            console.log('Первая функция 1500');
//            done('Результат первой функции');
//        }, 200)
//    },
//    function(){console.log('onStart')}
//);
//
//
//task1.then(function (result) {
//    console.log('Таск 1 выполненс с результатом:', result);
//});
//
//let task2 = new QueueTask('task2',
//    function (done, fail) {
//        // done('Результат первой функции');
//        setTimeout(function () {
//            console.log('Вторая функция 2500');
//            done('Результат второй функции');
//        }, 200)
//    },
//    function(){console.log('onStart 222')}
//);
//
//
//task2.then(function (result) {
//    console.log('Таск 2 выполненс с результатом:', result);
//});

// create a queue object with concurrency 2
var queue = async.priorityQueue(function(task, callback) {
    task.start()
        .then((result) => {
            console.log('Success here:', result);
            callback();
        })
        .catch((error)=>{
            console.log('Failure here:', error);
            callback();
        });
}, 1);

// assign a callback
queue.drain = function() {

};

var addUserTask = function(name, action, onStart, onSuccess, onFail){
    let task = new QueueTask(name, action, onStart, onSuccess, onFail);
    queue.push(task, 1, function(err){});
};
var addSystemTask = function(name, action, onStart, onSuccess, onFail){
    let task = new QueueTask(name, action, onStart, onSuccess, onFail);
    queue.push(task, 2, function(err){});
};

// add some items to the queue
//q.push(task1, 2, function(err){console.log('finished processing first');});
//
//q.push(task2, 1, function(err){console.log('finished processing second');});
export {addUserTask, addSystemTask};