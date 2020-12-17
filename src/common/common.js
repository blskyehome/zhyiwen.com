/**
 * @author  zhyiwen
 * @date  2020/6/3 9:31
 * @version 1.0
 */

export default {

  //  判断是否为空
  isNull(str) {
    if (str === "undefined" || str === undefined || str === null || str === "" || str === NaN) {
      return true;
    } else {
      return false;
    }
  }
  
}