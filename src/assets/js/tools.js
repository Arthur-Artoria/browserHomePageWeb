
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
