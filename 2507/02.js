/**
 * 输入：
 * 3
 * 12abc-abCABc-4aB@
 * 输出：
 * 12abc-abc-ABC-4aB-@
 */
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
    lines.push(line);

    if (lines.length === 2) {
        const k = lines[0]
        const str = lines[1]
        const arr = str.split("-")
        const prefix = arr.shift()
        const postfix = arr.join("").match(new RegExp(`.{1,${k}}`, "g")).map(item => {
            let upperCase = 0;
            let lowerCase = 0;
            [...item].forEach((char) => {
                if (/[a-z]/.test(char)) lowerCase++;
                if (/[A-Z]/.test(char)) upperCase++;
            });
            if (upperCase > lowerCase) {
                return item.toUpperCase();
            }
            if (lowerCase > upperCase) {
                return item.toLowerCase();
            }
            return item;
        }).join('-')

        console.log(`${prefix}-${postfix}`);
    }

});