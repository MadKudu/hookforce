var transform = require('jsonpath-object-transform')

module.exports = function (raw_data, mapping) {
  mapping = mapping || JSON.parse(process.env.TRANSFORM)
  return transform(raw_data, mapping);
}
