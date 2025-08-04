// AI面板识别
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let n;
let lights = [];
let lineCount = 0;

rl.on('line', (line) => {
    if (lineCount === 0) {
        n = parseInt(line);
        lineCount++;
    } else {
        const parts = line.trim().split(/\s+/).map(Number);
        const [id, x1, y1, x2, y2] = parts;
        lights.push({ id, x1, y1, x2, y2 });
        lineCount++;
        if (lineCount > n) {
            rl.close();
            main();
        }
    }
});

function main() {
    const result = [];
    let unprocessed = [...lights];

    while (unprocessed.length > 0) {
        // 选择基准灯：y1最小，y1相同则x1最小，x1相同则id最小
        const baseLight = unprocessed.reduce((min, light) => {
            if (light.y1 < min.y1) return light;
            if (light.y1 === min.y1) {
                if (light.x1 < min.x1) return light;
                if (light.x1 === min.x1 && light.id < min.id) return light;
            }
            return min;
        }, unprocessed[0]);

        // 计算基准灯半径和阈值
        const radius = (baseLight.y2 - baseLight.y1) / 2;
        const threshold = baseLight.y1 + radius;

        // 找出当前行所有灯（y1 <= 阈值）
        const currentRow = unprocessed.filter(light => light.y1 <= threshold);

        // 从待处理列表中移除当前行灯
        unprocessed = unprocessed.filter(light => !currentRow.includes(light));

        // 按x1从小到大排序，x1相同则按id排序
        currentRow.sort((a, b) => {
            if (a.x1 !== b.x1) return a.x1 - b.x1;
            return a.id - b.id;
        });

        // 添加到结果
        result.push(...currentRow.map(light => light.id));
    }

    // 输出排序结果
    console.log(result.join(' '));
}