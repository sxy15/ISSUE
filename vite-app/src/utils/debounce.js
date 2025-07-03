export function debounce(fn, delay = 500) {
    let timer = null
    return function(...args) {
        const that = this
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(that, args)
        }, delay)
    }
}