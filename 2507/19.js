const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
rl.on('line', (line) => {
    inputLines.push(line);
    if (inputLines.length === 2) {
        rl.close();
    }
}).on('close', () => {
    const K = parseInt(inputLines[0]);
    const S = inputLines[1];
    console.log(processCommand(K, S));
});

function processCommand(K, S) {
    let command = '';
    const commandList = [];
    let inQuotes = false;

    for (let i = 0; i < S.length; i++) {
        const char = S[i];

        // 处理双引号逻辑
        if (char === '"') {
            if (inQuotes) {
                // 闭合引号，添加完整命令字
                command += char;
                commandList.push(command);
                command = '';
                inQuotes = false;
                // 跳过下一个下划线（如果存在）
                if (i + 1 < S.length && S[i + 1] === '_') {
                    i++;
                }
            } else {
                // 打开引号
                if (command) {
                    // 引号前已有内容，先添加当前命令字
                    commandList.push(command);
                    command = '';
                }
                command += char;
                inQuotes = true;
            }
            continue;
        }

        // 引号内字符直接添加
        if (inQuotes) {
            command += char;
            continue;
        }

        // 处理下划线分隔符
        if (char === '_') {
            if (command) {
                // 当前命令字结束
                commandList.push(command);
                command = '';
            }
            // 跳过连续下划线
            while (i + 1 < S.length && S[i + 1] === '_') {
                i++;
            }
            continue;
        }

        // 普通字符添加到当前命令字
        command += char;
    }

    // 处理最后一个命令字
    if (command || inQuotes) {
        commandList.push(command);
    }

    // 检查索引是否有效
    if (K < 0 || K >= commandList.length) {
        return 'ERROR';
    }

    // 替换目标命令字并清理下划线
    commandList[K] = '******';

    // 过滤空命令字（保留显式空字符串）
    const filtered = commandList.filter(cmd => cmd !== undefined);
    console.log(filtered)

    // 用单下划线连接命令字
    return filtered.join('_');
}