const expect = require('chai').expect

// load env variables from .env
require('dotenv').config()
const salesforce = require('../lib/salesforce')

const check_validity_of_environment_variables = require('../lib/check_validity_of_environment_variables')


describe('check_validity_of_environment_variables', function () {
  this.timeout(10000)

  // instantiate the salesforce singleton
  before(salesforce.init)

  it('should not throw an error when the environment variables have been set correctly', () => {
    expect(check_validity_of_environment_variables).not.to.throw(Error)
  })

  it('should throw an error when the environment variables have not been set correctly', () => {
    delete process.env.FILTER
    expect(check_validity_of_environment_variables).to.throw(Error)
  })
})
