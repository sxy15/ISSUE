// 题目描述
// 在一款虚拟游戏中生活，你必须进行投资以增强在虚拟游戏中的资产以免被淘汰出局。

// 现有一家Bank，它提供有若干理财产品 m 个，风险及投资回报不同，你有 N（元）进行投资，能接收的总风险值为X。

// 你要在可接受范围内选择最优的投资方式获得最大回报。

// 备注：

// 在虚拟游戏中，每项投资风险值相加为总风险值；
// 在虚拟游戏中，最多只能投资2个理财产品；
// 在虚拟游戏中，最小单位为整数，不能拆分为小数；
// 投资额*回报率=投资回报
// 输入描述
// 第一行：

// 产品数（取值范围[1,20]）

// 总投资额（整数，取值范围[1, 10000]）

// 可接受的总风险（整数，取值范围[1,200]）

// 第二行：产品投资回报率序列，输入为整数，取值范围[1,60]

// 第三行：产品风险值序列，输入为整数，取值范围[1, 100]

// 第四行：最大投资额度序列，输入为整数，取值范围[1, 10000]

// 输出描述
// 每个产品的投资额序列

// 示例1
// 输入

// 5 100 10
// 10 20 30 40 50
// 3 4 5 6 10
// 20 30 20 40 30
// 1
// 2
// 3
// 4
// 输出

// 0 30 0 40 0

const readline = require('readline');

// 创建readline接口实例
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 用于存储输入行的数组
const lines = [];

// 读取输入行的事件监听
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    // 读取一行输入并将其转换为整数数组的函数
    const readIntArray = (line) => line.split(' ').map(Number);
    // 读取投资项目数量m、总投资额N和风险容忍度X
    const [m, N, X] = readIntArray(lines[0]);
    // 读取每个项目的预期回报率
    const returns = readIntArray(lines[1]);
    // 读取每个项目的风险值
    const risks = readIntArray(lines[2]);
    // 读取每个项目的最大投资额
    const maxInvestments = readIntArray(lines[3]);

    // 初始化最大回报为0
    let maxReturn = 0;
    // 初始化最大回报对应的投资方案数组
    let bestInvestments = new Array(m).fill(0);

    // 遍历所有项目
    for (let i = 0; i < m; i++) {
        // 检查项目i的风险是否在容忍度X以内
        if (risks[i] <= X) {
            // 计算项目i的投资额，不超过总投资额N和项目i的最大投资额
            const investmentForI = Math.min(N, maxInvestments[i]);
            // 计算当前项目的回报
            const currentReturn = investmentForI * returns[i];
            // 如果当前回报大于已知的最大回报
            if (currentReturn > maxReturn) {
                // 更新最大回报
                maxReturn = currentReturn;
                // 重置最佳投资方案数组，并为项目i分配投资额
                bestInvestments = new Array(m).fill(0);
                bestInvestments[i] = investmentForI;
            }
        }

        // 遍历项目i之后的项目，寻找两个项目的组合投资方案
        for (let j = i + 1; j < m; j++) {
            // 如果两个项目的风险总和在容忍度范围内
            if (risks[i] + risks[j] <= X) {
                let investmentForI, investmentForJ;
                // 根据预期回报率决定投资额分配
                if (returns[i] > returns[j]) {
                    // 如果项目i的回报率高于项目j，优先投资项目i
                    investmentForI = Math.min(N, maxInvestments[i]);
                    // 计算项目j的剩余可投资额
                    investmentForJ = Math.min(N - investmentForI, maxInvestments[j]);
                } else {
                    // 如果项目j的回报率高于项目i，优先投资项目j
                    investmentForJ = Math.min(N, maxInvestments[j]);
                    // 计算项目i的剩余可投资额
                    investmentForI = Math.min(N - investmentForJ, maxInvestments[i]);
                }
                // 计算两个项目组合的当前回报
                const currentReturn = investmentForI * returns[i] + investmentForJ * returns[j];
                // 如果当前回报大于已知的最大回报
                if (currentReturn > maxReturn) {
                    // 更新最大回报
                    maxReturn = currentReturn;
                    // 重置最佳投资方案数组，并为两个项目分配投资额
                    bestInvestments = new Array(m).fill(0);
                    bestInvestments[i] = investmentForI;
                    bestInvestments[j] = investmentForJ;
                }
            }
        }
    }

    // 输出最佳投资方案
    console.log(bestInvestments.join(' '));
})