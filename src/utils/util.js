
//promise全家桶
// Promise 的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        this.state = PENDING;      // 当前状态
        this.value = undefined;    // 成功值
        this.reason = undefined;   // 失败原因
        this.onFulfilledCallbacks = []; // 成功回调队列
        this.onRejectedCallbacks = [];  // 失败回调队列

        // 定义 resolve 函数
        const resolve = (value) => {
            // 只有 pending 状态可以转换
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value;
                // 执行所有成功回调
                this.onFulfilledCallbacks.forEach(fn => fn());
            }
        };

        // 定义 reject 函数
        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                // 执行所有失败回调
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };

        try {
            // 立即执行执行器函数
            executor(resolve, reject);
        } catch (error) {
            // 执行器抛出错误，直接 reject
            reject(error);
        }
    }

    // then 方法实现
    then(onFulfilled, onRejected) {
        // 参数可选，提供默认函数实现值穿透
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

        // 返回新的 Promise 实现链式调用
        const promise2 = new MyPromise((resolve, reject) => {
            // 封装处理函数
            const handleFulfilled = () => {
                // 使用微任务模拟
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        // 解析 Promise 链
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            };

            const handleRejected = () => {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            };

            // 根据当前状态执行不同逻辑
            if (this.state === FULFILLED) {
                handleFulfilled();
            } else if (this.state === REJECTED) {
                handleRejected();
            } else if (this.state === PENDING) {
                // 异步情况，将回调存入队列
                this.onFulfilledCallbacks.push(handleFulfilled);
                this.onRejectedCallbacks.push(handleRejected);
            }
        });

        return promise2;
    }

    // Promise 解析过程（核心中的核心）
    resolvePromise(promise2, x, resolve, reject) {
        // 防止循环引用
        if (promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise'));
        }

        // 防止多次调用
        let called = false;

        // 如果 x 是 Promise 实例
        if (x instanceof MyPromise) {
            // 继承 x 的状态
            x.then(
                y => {
                    if (called) return;
                    called = true;
                    // 递归解析，直到不是 Promise
                    this.resolvePromise(promise2, y, resolve, reject);
                },
                reason => {
                    if (called) return;
                    called = true;
                    reject(reason);
                }
            );
        }
        // 如果 x 是对象或函数（可能是 thenable）
        else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            try {
                // 获取 then 方法
                const then = x.then;

                // 如果 then 是函数，认为是 thenable
                if (typeof then === 'function') {
                    then.call(
                        x,
                        y => {
                            if (called) return;
                            called = true;
                            this.resolvePromise(promise2, y, resolve, reject);
                        },
                        r => {
                            if (called) return;
                            called = true;
                            reject(r);
                        }
                    );
                } else {
                    // 普通对象，直接 resolve
                    resolve(x);
                }
            } catch (error) {
                if (called) return;
                called = true;
                reject(error);
            }
        } else {
            // 普通值，直接 resolve
            resolve(x);
        }
    }

    // catch 方法
    catch(onRejected) {
        return this.then(null, onRejected);
    }

    // finally 方法
    finally(callback) {
        return this.then(
            value => MyPromise.resolve(callback()).then(() => value),
            reason => MyPromise.resolve(callback()).then(() => { throw reason; })
        );
    }

    // 静态方法：resolve
    static resolve(value) {
        // 如果已经是 Promise 实例，直接返回
        if (value instanceof MyPromise) {
            return value;
        }
        // 如果是 thenable 对象
        if (value && typeof value.then === 'function') {
            return new MyPromise(value.then);
        }
        // 普通值
        return new MyPromise(resolve => resolve(value));
    }

    // 静态方法：reject
    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason));
    }

    // 静态方法：all
    static all(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Arguments must be an array'));
            }

            const results = [];
            let completedCount = 0;

            if (promises.length === 0) {
                return resolve(results);
            }

            promises.forEach((promise, index) => {
                MyPromise.resolve(promise).then(
                    value => {
                        results[index] = value;
                        completedCount++;

                        if (completedCount === promises.length) {
                            resolve(results);
                        }
                    },
                    reject // 任何一个 reject，整体就 reject
                );
            });
        });
    }

    // 静态方法：race
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Arguments must be an array'));
            }

            promises.forEach(promise => {
                MyPromise.resolve(promise).then(resolve, reject);
            });
        });
    }
}



