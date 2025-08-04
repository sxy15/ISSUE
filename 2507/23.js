// 明文加密
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let data = '';
let book = [];
let lineCount = 0;

rl.on('line', (line) => {
    if (lineCount === 0) {
        data = line.trim();
        lineCount++;
    } else {
        const row = line.trim().split(/\s+/).map(Number);
        book.push(row);
    }
});

rl.on('close', () => {
    const result = encrypt(book, data);
    console.log(result);
});

function encrypt(book, dataStr) {
    const data = dataStr.split('').map(Number);
    if (data.length === 0) return '';

    // 找出所有起始位置
    const starts = [];
    for (let i = 0; i < book.length; i++) {
        for (let j = 0; j < book[i].length; j++) {
            if (book[i][j] === data[0]) {
                starts.push([i, j]);
            }
        }
    }

    if (starts.length === 0) return 'error';

    const results = [];

    function dfs(i, j, visited, path, index) {
        if (index === data.length - 1) {
            const cipher = path.flat().join(' ');
            results.push(cipher);
            return;
        }

        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [di, dj] of directions) {
            const ni = i + di;
            const nj = j + dj;
            if (ni >= 0 && ni < book.length && nj >= 0 && nj < book[ni].length) {
                const key = `${ni},${nj}`;
                if (!visited.has(key) && book[ni][nj] === data[index + 1]) {
                    visited.add(key);
                    path.push([ni, nj]);
                    dfs(ni, nj, visited, path, index + 1);
                    path.pop();
                    visited.delete(key);
                }
            }
        }
    }

    for (const [i, j] of starts) {
        const visited = new Set();
        visited.add(`${i},${j}`);
        dfs(i, j, visited, [[i, j]], 0);
    }

    if (results.length === 0) return 'error';
    results.sort();
    return results[0];
}