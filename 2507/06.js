/**
 * 一个由字符 W、A、S 和 D 组成的字符串，要求找到一个最短的子串，移除该子串后，剩余字符串中这四种字符的数量均相等。
 * WASDAASD 输出 1
 * AAAA 输出 3
 */
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    function minLengthSubstring(s) {
        // 统计字符串中各字符的数量
        const totalCount = { W: 0, A: 0, S: 0, D: 0 };
        for (const char of s) {
            totalCount[char]++;
        }

        // 每种字符的目标数量
        const target = Math.floor(s.length / 4);

        // 计算每种字符的过剩数量
        const excessCount = {};
        for (const char of Object.keys(totalCount)) {
            excessCount[char] = Math.max(0, totalCount[char] - target);
        }

        // 如果没有过剩字符，返回0（不需要移除子串）
        if (Object.values(excessCount).reduce((a, b) => a + b, 0) === 0) {
            return 0;
        }

        // 初始化滑动窗口的指针和最短长度
        let start = 0;
        let minLen = s.length;

        // 遍历字符串，扩展滑动窗口的右边界
        for (let end = 0; end < s.length; end++) {
            // 将窗口右边界字符的过剩数量减1
            excessCount[s[end]]--;

            // 当窗口有效（所有字符的过剩数量均小于等于0）时，尝试收缩左边界
            while (Object.values(excessCount).every(count => count <= 0)) {
                // 更新最短长度
                minLen = Math.min(minLen, end - start + 1);
                // 收缩窗口左边界，恢复左边界字符的过剩数量
                excessCount[s[start]]++;
                start++;
            }
        }

        return minLen;
    }

    console.log(minLengthSubstring(line.trim()));
    rl.close();
});