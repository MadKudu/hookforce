var chai = require('chai')
var expect = chai.expect
var chai_as_promised = require("chai-as-promised")
chai.use(chai_as_promised)

const rules = {
  'type': 'equals:identify',
  'traits.email': 'required'
}

const filter = require('../lib/filter')

const data = require('./data_sample.json')

describe('filter', function() {
  it('filter without error', () => {
    process.env.FILTER = JSON.stringify(rules)

    expect(filter(data).then(console.log).catch(console.log)).to.eventually.be.fulfilled

  });
});
