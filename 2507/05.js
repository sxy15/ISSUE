/**
 * 货币转换，汇总求和
 * 1CNY=100fen（1元=100分）
 * 1HKD=100cents（1港元=100港分）
 * 1JPY=100sen（1日元=100仙）
 * 1EUR=100eurocents（1欧元=100欧分）
 * 1GBP=100pence（1英镑=100便士）
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 根据货币单位返回其转换为人民币分的汇率
function exChange(unit) {
    switch (unit) {
        case 'CNY':
            return 100.0; // 人民币
        case 'JPY':
            return 100.0 / 1825 * 100; // 日元
        case 'HKD':
            return 100.0 / 123 * 100; // 港元
        case 'EUR':
            return 100.0 / 14 * 100; // 欧元
        case 'GBP':
            return 100.0 / 12 * 100; // 英镑
        case 'fen':
            return 1.0; // 人民币分
        case 'cents':
            return 100.0 / 123; // 港元分
        case 'sen':
            return 100.0 / 1825; // 日元分
        case 'eurocents':
            return 100.0 / 14; // 欧元分
        case 'pence':
            return 100.0 / 12; // 英镑分
        default:
            return 0.0; // 无效单位返回0
    }
}

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const n = parseInt(input[0]); // 读取记录数
    let totalFen = 0; // 汇总结果

    // 处理每一条货币记录
    for (let i = 1; i <= n; i++) {
        const record = input[i];
        let amount = 0; // 用于保存金额
        let unit = ''; // 保存单位

        // 遍历当前行，逐个提取金额和单位
        for (let j = 0; j < record.length; j++) {
            const c = record[j];
            if (/\d/.test(c)) {
                amount = amount * 10 + parseInt(c); // 构建数字
            } else {
                unit += c; // 构建货币单位
            }

            // 当遇到完整的金额+单位时进行换算
            if (j === record.length - 1 || (/\d/.test(record[j + 1]) && unit.length > 0)) {
                totalFen += amount * exChange(unit); // 计算并累加到总数
                amount = 0; // 重置金额
                unit = ''; // 清空单位
            }
        }
    }

    // 输出汇总结果，只保留整数部分
    console.log(Math.floor(totalFen));
})