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
console.log(findProcessorCombination([0, 1, 4, 5, 6, 7], 1)); // [[0], [1]]