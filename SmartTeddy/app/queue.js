import async from 'async';
import QueueTask from './QueueTask'

var queue = async.priorityQueue(function(task, callback) {
    task.start()
        .then((result) => {
            //console.log('Success here:', task.name);
            //console.log('Success here:', result);
            callback();
        })
        .catch((error)=>{
            console.log('Failure here:', task.name);
            console.log('Failure here:', error);
            callback();
        });
}, 1);

// assign a callback
queue.drain = function() {

};
var lastTaskName = '';
var lastTaskTime = Date.now();
var addUserTask = function(name, action, onStart, onSuccess, onFail, onDelete = () =>{console.log('delete task')}){
    let clearName = name.split(':')[0];
    if ((name == lastTaskName) && (Date.now() - lastTaskTime) < 2000) {
        onDelete();
        console.log('dubleaction');
        return;
    }
    lastTaskName = name;
    lastTaskTime = Date.now();
    let task = new QueueTask(name, action, onStart, onSuccess, onFail);
    queue.push(task, 1, function(err){});
};
var addSystemTask = function(name, action, onStart, onSuccess, onFail){
    let task = new QueueTask(name, action, onStart, onSuccess, onFail);
    queue.push(task, 2, function(err){});
};

export {addUserTask, addSystemTask};