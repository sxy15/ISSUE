/**
 * 某网上商场举办优惠活动，发布了满减、打折、无门槛3种优惠券，
 * 分别为：每满100元优惠10元，无使用数限制，如100 ~ 199元可以使用1张减10元，200 ~ 299可使用2张减20元，以此类推；
 * 92折券，1次限使用1张，如100元，则优惠后为92元; 无门槛5元优惠券，无使用数限制，直接减5元。 
 * 优惠券使用限制每次最多使用2种优惠券，2种优惠可以叠加（优惠叠加时以优惠后的价格计算），
 * 以购物200元为例，可以先用92折券优惠到184元，再用1张满减券优惠10元，最终价格是174元，
 * 也可以用满减券2张优惠20元为180元，再使用92折券优惠到165（165.6向下取整），
 * 不同使用顺序的优惠价格不同，以最优惠价格为准。在一次购物种，同一类型优惠券使用多张时必须一次性使用，
 * 不能分多次拆开使用（不允许先使用1张满减券，再用打折券，再使用一张满减券）。 问题请设计实现一种解决方法，帮助购物者以最少的优惠券获得最优的优惠价格。
 * 优惠后价格越低越好，同等优惠价格，使用的优惠券越少越好，可以允许某次购物不使用优惠券。 约定优惠活动每人只能参加一次，每个人的优惠券种类和数量是一样的。
 * 输入描述
 * 第一行：每个人拥有的优惠券数量（数量取值范围为[0,10]），按满减、打折、无门槛的顺序输入
 * 第二行：表示购物的人数n（1 ≤ n ≤ 10000）
 * 最后n行：每一行表示某个人优惠前的购物总价格（价格取值范围(0, 1000] ，都为整数）。 约定：输入都是符合题目设定的要求的
 * 输出描述
 * 每行输出每个人每次购物优惠后的最低价格以及使用的优惠券总数量 每行的输出顺序和输入的顺序保持一致 
 * 备注 优惠券数量都为整数，取值范围为[0, 10] 购物人数为整数，取值范围为[1, 10000] 优惠券的购物总价为整数，取值范围为 (0, 1000] 优惠后价格如果是小数，则向下取整，输出都为整数
 * 
 * 输入
 *   3 2 5
 *   3
 *   100
 *   200
 *   400

 * 输出
 *   65 6
 *   155 7
 *   338 4
 */

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const data = [];  // 用于保存所有输入的数据
let a, b, c, d;  // 满减券、打折券、无门槛券的数量以及商品数量

rl.on('line', (line) => {
    data.push(line)

    if (data.length === 1) {
        [a, b, c] = line.split(' ').map(Number);
    }

    if (data.length === 2) {
        d = Number(line);
    }

    if (d && data.length === d + 2) {
        data.shift()
        data.shift()

        const prices = data.map(Number);

        getRes(prices, a, b, c)

        data.length = 0; // 下一轮
    }
})

function getRes(prices, a, b, c) {
    for (let p of prices) {
        const res = []

        // 1. 满减 打折
        let m1 = useM(p, a)
        let mn1 = useN(m1[0], b)
        res.push([mn1[0], a + b - (m1[1] + mn1[1])])
        // 2. 满减 无门槛
        let mk1 = useK(m1[0], c)
        res.push([mk1[0], a + c - (m1[1] + mk1[1])]);
        // 3. 打折 满减
        let n1 = useN(p, b)
        let nm1 = useM(n1[0], a)
        res.push([nm1[0], b + a - (n1[1] + nm1[1])])
        // 4. 打折 无门槛
        let nk1 = useK(n1[0], c)
        res.push([nk1[0], b + c - (n1[1] + nk1[1])])

        // 按价格升序排序，如果价格相同，按照使用的优惠券数升序排序
        res.sort((x, y) => (x[0] === y[0] ? x[1] - y[1] : x[0] - y[0]))

        // 输出最优结果
        console.log(res[0].join(" "));
    }
}

// 满减
function useM(price, a) {
    const cnt = Math.floor(price / 100);
    const used = Math.min(cnt, a)

    price -= used * 10
    a -= used

    return [price, a] // 返回
}

// 折扣
function useN(price, b) {
    if (b >= 1) {
        price = Math.floor(price * 0.92)
    }

    return [price, b - 1]
}

// 满减
function useK(price, c) {
    while (price > 0 && c > 0) {
        price -= 5
        price = Math.max(price, 0)
        c--
    }

    return [price, c]
}