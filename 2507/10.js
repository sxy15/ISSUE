/**
 * 查找接口成功率最优时间段
 */
const readline = require('readline');

// 创建readline接口实例
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
rl.on('line', (line) => {
    inputLines.push(line);
    if (inputLines.length === 2) {
        const minAverageLost = parseInt(inputLines[0]);
        const arr = inputLines[1].split(' ').map(Number);
        const result = findLongestSubarray(arr, minAverageLost);
        console.log(result);
        rl.close();
    }
});

function findLongestSubarray(arr, minAvg) {
    const n = arr.length;
    let maxLen = 0;
    const candidates = [];

    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = i; j < n; j++) {
            sum += arr[j];
            const len = j - i + 1;
            const avg = sum / len;
            if (avg <= minAvg) {
                if (len > maxLen) {
                    maxLen = len;
                    candidates.length = 0;
                    candidates.push([i, j]);
                } else if (len === maxLen) {
                    candidates.push([i, j]);
                }
            }
        }
    }

    if (maxLen === 0) return 'NULL';

    return candidates
        .sort((a, b) => a[0] - b[0])
        .map(pair => `${pair[0]}-${pair[1]}`)
        .join(' ');
}