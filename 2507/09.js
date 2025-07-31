// 考勤记录是分析和考核职工工作时间利用情况的原始依据，也是计算职工工资的原始依据，为了正确地计算职工工资和监督工资基金使用情况，公司决定对员工的手机打卡记录进行异常排查。如果出现以下两种情况，则认为打卡异常：实际设备号与注册设备号不一样 或者，同一个员工的两个打卡记录的时间小于60分钟并且打卡距离超过5km。 给定打卡记录的字符串数组 clockRecords（每个打卡记录组成为：工号;时间（分钟）;打卡距离（km）;实际设备号;注册设备号），返回其中异常的打卡记录（按输入顺序输出）

// 输入描述
// 第一行输入为N，表示打卡记录数；
// 之后的N行为打卡记录，每一行为一条打卡记录。

// 输出描述
// 输出异常的打卡记录
// 2
// 100000,10,1,ABCD,ABCD
// 100000,50,10,ABCD,ABCD
// -> 100000,10,1,ABCD,ABCD;100000,50,10,ABCD,ABCD

const readline = require('readline');

// 创建readline接口实例
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n = undefined
const records = [];
rl.on('line', (input) => {
    if (n === undefined) {
        n = Number(input);
    } else {
        records.push(input);
    }

    if (records.length === n) {
        const result = [];
        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            const [id, time, distance, actual, registered] = record.split(',');
            const nextRecord = records[i + 1];
            if (result.includes(record)) {
                continue;
            }
            if (actual !== registered) {
                result.push(record);
                continue;
            }
            if (nextRecord) {
                const [id, nextTime, nextDistance] = nextRecord.split(',');
                if (Number(nextTime) - Number(time) < 60 && Number(nextDistance) - Number(distance) > 5) {
                    result.push(record);
                    result.push(nextRecord);
                }
            }
        }

        console.log(result)
    }
})