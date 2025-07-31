/**
 * 有一个特异性的双端队列，该队列可以从头部或尾部添加数据，但是只能从头部移出数据。2n次操作，n次添加，n次移除
 */

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let number = 0;
let operations = [];

rl.on('line', (line) => {
    if (number === 0) {
        number = parseInt(line);
    } else {
        operations.push(line.split(" "));
        if (operations.length === number * 2) {
            rl.close();
        }
    }
});

const queue = []; // 模拟双端队列
let in_order = true; // 是否按顺序删除
let result = 0; // 最小的调整顺序次数

rl.on('close', () => {
    for (let i = 0; i < 2 * number; i++) {
        const operation = operations[i];
        if (operation[0] === "head") { // 从头部添加元素 (破坏顺序)
            if (queue.length !== 0 && in_order) { // 不按顺序删除
                in_order = false; // 头部添加会破坏原有顺序，需要后续调整
            }
            queue.unshift(parseInt(operation[2]));
        } else if (operation[0] === "tail") { // 从尾部添加元素
            queue.push(parseInt(operation[2]));
        } else { // 删除元素
            if (queue.length === 0) {
                continue;
            }
            if (!in_order) { // 不按顺序删除
                result += 1;
                in_order = true;
            }
            queue.shift();
        }
    }
    console.log(result); // 输出最小的调整顺序次数
});