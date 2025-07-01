type ResolveType = (value: any) => any;
type RejectType = (reason: any) => any;

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
};

class SPromise {
    state = STATUS.PENDING;
    value: any = undefined;
    reason: any = undefined;
    resolveCallbacks: any[] = [];
    rejectCallbacks: any[] = [];

    constructor(fn: (resolve: (value: any) => void, reject: (reason: any) => void) => void) {
        const resolveHandler = (value: any) => {
            if (this.state === STATUS.PENDING) {
                this.state = STATUS.FULFILLED;
                this.value = value;
                this.resolveCallbacks.forEach(callback => callback(this.value));
            }
        };

        const rejectHandler = (reason: any) => {
            if (this.state === STATUS.PENDING) {
                this.state = STATUS.REJECTED;
                this.reason = reason;
                this.rejectCallbacks.forEach(callback => callback(this.reason));
            }
        };

        try {
            fn(resolveHandler, rejectHandler);
        } catch (error) {
            rejectHandler(error);
        }
    }

    then(resolve?: ResolveType | null, reject?: RejectType): SPromise {
        const newPromise = new SPromise((resolveNew: ResolveType, rejectNew: RejectType) => {
            if (this.state === STATUS.FULFILLED) {
                setTimeout(() => {
                    try {
                        if (typeof resolve !== 'function') {
                            resolveNew(this.value);
                            return;
                        }
                        const x = resolve(this.value);
                        resolvePromise(newPromise, x, resolveNew, rejectNew);
                    } catch (error) {
                        rejectNew(error);
                    }
                }, 0);
            }

            if (this.state === STATUS.REJECTED) {
                setTimeout(() => {
                    try {
                        if (typeof reject !== 'function') {
                            rejectNew(this.reason);
                            return;
                        }
                        const x = reject(this.reason);
                        resolvePromise(newPromise, x, resolveNew, rejectNew);
                    } catch (error) {
                        rejectNew(error);
                    }
                }, 0);
            }

            if (this.state === STATUS.PENDING) {
                this.resolveCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof resolve !== 'function') {
                                resolveNew(this.value);
                                return;
                            }
                            const x = resolve(this.value);
                            resolvePromise(newPromise, x, resolveNew, rejectNew);
                        } catch (error) {
                            rejectNew(error);
                        }
                    }, 0);
                });

                this.rejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof reject !== 'function') {
                                rejectNew(this.reason);
                                return;
                            }
                            const x = reject(this.reason);
                            resolvePromise(newPromise, x, resolveNew, rejectNew);
                        } catch (error) {
                            rejectNew(error);
                        }
                    }, 0);
                });
            }
        });

        return newPromise;
    }

    catch(reject: RejectType): SPromise {
        return this.then(null, reject);
    }
}

function resolvePromise(newPromise: SPromise, x: any, resolve: ResolveType, reject: RejectType) {
    if (newPromise === x) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }

    if (x instanceof SPromise) {
        x.then(resolve, reject);
        return;
    }

    if (typeof x === 'object' || typeof x === 'function') {
        if (x === null) {
            return resolve(x);
        }

        let then: any;
        try {
            then = x.then;
        } catch (error) {
            return reject(error);
        }

        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(
                    x,
                    (y: any) => {
                        if (called) return;
                        called = true;
                        resolvePromise(newPromise, y, resolve, reject);
                    },
                    (r: any) => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                );
            } catch (error) {
                if (called) return;
                reject(error);
            }
        } else {
            resolve(x);
        }
    } else {
        resolve(x);
    }
}

export {
    SPromise
}
