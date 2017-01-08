import async from 'async';
import QueueTask from './QueueTask'

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

export {addUserTask, addSystemTask};