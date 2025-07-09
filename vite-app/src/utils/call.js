// 实现自定义call方法
Function.prototype.myCall = function(context) {
  // 检查调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('The caller must be a function');
  }

  // 处理上下文为null或undefined的情况
  context = context || window;

  // 创建唯一Symbol属性，避免覆盖原有属性
  const fn = Symbol('fn');
  context[fn] = this;

  // 获取参数（排除第一个context参数）
  const args = [...arguments].slice(1);

  // 执行函数并保存结果
  const result = context[fn](...args);

  // 删除临时属性
  delete context[fn];

  // 返回执行结果
  return result;
};

// 实现自定义apply方法
Function.prototype.myApply = function(context, argsArray) {
  // 检查调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('The caller must be a function');
  }

  // 处理上下文为null或undefined的情况
  context = context || window;

  // 创建唯一Symbol属性，避免覆盖原有属性
  const fn = Symbol('fn');
  context[fn] = this;

  // 执行函数并保存结果（处理参数数组）
  const result = argsArray ? context[fn](...argsArray) : context[fn]();

  // 删除临时属性
  delete context[fn];

  // 返回执行结果
  return result;
};