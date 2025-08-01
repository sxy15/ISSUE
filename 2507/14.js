// 题目描述
// 现在有n个容器服务，服务的启动可能有一定的依赖性（有些服务启动没有依赖），其次服务自身启动加载会消耗一些时间。

// 给你一个 n x n 的二维矩阵useTime，其中

// useTime[i][i]=10 表示服务i自身启动加载需要消耗10s
// useTime[i][j] = 1 表示服务i启动依赖服务j启动完成
// useTime[i][k]=0  表示服务i启动不依赖服务k
// 其实 0<= i，j，k < n。

// 服务之间启动没有循环依赖（不会出现环），若想对任意一个服务i进行集成测试（服务i自身也需要加载），求最少需要等待多少时间。

// 输入描述
// 第一行输入服务总量 n，
// 之后的 n 行表示服务启动的依赖关系以及自身启动加载耗时
// 最后输入 k 表示计算需要等待多少时间后可以对服务 k 进行集成测试

// 其中 1 <= k <=n，1<=n<=100

// 输出描述
// 最少需要等待多少时间(s)后可以对服务 k 进行集成测试

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const lines = [];
let n;
let cache;
rl.on("line", (line) => {
    lines.push(line);

    if (lines.length === 1) {
        n = lines[0] - 0;
    }

    if (n && lines.length === n + 2) {
        lines.shift();
        const k = lines.pop();
        const matrix = lines.map((line) => line.split(" ").map(Number));
        cache = new Array(n);
        console.log(getResult(matrix, k));
        lines.length = 0;
    }
});

function getResult(matrix, k) {
    return dfs(k - 1, matrix);
}

function dfs(k, matrix) {
    // cache用于记录每个服务所需要时间，避免多个子服务依赖同一个父服务时，对父服务启动时间的重复递归求解
    if (cache[k] != undefined) return cache[k];

    const preK = matrix[k];

    let maxPreTime = 0;
    for (let i = 0; i < preK.length; i++) {
        if (i != k && preK[i] != 0) {
            maxPreTime = Math.max(maxPreTime, dfs(i, matrix));
        }
    }

    cache[k] = matrix[k][k] + maxPreTime;

    return cache[k];
}