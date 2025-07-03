function throttle(fn, delay = 500) {
    let lastTime = 0
    return function(...args) {
        const now = new Date().getTime()
        if(now - lastTime > delay) {
            fn.apply(this, args)
            lastTime = now
        }
    }
}