module.exports.power = function powerval(x, y) {
  var val = Math.pow(x, y);
  return val;
};

module.exports.root = function rootval(x) {
  var val = Math.sqrt(x);
  return val;
};

module.exports.log = function logval(x) {
  var val = Math.log10(x);
  return val;
};

//  module.exports = {
//     power,
//     root,
//     log
//  }
