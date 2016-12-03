export default class QueueTask {
    constructor (name, action, onStart, onSuccess, onFail) {
        this.eventsHandlers = {};
        this.name = name;
        this.action = action;
        this.onStart = onStart;
        this.onSuccess = onSuccess;
        this.onFail = onFail;


        this._active = false;
        this._resolved = false;
        this._failed = false;
    }

    start () {
        console.log('start');
        this.onStart();
        this._active = true;
        let prom = this.action();
        prom.then(this._onSuccess.bind(this)).catch(this._onFail.bind(this));
        return prom;

        //let prom = new Promise( (resolve, reject) => {
        //    this.onStart();
        //    this.action(resolve, reject);
        //    this._active = true;
        //    //prom = this.action();
        //    //this.onStart(prom);
        //    //this._active = true;
        //});
        //prom.then(this._onSuccess.bind(this)).catch(this._onFail.bind(this));
        //return prom;
    }

    _onSuccess (result) {
       // console.log('success');
        this.onSuccess(result);
        this._active = false;
        this._resolved = true;
        this._result = result;

        if (this.callback) {
            this.callback(result);
        }

    }

    _onFail (error) {
       // console.log('fail');
        this.onFail(error);
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

}