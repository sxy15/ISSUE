/**
 * 输入描述
 *   第一行为字符串格式的VLAN资源池，第二行为业务要申请的VLAN，VLAN的取值范围为[1,4094]之间的整数。
 * 输出描述
 *   从输入VLAN资源池中移除申请的VLAN后字符串格式的VLAN资源池，输出要求满足题目描述中的格式，并且按照VLAN从小到大升序输出。
 *  如果申请的VLAN不在原VLAN资源池内，输出原VLAN资源池升序排序后的字符串即可。
 * 1-5
 * 2
 * 1,3-5
 * 
 * 20-21,15,18,30,5-10
 * 15
 * 5-10,18,20-21,30
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.on('line', (vlan_pool_input) => {
    rl.on('line', (dest_vlan_input) => {
        rl.close()
        const dest_vlan = parseInt(dest_vlan_input);
        // 定义存储VLAN的列表
        const vlan_pool = [];
        // 将输入的VLAN资源池按逗号分隔为多个VLAN组
        const vlan_group = vlan_pool_input.split(",");
        for (let item of vlan_group) {
            if (item.includes('-')) {
                const [start, end] = item.split('-').map(Number);
                for (let i = start; i <= end; i++) {
                    vlan_pool.push(i);
                }
                continue
            }
            // 只有一个
            vlan_pool.push(parseInt(item));
        }

        vlan_pool.sort((a, b) => a - b);

        // 如果申请的VLAN在VLAN资源池中
        if (vlan_pool.includes(dest_vlan)) {
            // 从VLAN资源池中移除申请的VLAN
            vlan_pool.splice(vlan_pool.indexOf(dest_vlan), 1);
        }

        // 定义存储结果的列表
        const result = [];
        // 定义上一个VLAN的变量
        let last_vlan = null;

        for (let index = 0; index < vlan_pool.length; index++) {
            // 如果是第一个VLAN
            if (last_vlan === null) {
                result.push(vlan_pool[index].toString());
                last_vlan = vlan_pool[index];
                continue;
            }
            // 如果当前VLAN与上一个VLAN连续
            if (vlan_pool[index] - last_vlan === 1) {
                // 如果结果列表中的最后一个元素以"-上一个VLAN"结尾
                if (result[result.length - 1].endsWith("-" + last_vlan)) {
                    // 将结果列表中的最后一个元素更新为"-当前VLAN"
                    result[result.length - 1] = `-${vlan_pool[index].toString()}`;
                } else {
                    // 在结果列表中添加"-当前VLAN"
                    result.push("-" + vlan_pool[index].toString());
                }
            } else {
                // 在结果列表中添加",当前VLAN"
                result.push("," + vlan_pool[index].toString());
            }
            last_vlan = vlan_pool[index];
        }

        // 输出结果列表中的VLAN资源池
        console.log(result.join(""));
    })
})