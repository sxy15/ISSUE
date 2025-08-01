// A、B两个人把苹果分为两堆，A希望按照他的计算规则等分苹果，他的计算规则是按照二进制加法计算，并且不计算进位
// 12+5=9（1100 + 0101 = 9），B的计算规则是十进制加法，包括正常进位，B希望在满足A的情况下获取苹果重量最多。

// 输入苹果的数量和每个苹果重量，输出满足A的情况下B获取的苹果总重量。

// 如果无法满足A的要求，输出-1。

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
    lines.push(line);
    if (lines.length === 2) {
        const n = parseInt(lines[0]);
        const weights = lines[1].split(' ').map(Number);

        let totalXor = 0;
        let sum = 0;
        let minW = Infinity;

        for (const w of weights) {
            totalXor ^= w;
            sum += w;
            if (w < minW) {
                minW = w;
            }
        }

        if (totalXor !== 0) {
            console.log(-1);
        } else {
            console.log(sum - minW);
        }

        rl.close();
    }
});