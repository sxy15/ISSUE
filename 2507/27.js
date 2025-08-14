// 最大子序和

/**
 * 最大子序和问题求解（Kadane算法）
 * @param {number[]} nums - 输入整数数组
 * @returns {number} 最大子序和
 */
function maxSubArray(nums) {
    // 边界条件处理
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let currentSum = nums[0]; // 当前子序列和
    let maxSum = nums[0];     // 最大子序列和

    // 从第二个元素开始遍历
    for (let i = 1; i < nums.length; i++) {
        // 核心逻辑：要么将当前元素加入现有子序列，要么从当前元素开始新的子序列
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        // 更新最大子序和
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

/**
 * 示例测试与结果验证
 */
function runExamples() {
    // 示例1：基础正数数组
    const example1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    console.log(`示例1: [${example1}] → 结果: ${maxSubArray(example1)} (预期: 6)`);

    // 示例2：全负数数组
    const example2 = [-3, -1, -2, -5];
    console.log(`示例2: [${example2}] → 结果: ${maxSubArray(example2)} (预期: -1)`);

    // 示例3：单元素数组
    const example3 = [5];
    console.log(`示例3: [${example3}] → 结果: ${maxSubArray(example3)} (预期: 5)`);

    // 示例4：混合数组
    const example4 = [1, -2, 3, 10, -4, 7, 2, -5];
    console.log(`示例4: [${example4}] → 结果: ${maxSubArray(example4)} (预期: 18)`);
}

// 执行示例测试
runExamples();