function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}

function isEqual(obj1, obj2) {
    if(!isObject(obj1) || !isObject(obj2)) {
        return obj1 === obj2
    }

    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if(keys1.length !== keys2.length) {
        return false
    }

    for(let key of keys1) {
        if(!keys2.includes(key)) {
            return false
        }
        if(!isEqual(obj1[key], obj2[key])) {
            return false
        }
    }

    return true
}
