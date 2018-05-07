var expect = require('chai').expect
const transform = require('../lib/transform')

const TEMPLATE = '{"Email":"$.traits.email", "LeadSource":"Trial Signup", "LastName":"$.traits.mk_last_name", "Company":"$.traits.mk_company_name"}'
const DEFAULTS = '{"LastName": "n/a", "Company": "n/a"}'

const DATA_SAMPLE = require('./fixtures/data_sample.json')
const DATA_SAMPLE_WITHOUT_VALUES = require('./fixtures/data_sample_without_values.json')

describe('transform', function () {
  it('work without defaults array', () => {
    process.env.TRANSFORM = TEMPLATE
    // process.env.DEFAULTS = undefined
    const result = transform(DATA_SAMPLE_WITHOUT_VALUES)
    expect(JSON.stringify(result)).to.equal(JSON.stringify({ Email: 'sam@madkudu.com', LeadSource: 'Trial Signup' }))
  })

  it('transform without error', () => {
    process.env.TRANSFORM = TEMPLATE
    process.env.DEFAULTS = DEFAULTS
    const result = transform(DATA_SAMPLE)
    expect(JSON.stringify(result)).to.equal(JSON.stringify({ Email: 'sam@madkudu.com', LeadSource: 'Trial Signup', LastName: 'Levan', Company: 'MadKudu' }))
  })

  it('fill in defaults for LastName and Company', () => {
    process.env.TRANSFORM = TEMPLATE
    process.env.DEFAULTS = DEFAULTS
    const result = transform(DATA_SAMPLE_WITHOUT_VALUES)
    expect(JSON.stringify(result)).to.equal(JSON.stringify({ Email: 'sam@madkudu.com', LeadSource: 'Trial Signup', LastName: 'n/a', Company: 'n/a' }))
  })
})
