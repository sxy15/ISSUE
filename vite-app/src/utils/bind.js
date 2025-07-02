function fn1(a, b) {
    console.log(this)
    console.log(a, b)

    return 'this is fn1'
}

// const fn2 = fn1.bind({x: 100}, 10, 20)

// const res = fn2()

// console.log(res)

Function.prototype.selfBind = function(self) {
    const fn = this;
    const args = Array.prototype.slice.call(arguments, 1);
    
    return function() {
        return fn.apply(self, args);
    };
};

const fn2 = fn1.selfBind({x: 100}, 10, 20)

const res = fn2()

console.log(res)