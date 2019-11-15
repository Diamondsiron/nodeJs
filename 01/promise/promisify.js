module.exports = function promisify(fn) {
    return function (...args) {
        return new Promise(
            function (resolve, resolve) {
                args.push(function (err, ...args) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(...arg)
                    }
                })
                fn.apply(null, args)
            }
        )
        
    }
}