
/**
 * * 展开state
 * @param {object} state 当前state
 * @param {string[]} properties 要获取的属性
 */
export function mapReduxState(state, properties) {
  const result = {};

  properties.forEach(property => {
    result[property] = state[property];
  })
  return result;
};

/**
 * * 生成全局唯一标识符，碰撞率不及1/2^^122 
 * @returns {string} uuid
 */
export function generateUUID() {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    // eslint-disable-next-line no-mixed-operators
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};
