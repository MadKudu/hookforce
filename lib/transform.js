'use strict'

const transform = require('jsonpath-object-transform')
const _ = require('lodash')

module.exports = function (raw_data, mapping) {
  mapping = mapping || JSON.parse(process.env.TRANSFORM)
  const results = transform(raw_data, mapping)
  return process.env.DEFAULTS ? _.defaults(results, JSON.parse(process.env.DEFAULTS)) : results
}
