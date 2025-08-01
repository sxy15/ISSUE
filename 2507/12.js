// 题目描述
// 提取字符串中的最长合法简单数学表达式，字符串长度最长的，并计算表达式的值。如果没有，则返回 0 。

// 简单数学表达式只能包含以下内容：

// 0-9数字，符号+-*
// 说明：

// 所有数字，计算结果都不超过long
// 如果有多个长度一样的，请返回第一个表达式的结果
// 数学表达式，必须是最长的，合法的
// 操作符不能连续出现，如 +--+1 是不合法的
// 输入描述
// 字符串

// 输出描述
// 表达式值

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    const str = input.trim();
    // 使用正则方法提取并计算
    const resultRegex = extractByRegex(str);
    // 使用双指针方法提取并计算
    const resultTwoPointers = extractByTwoPointers(str);
    // 两种方法结果应一致，输出其一
    console.log(resultRegex);
    rl.close();
});

/**
 * 正则表达式方法提取最长合法表达式
 */
function extractByRegex(str) {
    // 匹配规则：数字开头，后接(运算符+数字)的组合，确保运算符不连续
    const regex = /(\d+([+*-]\d+)*)/g;
    let maxLen = 0;
    let bestExpr = '';
    let match;

    while ((match = regex.exec(str)) !== null) {
        const expr = match[0];
        if (expr.length > maxLen) {
            maxLen = expr.length;
            bestExpr = expr;
        }
    }

    return bestExpr ? calculateExpr(bestExpr) : 0;
}

/**
 * 双指针方法提取最长合法表达式
 */
function extractByTwoPointers(str) {
    let maxLen = 0;
    let bestExpr = '';
    const n = str.length;
    let left = 0;

    while (left < n) {
        // 找到数字起始位置
        if (!/\d/.test(str[left])) {
            left++;
            continue;
        }

        let right = left;
        let hasOperator = false;
        let prevIsOperator = false;
        let currentExpr = '';

        while (right < n) {
            const char = str[right];

            // 检查是否为合法字符
            if (!/[\d+\-*]/.test(char)) break;

            // 检查运算符连续性
            if (/[+\-*]/.test(char)) {
                if (prevIsOperator) break;
                prevIsOperator = true;
                hasOperator = true;
            } else {
                prevIsOperator = false;
            }

            currentExpr += char;
            right++;
        }

        // 更新最长表达式
        if (currentExpr.length > maxLen) {
            maxLen = currentExpr.length;
            bestExpr = currentExpr;
        }

        left++;
    }

    return bestExpr ? calculateExpr(bestExpr) : 0;
}

/**
 * 计算表达式值（处理*优先于+-）
 */
function calculateExpr(expr) {
    // 分割数字和运算符
    const numbers = expr.split(/[+\-*]/).map(Number);
    const operators = expr.match(/[+\-*]/g) || [];

    // 先处理乘法
    let i = 0;
    while (i < operators.length) {
        if (operators[i] === '*') {
            numbers[i] = numbers[i] * numbers[i + 1];
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
        } else {
            i++;
        }
    }

    // 处理加减
    let result = numbers[0];
    for (i = 0; i < operators.length; i++) {
        result = operators[i] === '+' ? result + numbers[i + 1] : result - numbers[i + 1];
    }

    return result;
}
