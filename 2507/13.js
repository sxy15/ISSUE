const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    const arr = line.split(" ");
    console.log(getResult(arr));
});

function getResult(arr) {
    if (arr.length === 1) return arr[0];

    const res = [];
    dfs(arr, 0, res);

    return res.join(" ");
}

function dfs(arr, root, res) {
    let left = 2 * root + 1;
    let right = 2 * root + 2;

    if (arr[left]) {
        dfs(arr, left, res);
        if (arr[right]) dfs(arr, right, res);
        res.push(arr[root]);
    }
}