/**
 * 最短路程的数值
 *  3
    0 2 1
    1 0 2
    2 1 0 -> 3

    4
    0 2 1 3
    1 0 2 5
    2 1 0 4
    3 2 6 0 -> 8
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let inputLines = [];
rl.on('line', (line) => {
    inputLines.push(line.trim());
}).on('close', () => {
    const n = parseInt(inputLines[0]);
    const distances = inputLines.slice(1, n + 1).map(line =>
        line.split(' ').map(Number)
    );
    console.log(minPath(distances, n));
});

function minPath(distances, n) {
    /**
     * 计算从点 0 出发，遍历所有点的最小路径总距离。
     * @param {number[][]} distances - 距离矩阵
     * @param {number} n - 点的数量
     * @return {number} 最小路径总距离
     */
    const paths = [];
    findPaths(n, new Array(n).fill(false), [], paths);

    let minimum = Infinity;

    for (const path of paths) {
        let totalDistance = distances[0][path[0]];

        for (let i = 0; i < path.length - 1; i++) {
            totalDistance += distances[path[i]][path[i + 1]];
        }

        totalDistance += distances[path[path.length - 1]][0];
        minimum = Math.min(minimum, totalDistance);
    }

    return minimum;
}

function findPaths(n, visited, currentPath, paths) {
    /**
     * 使用递归生成从点 1 到点 n-1 的所有路径。
     * @param {number} n - 点的数量
     * @param {boolean[]} visited - 标记每个点是否已访问
     * @param {number[]} currentPath - 当前正在生成的路径
     * @param {number[][]} paths - 存储所有生成的路径
     */
    if (currentPath.length === n - 1) {
        paths.push([...currentPath]);
        return;
    }

    for (let i = 1; i < n; i++) {
        if (!visited[i]) {
            currentPath.push(i);
            visited[i] = true;
            findPaths(n, visited, currentPath, paths);
            visited[i] = false;
            currentPath.pop();
        }
    }
}

// const c = []
// findPaths(3, new Array(3).fill(false), [], c)
// console.log(c); // [ [ 1, 2 ], [ 2, 1 ] ]
// []
// [ 1 ]
// [ 1, 2 ]
// [ 2 ]
// [ 2, 1 ]