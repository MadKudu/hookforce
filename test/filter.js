// const chai = require('chai')
// const expect = chai.expect

const rules = {
  'type': 'equals:identify',
  'traits.email': 'required'
}

const filter = require('../lib/filter')
const data = require('./data_sample.json')

describe('filter', function () {
  it('should filter without error', () => {
    process.env.FILTER = JSON.stringify(rules)
    return filter(data)
  })
})
