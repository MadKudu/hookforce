var expect = require('chai').expect

const check_environment_variables = require('../lib/check_environment_variables')
require('dotenv').config({path: 'test/test.env'})

describe('check_environment_variables', function() {
  it('should not throw an error when the environment variables have been set correctly', () => {
    expect(check_environment_variables).not.to.throw(Error)
  });

  it('should throw an error when the environment variables have not been set correctly', () => {
    delete process.env.FILTER
    expect(check_environment_variables).to.throw(Error)
  });

});
