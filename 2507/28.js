// 用js实现二叉树的定义和基本操作

/**
 * 二叉树节点类
 * @class TreeNode
 * @property {*} val - 节点值
 * @property {TreeNode|null} left - 左子节点
 * @property {TreeNode|null} right - 右子节点
 */
class TreeNode {
    /**
     * 创建一个二叉树节点
     * @param {*} val - 节点值
     */
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/**
 * 二叉树类
 * @class BinaryTree
 * @property {TreeNode|null} root - 根节点
 */
class BinaryTree {
    /**
     * 创建一个二叉树
     * @param {*} rootVal - 根节点值（可选）
     */
    constructor(rootVal = null) {
        this.root = rootVal ? new TreeNode(rootVal) : null;
    }

    /**
     * 插入节点（递归版）
     * @param {*} val - 要插入的节点值
     * @param {TreeNode} node - 当前节点（内部使用）
     * @returns {TreeNode} - 插入后的节点
     */
    insert(val, node = this.root) {
        // 如果树为空，创建新节点作为根节点
        if (!this.root) {
            this.root = new TreeNode(val);
            return this.root;
        }

        // 如果当前节点为空，创建新节点
        if (!node) {
            return new TreeNode(val);
        }

        // 按二叉搜索树规则插入（小的放左，大的放右）
        if (val < node.val) {
            node.left = this.insert(val, node.left);
        } else if (val > node.val) {
            node.right = this.insert(val, node.right);
        }

        return node;
    }

    /**
     * 前序遍历（根-左-右）
     * @param {TreeNode} node - 起始节点
     * @param {Array} result - 存储遍历结果的数组
     * @returns {Array} - 遍历结果
     */
    preorderTraversal(node = this.root, result = []) {
        if (node) {
            result.push(node.val);
            this.preorderTraversal(node.left, result);
            this.preorderTraversal(node.right, result);
        }
        return result;
    }

    /**
     * 中序遍历（左-根-右）
     * @param {TreeNode} node - 起始节点
     * @param {Array} result - 存储遍历结果的数组
     * @returns {Array} - 遍历结果
     */
    inorderTraversal(node = this.root, result = []) {
        if (node) {
            this.inorderTraversal(node.left, result);
            result.push(node.val);
            this.inorderTraversal(node.right, result);
        }
        return result;
    }

    /**
     * 后序遍历（左-右-根）
     * @param {TreeNode} node - 起始节点
     * @param {Array} result - 存储遍历结果的数组
     * @returns {Array} - 遍历结果
     */
    postorderTraversal(node = this.root, result = []) {
        if (node) {
            this.postorderTraversal(node.left, result);
            this.postorderTraversal(node.right, result);
            result.push(node.val);
        }
        return result;
    }

    /**
     * 层次遍历（广度优先）
     * @returns {Array} - 遍历结果
     */
    levelOrderTraversal() {
        if (!this.root) return [];

        const result = [];
        const queue = [this.root];

        while (queue.length) {
            const node = queue.shift();
            result.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return result;
    }

    /**
     * 查找节点
     * @param {*} val - 要查找的节点值
     * @param {TreeNode} node - 当前节点（内部使用）
     * @returns {TreeNode|null} - 找到的节点或null
     */
    find(val, node = this.root) {
        if (!node) return null;

        if (val === node.val) {
            return node;
        } else if (val < node.val) {
            return this.find(val, node.left);
        } else {
            return this.find(val, node.right);
        }
    }

    /**
     * 获取树的深度
     * @param {TreeNode} node - 当前节点
     * @returns {number} - 树的深度
     */
    getDepth(node = this.root) {
        if (!node) return 0;
        return Math.max(this.getDepth(node.left), this.getDepth(node.right)) + 1;
    }

    /**
     * 判断树是否为空
     * @returns {boolean} - 是否为空树
     */
    isEmpty() {
        return this.root === null;
    }
}

/**
 * 示例使用
 */
function example() {
    // 创建二叉树
    const tree = new BinaryTree(10);

    // 插入节点
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    tree.insert(12);
    tree.insert(18);

    console.log('前序遍历:', tree.preorderTraversal()); // [10, 5, 3, 7, 15, 12, 18]
    console.log('中序遍历:', tree.inorderTraversal()); // [3, 5, 7, 10, 12, 15, 18]
    console.log('后序遍历:', tree.postorderTraversal()); // [3, 7, 5, 12, 18, 15, 10]
    console.log('层次遍历:', tree.levelOrderTraversal()); // [10, 5, 15, 3, 7, 12, 18]
    console.log('树的深度:', tree.getDepth()); // 3
    console.log('查找值为7的节点:', tree.find(7) ? '找到' : '未找到'); // 找到
    console.log('查找值为9的节点:', tree.find(9) ? '找到' : '未找到'); // 未找到
}

// 执行示例
example();