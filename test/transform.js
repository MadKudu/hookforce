var expect = require('chai').expect

const template = {
  email: '$.traits.email',
  leadsource: 'trial signup'
}

const transform = require('../lib/transform')

const data_sample = require('./data_sample.json')

describe('transform', function() {
  it('transform without error', () => {
    process.env.TRANSFORM = JSON.stringify(template)
    var result = transform(data_sample)
    expect(JSON.stringify(result)).to.equal(JSON.stringify({ email: 'sam@madkudu.com', leadsource: 'trial signup' }))
  });
});
