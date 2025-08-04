// AI处理器组合
function findProcessorCombination(array, num) {
    // 划分两个链路
    const linkA = array.filter(id => id >= 0 && id <= 3);
    const linkB = array.filter(id => id >= 4 && id <= 7);
    const links = [
        { id: 'A', processors: linkA, count: linkA.length },
        { id: 'B', processors: linkB, count: linkB.length }
    ];

    // 根据申请数量选择最佳链路
    let bestLink = null;
    switch (num) {
        case 1:
            // 优先级: 1 > 3 > 2 > 4
            const priority1 = [1, 3, 2, 4];
            bestLink = selectBestLink(links, priority1);
            break;
        case 2:
            // 优先级: 2 > 4 > 3
            const priority2 = [2, 4, 3];
            bestLink = selectBestLink(links, priority2);
            break;
        case 4:
            // 必须剩余4个
            bestLink = links.find(link => link.count === 4);
            break;
        case 8:
            // 需要所有8个处理器
            if (linkA.length === 4 && linkB.length === 4) {
                return [array];
            }
            return [];
        default:
            return [];
    }

    // 生成组合
    if (!bestLink || bestLink.count < num) return [];
    return generateCombinations(bestLink.processors, num);
}

// 辅助函数: 选择最佳链路
function selectBestLink(links, priority) {
    let bestPriority = Infinity;
    let bestLink = null;
    for (const link of links) {
        const pIndex = priority.indexOf(link.count);
        if (pIndex !== -1 && pIndex < bestPriority) {
            bestPriority = pIndex;
            bestLink = link;
        }
    }
    return bestLink;
}

// 辅助函数: 生成组合
function generateCombinations(arr, k) {
    const result = [];
    if (k === 0) return [[]];
    if (k > arr.length) return [];
    if (k === arr.length) return [arr];
    if (k === 1) return arr.map(item => [item]);

    // 生成所有组合的核心算法
    const backtrack = (start, current) => {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            current.push(arr[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    };

    backtrack(0, []);
    return result;
}

// 测试用例
console.log(findProcessorCombination([0, 1, 2, 3, 4, 5, 6, 7], 2)); // [[0], [1]]

// [鱼,肉,菜]
// backtrack(0, [])
// ├─ i=0（选鱼） → current = [鱼]
// │  ├─ backtrack(1, [鱼])
// │  │  ├─ i=1（选肉） → current = [鱼,肉]
// │  │  │  ├─ backtrack(2, [鱼,肉]) → 长度=2，加入结果
// │  │  │  └─ **pop() → current = [鱼]**（移除肉，恢复到上一层状态）
// │  │  ├─ i=2（选菜） → current = [鱼,菜]
// │  │  │  ├─ backtrack(2, [鱼,菜]) → 长度=2，加入结果
// │  │  │  └─ **pop() → current = [鱼]**（移除菜，恢复到上一层状态）
// │  │  └─ **pop() → current = []**（移除鱼，恢复到初始状态）
// │
// ├─ i=1（选肉） → current = [肉]
// │  ├─ backtrack(2, [肉])
// │  │  ├─ i=2（选菜） → current = [肉,菜]
// │  │  │  ├─ backtrack(3, [肉,菜]) → 长度=2，加入结果
// │  │  │  └─ **pop() → current = [肉]**（移除菜，恢复到上一层状态）
// │  │  └─ **pop() → current = []**（移除肉，恢复到初始状态）
// │
// └─ i=2（选菜） → current = [菜]
//    └─ backtrack(3, [菜]) → 长度=1 < 2，无结果
//       └─ **pop() → current = []**（移除菜，恢复到初始状态）