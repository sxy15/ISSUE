// 某公司为了更高效的编写代码，邀请你开发一款代码编辑器程序。

// 程序的输入为 已有的代码文本和指令序列，程序需输出编辑后的最终文本。指针初始位置位于文本的开头。
// 支持的指令(X为大于等于0的整数, word 为无空格的字符串)：

// FORWARD X 指针向前(右)移动X,如果指针移动位置超过了文本末尾，则将指针移动到文本末尾
// BACKWARD X 指针向后(左)移动X,如果指针移动位置超过了文本开头，则将指针移动到文本开头
// SEARCH-FORWARD word 从指针当前位置向前查找 word 并将指针移动到word的起始位置，如果未找到则保持不变
// SEARCH-BACKWARD word 在文本中向后查我 word 并将指针移动到word的起始位置，如果未找到则保持不变
// INSERT word 在指针当前位置前插入word，并将指针移动到word的结尾
// REPLACE word 在指针当前位置替换并插入字符(删除原有字符，并增加新的字符)
// DELETE X 在指针位置删除X个字符
// 输入描述
// 输入的第一行为命令列表的长度K

// 输入的第二行为文件中的原始文本

// 接下来的K行，每行为一个指令

// 输出描述
// 编辑后的最终结果

// 备注
// 文本最长长度不超过 256K

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
    const K = parseInt(inputLines[0], 10);
    const originalText = inputLines[1] || '';
    const commands = inputLines.slice(2, 2 + K);

    let text = originalText.split('');
    let pointer = 0;

    for (const cmdLine of commands) {
        const parts = cmdLine.split(/\s+/);
        if (parts.length === 0) continue;

        const cmd = parts[0];
        const param = parts.slice(1).join(' ');

        switch (cmd) {
            case 'FORWARD': {
                const x = parseInt(param, 10) || 0;
                pointer = Math.min(pointer + x, text.length);
                break;
            }
            case 'BACKWARD': {
                const x = parseInt(param, 10) || 0;
                pointer = Math.max(pointer - x, 0);
                break;
            }
            case 'SEARCH-FORWARD': {
                const word = param;
                const str = text.join('');
                const index = str.indexOf(word, pointer);
                if (index !== -1) {
                    pointer = index;
                }
                break;
            }
            case 'SEARCH-BACKWARD': {
                const word = param;
                const str = text.join('');
                const substr = str.substring(0, pointer);
                const index = substr.lastIndexOf(word);
                if (index !== -1) {
                    pointer = index;
                }
                break;
            }
            case 'INSERT': {
                const word = param;
                const chars = word.split('');
                text.splice(pointer, 0, ...chars);
                pointer += chars.length;
                break;
            }
            case 'REPLACE': {
                const word = param;
                // 删除当前位置字符
                if (pointer < text.length) {
                    text.splice(pointer, 1);
                }
                // 插入新字符
                const chars = word.split('');
                text.splice(pointer, 0, ...chars);
                pointer += chars.length;
                break;
            }
            case 'DELETE': {
                const x = parseInt(param, 10) || 0;
                if (x > 0) {
                    const deleteCount = Math.min(x, text.length - pointer);
                    text.splice(pointer, deleteCount);
                }
                break;
            }
            default:
                // 忽略未知命令
                break;
        }
    }

    console.log(text.join(''));
});
