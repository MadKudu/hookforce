const expect = require('chai').expect

const get_environment = require('../lib/get_environment')

describe('get_environment', function () {
  it('should not throw an error when the environment variables have been set correctly', () => {
    expect(get_environment).not.to.throw(Error)
  })

  it('should throw an error when the environment variables have not been set correctly', () => {
    delete process.env.FILTER
    expect(get_environment).to.throw(Error)
  })
})