function myPromiseAll(arr){
    return new Promise((resolve, reject) => {
        const promises = Array.from(arr);

        if(promises.length === 0){
            resolve([]);
            return;
        }

        const results = new Array(promises.length);
        let completedCount = 0;

        promises.forEach((promise,index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;

                    completedCount ++;

                    if(completedCount === promises.length){
                        resolve(results);
                    }
                })
                .catch(error => {
                    reject(error);
                })
        })

    })
}



//手写创建对象函数
const myCreate = function (target){
    const fn = function (){};
    fn.prototype = target;
    return new fn();
}


//手写instanceof函数
const myInstanceOf = function (leftObj,rightConstructor){
    let proto  = Object.getPrototypeOf(leftObj);
    let prototype = rightConstructor.prototype;

    while (true){
        if(!proto) return false;
        if(proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}

//手写new操作符
const myNew = function (construct,args){
    const obj = Object.create(construct.prototype);
    const result = construct.apply(obj,args);
    if((result !== null && typeof result === "object") || typeof result === "function"){
        return result
    }else {
        return obj
    }
}


const debounce = function (fn,wait,immediate=false){
    let timeId ;
    return function (...args){
        const context = this;
        if(timeId) {clearTimeout(timeId)}
        if(immediate){
            const callNow = !timeId;
            setTimeout(() => {
                timeId = null;
            },wait)
            if(callNow){
                fn.apply(context,args);
            }
        }else {
            timeId = setTimeout(() => {
                fn.apply(context,args)
            },wait)
        }

    }
}

const throttle = function (fn,args,wait){
    let prev = Date.now();
    return function (){
        const now = Date.now();
        const context = this;
        if (now - prev > wait){
            fn.apply(context,args)
            prev = now;
        }
    }
}

//线性搜索
const linearSearch = function (arr,target){
    for (let i = 0;i<arr.length;i++){
        if(arr[i] === target){
            return i
        }
    }
    return -1
}

//二分查找
const biSearch = function (arr,target){
    const n = arr.length;
    for(let i = 1;i < n;i++){
        if(arr[i] < arr[i-1]){
            return "非有序数组";
        }
    }
    let left,right;
    left= 0;
    right = n-1;
    while(left <= right){
        let mid = left + Math.floor((right - left)/2);
        if(arr[mid] === target){
            return mid
        }
        else if(arr[mid] > target){
            right = mid-1
        }else if(arr[mid] < target){
            left = mid + 1
        }
    }
}


//冒泡排序
const bubbleRange = function (list){
    if(!Array.isArray(list)){
        return "非数组"
    }
    const n = list.length;
    for(let i = 0;i<n-1;i++){
        for(let j = 0;j<n-i;j++){
            if(list[j] > list[j+1]){
                let temp  = list[j];
                list[j] = list[j+1];
                list[j+1] = temp;
            }
        }
    }
    return list;
}


const quickSort = function (nums){
    let n = nums.length;
    if(n === 0 || n === 1){
        return nums
    }

    let pivot = Math.floor(n/2);
    let left = [];
    let equal = [];
    let right = [];

    for(let i = 0;i<n;i++){
        if(nums[i] < nums[pivot]){
            left.push(nums[i])
        }else if(nums[i] > nums[pivot]){
            right.push(nums[i])
        }else {
            equal.push(nums[i])
        }
    }

    return [...quickSort(left),...equal,...quickSort(right)];

}




const generateId = function (){
    return Date.now();
}

export {debounce,bubbleRange,generateId,quickSort};

