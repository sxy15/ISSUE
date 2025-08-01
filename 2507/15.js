const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * 判断字符是否为元音
 */
function isVowel(c) {
  return ['a', 'e', 'i', 'o', 'u'].includes(c);
}

/**
 * 检查是否为相对开音节结构: 辅音+元音+辅音(非r)+e
 */
function isRelativeOpenSyllable(s) {
  if (s.length !== 4) return false;
  const [c0, c1, c2, c3] = s;
  // 第四个字符必须是e
  if (c3 !== 'e') return false;
  // 第二个字符必须是元音
  if (!isVowel(c1)) return false;
  // 第一个字符必须是辅音
  if (isVowel(c0)) return false;
  // 第三个字符必须是辅音且不是r
  if (isVowel(c2) || c2 === 'r') return false;
  return true;
}

rl.on('line', (input) => {
  // 分割单词并处理每个单词
  const processedWords = input.split(' ').map(word => {
    // 仅反转纯字母单词
    if (/^[a-z]+$/.test(word)) {
      return word.split('').reverse().join('');
    }
    return word;
  });

  let count = 0;
  // 检查每个单词中的所有可能4字符子串
  processedWords.forEach(word => {
    for (let i = 0; i <= word.length - 4; i++) {
      const substr = word.slice(i, i + 4);
      if (isRelativeOpenSyllable(substr)) {
        count++;
      }
    }
  });

  console.log(count);
  rl.close();
});