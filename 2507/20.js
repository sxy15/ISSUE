// 题目描述
// 商人经营一家店铺，有number种商品，由于仓库限制每件商品的最大持有数量是item[index]，每种商品的价格是item-price[item_index][day]

// 通过对商品的买进和卖出获取利润，请给出商人在days天内能获取的最大的利润
// 注：同一件商品可以反复买进和卖出

// 输入描述
// 第一行输入商品的数量number，比如3

// 第二行输入商品售货天数 days，比如3

// 第三行输入仓库限制每件商品的最大持有数量是item[index]，比如4 5 6

// 后面继续输入number行days列，含义如下：

// 第一件商品每天的价格，比如1 2 3

// 第二件商品每天的价格，比如4 3 2

// 第三件商品每天的价格，比如1 5 3

// 输出描述
// 输出商人在这段时间内的最大利润。

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 处理输入
let input = [];
readline.on('line', (line) => {
    input.push(line);
});

readline.on('close', () => {
    const itemNumber = parseInt(input[0]) // 商品数量
    const days = parseInt(input[1]); // 售货天数

    const maxItems = input[2].split(' ').map(Number); // 每件商品最大持有数量

    const prices = input.slice(3).map((line) => line.split(' ').map(Number)); // 商品价格列表

    let maxProfit = 0;
    for (let i = 0; i < itemNumber; i++) { // 遍历每件商品
        for (let j = 1; j < days; j++) { // 遍历商品价格列表，求出每天的利润
            const profit = Math.max(0, prices[i][j] - prices[i][j - 1]);
            // 当前价格减去前一天价格，如果为负数则代表亏本，不计入利润
            maxProfit += profit * maxItems[i]; // 求出当前商品能够获取的最大利润
        }
    }

    console.log(maxProfit); // 输出最大利润

});
