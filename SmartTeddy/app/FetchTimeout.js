export default function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new TypeError('timeout'))
        }, ms);
        promise.then(resolve, reject);
    })
}