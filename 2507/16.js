
// 给定一个字符串的摘要算法，请输出给定字符串的摘要值

// 去除字符串中非字母的符号。
// 如果出现连续字符(不区分大小写) ，则输出：该字符(小写) + 连续出现的次数。
// 如果是非连续的字符(不区分大小写)，则输出：该字符(小写) + 该字母之后字符串中出现的该字符的次数
// 对按照以上方式表示后的字符串进行排序：字母和紧随的数字作为一组进行排序，数字大的在前，数字相同的，则按字母进行排序，字母小的在前。
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * 预处理：去除非字母字符并转为小写
 */
function preprocess(str) {
    return str.replace(/[^a-zA-Z]/g, '').toLowerCase();
}

/**
 * 处理字符串生成摘要组
 */
function processString(input) {
    const s = preprocess(input);
    if (s.length === 0) return '';

    const processed = [];
    let i = -1;
    const n = s.length;

    while (++i < n) {
        const current = s[i];
        let count = 1;
        let j = i + 1;

        // 检查连续字符
        while (j < n && s[j] === current) {
            count++;
            j++;
        }

        if (count > 1) {
            // 连续字符：当前字符+连续次数
            processed.push(current + count);
            i = j - 1; // 跳过已处理的连续字符
        } else {
            // 非连续字符：当前字符+后续出现次数
            const remaining = s.slice(i + 1);
            const charCount = (remaining.match(new RegExp(current, 'g')) || []).length;
            processed.push(current + charCount);
        }
    }

    // 排序：数字降序，相同数字则字母升序
    return processed.sort((a, b) => {
        const numA = parseInt(a.slice(1), 10);
        const numB = parseInt(b.slice(1), 10);
        return numB !== numA ? numB - numA : a[0].localeCompare(b[0]);
    }).join('');
}

rl.on('line', (input) => {
    console.log(processString(input));
    rl.close();
});