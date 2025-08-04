const fs = require('fs');

/**
 * 统计文本文件中符合规则的文本数量
 * @param {string} filePath - 文本文件路径
 * @returns {number} 有效文本数量
 */
function countTexts(filePath) {
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf-8');
    let count = 0;               // 有效文本计数器
    let buffer = '';             // 当前文本缓冲区
    let state = 'normal';        // 解析状态：normal, singleQuote, doubleQuote, comment
    let escaped = false;         // 转义标志
    let i = 0;
    const len = content.length;

    // 状态转换处理函数
    const handlers = {
        normal: handleNormal,
        singleQuote: handleString.bind(null, "'"),
        doubleQuote: handleString.bind(null, '"'),
        comment: handleComment
    };

    // 主解析循环
    while (i < len) {
        handlers[state](content[i]);
    }

    // 处理文件结束时的最后一个文本
    processBuffer();

    return count;

    /** 处理正常模式字符 */
    function handleNormal(c) {
        if (c === '-' && i + 1 < len && content[i+1] === '-') {
            // 进入注释模式
            state = 'comment';
            i += 2;
        } else if (c === "'") {
            // 进入单引号字符串模式
            state = 'singleQuote';
            buffer += c;
            i++;
        } else if (c === '"') {
            // 进入双引号字符串模式
            state = 'doubleQuote';
            buffer += c;
            i++;
        } else if (c === ';') {
            // 分号分隔，处理当前缓冲区
            processBuffer();
            buffer = '';
            i++;
        } else {
            // 普通字符添加到缓冲区
            buffer += c;
            i++;
        }
    }

    /** 处理字符串模式字符 */
    function handleString(quoteChar, c) {
        if (escaped) {
            // 转义状态，直接添加字符并取消转义标志
            buffer += c;
            escaped = false;
            i++;
        } else if (c === '\\') {
            // 遇到转义字符，设置转义标志
            buffer += c;
            escaped = true;
            i++;
        } else if (c === quoteChar) {
            // 遇到匹配的引号，退出字符串模式
            buffer += c;
            state = 'normal';
            i++;
        } else {
            // 普通字符串字符
            buffer += c;
            i++;
        }
    }

    /** 处理注释模式字符 */
    function handleComment(c) {
        if (c === '\n') {
            // 注释结束，回到正常模式
            state = 'normal';
        }
        i++;
    }

    /** 处理缓冲区内容，判断是否为有效文本 */
    function processBuffer() {
        if (buffer.trim().length > 0) {
            count++;
        }
    }
}

// 从命令行参数获取文件路径并执行统计
const filePath = process.argv[2];
if (!filePath) {
    console.error('请提供文本文件路径作为命令行参数');
    process.exit(1);
}

try {
    const result = countTexts(filePath);
    console.log(result);
} catch (err) {
    console.error('处理文件时出错:', err.message);
    process.exit(1);
}