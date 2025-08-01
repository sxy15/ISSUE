// 题目描述
// 在星球争霸篮球赛对抗赛中，最大的宇宙战队希望每个人都能拿到MVP，MVP的条件是单场最高分得分获得者。
// 可以并列所以宇宙战队决定在比赛中尽可能让更多队员上场，并且让所有得分的选手得分都相同，
// 然而比赛过程中的每1分钟的得分都只能由某一个人包揽。

 

// 输入描述
// 输入第一行为一个数字 t ，表示为有得分的分钟数 1 ≤ t ≤ 50
// 第二行为 t 个数字，代表每一分钟的得分 p， 1 ≤ p ≤ 50

 

// 输出描述
// 输出有得分的队员都是MVP时，最少得MVP得分。

 

// 用例
// 输入	9 5 2 1 5 2 1 5 2 1
// 输出	6
// 说明	样例解释 一共 4 人得分，分别都是 6 分 5 + 1 ， 5 + 1 ， 5 + 1 ， 2 + 2 + 2

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function findMinMvpScore() {
    rl.on('line', (input) => {
        const lines = input.trim().split('\n');
        const t = parseInt(lines[0]);
        const p = lines[1].split(' ').map(Number);
        const sum = p.reduce((acc, val) => acc + val, 0);
        const maxP = Math.max(...p);

        // 获取sum的所有约数，且大于等于maxP，升序排列
        const divisors = [];
        for (let i = 1; i <= Math.sqrt(sum); i++) {
            if (sum % i === 0) {
                if (i >= maxP) divisors.push(i);
                const counterpart = sum / i;
                if (counterpart !== i && counterpart >= maxP) divisors.push(counterpart);
            }
        }
        divisors.sort((a, b) => a - b);

        // 对每个候选值检查是否可以分割数组
        for (const target of divisors) {
            const buckets = new Array(sum / target).fill(0);
            p.sort((a, b) => b - a); // 降序排列优化回溯
            if (canPartition(p, buckets, 0, target)) {
                console.log(target);
                rl.close();
                return;
            }
        }

        // 如果没有找到合适的约数，直接返回sum（只有一个人得分的情况）
        console.log(sum);
        rl.close();
    });
}

// 回溯检查是否可以将数组分割成和为target的子集
function canPartition(nums, buckets, index, target) {
    if (index === nums.length) return true;

    const num = nums[index];
    for (let i = 0; i < buckets.length; i++) {
        // 剪枝：如果当前桶和前一个桶相同，跳过（避免重复计算）
        if (i > 0 && buckets[i] === buckets[i - 1]) continue;
        if (buckets[i] + num <= target) {
            buckets[i] += num;
            if (canPartition(nums, buckets, index + 1, target)) return true;
            buckets[i] -= num;
            // 剪枝：如果当前桶为空，且放入num后不可行，则其他桶也不行
            if (buckets[i] === 0) break;
        }
    }
    return false;
}

findMinMvpScore();
